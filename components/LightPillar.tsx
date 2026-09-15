"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Facho de luz volumétrico por raymarching, desenhado num quad de tela cheia.
 *
 * Portado para WebGL puro de propósito: o shader é o mesmo do componente
 * original em Three.js, mas aqui não entra nenhuma dependência. Three.js
 * custaria mais que todo o JavaScript do site, e a página vende performance.
 *
 * Proteções de custo, todas obrigatórias neste projeto:
 * - só anima quando está visível na tela e com a aba em foco;
 * - qualidade cai sozinha em celular e em máquina de poucos núcleos;
 * - com "prefers-reduced-motion" desenha um único quadro e para;
 * - sem WebGL não renderiza nada, e a dobra segue funcionando sem ele.
 */

type Quality = "low" | "medium" | "high";

type LightPillarProps = {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  pillarRotation?: number;
  quality?: Quality;
  className?: string;
  mixBlendMode?: "screen" | "plus-lighter" | "normal";
  /**
   * Véu escuro desenhado por cima do facho. Não é decoração: o facho soma
   * luz ao fundo e derruba o contraste do texto secundário abaixo de 4.5:1.
   * O gradiente escurece o lado onde o texto vive e deixa o outro respirar.
   */
  scrim?: string;
};

type QualitySetting = {
  iterations: number;
  waveIterations: number;
  pixelRatio: number;
  precision: "mediump" | "highp";
  stepMultiplier: number;
};

const VERTEX = `
attribute vec2 aPosition;
attribute vec2 aUv;
varying vec2 vUv;
void main() {
  vUv = aUv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

function fragmentSource(s: QualitySetting): string {
  return `
precision ${s.precision} float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uTopColor;
uniform vec3 uBottomColor;
uniform float uIntensity;
uniform float uGlowAmount;
uniform float uPillarWidth;
uniform float uPillarHeight;
uniform float uNoiseIntensity;
uniform float uRotCos;
uniform float uRotSin;
uniform float uPillarRotCos;
uniform float uPillarRotSin;
uniform float uWaveSin;
uniform float uWaveCos;
varying vec2 vUv;

const float STEP_MULT = ${s.stepMultiplier.toFixed(1)};
const int MAX_ITER = ${s.iterations};
const int WAVE_ITER = ${s.waveIterations};

/* tanh só existe a partir do GLSL ES 3.00; aqui vai explícito para
   compilar igual em WebGL 1 e 2. */
vec3 tanh3(vec3 x) {
  vec3 e = exp(2.0 * clamp(x, -10.0, 10.0));
  return (e - 1.0) / (e + 1.0);
}

void main() {
  vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
  uv = vec2(uPillarRotCos * uv.x - uPillarRotSin * uv.y,
            uPillarRotSin * uv.x + uPillarRotCos * uv.y);

  vec3 ro = vec3(0.0, 0.0, -10.0);
  vec3 rd = normalize(vec3(uv, 1.0));

  float rotC = uRotCos;
  float rotS = uRotSin;

  vec3 col = vec3(0.0);
  float t = 0.1;

  for (int i = 0; i < MAX_ITER; i++) {
    vec3 p = ro + rd * t;
    p.xz = vec2(rotC * p.x - rotS * p.z, rotS * p.x + rotC * p.z);

    vec3 q = p;
    q.y = p.y * uPillarHeight + uTime;

    float freq = 1.0;
    float amp = 1.0;
    for (int j = 0; j < WAVE_ITER; j++) {
      q.xz = vec2(uWaveCos * q.x - uWaveSin * q.z,
                  uWaveSin * q.x + uWaveCos * q.z);
      q += cos(q.zxy * freq - uTime * float(j) * 2.0) * amp;
      freq *= 2.0;
      amp *= 0.5;
    }

    float d = length(cos(q.xz)) - 0.2;
    float bound = length(p.xz) - uPillarWidth;
    float k = 4.0;
    float h = max(k - abs(d - bound), 0.0);
    d = max(d, bound) + h * h * 0.0625 / k;
    d = abs(d) * 0.15 + 0.01;

    float grad = clamp((15.0 - p.y) / 30.0, 0.0, 1.0);
    col += mix(uBottomColor, uTopColor, grad) / d;

    t += d * STEP_MULT;
    if (t > 50.0) break;
  }

  float widthNorm = uPillarWidth / 3.0;
  col = tanh3(col * uGlowAmount / widthNorm);

  col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453)
         / 15.0 * uNoiseIntensity;

  vec3 result = clamp(col * uIntensity, 0.0, 1.0);
  gl_FragColor = vec4(result, 1.0);
}
`;
}

const QUALITY: Record<Quality, QualitySetting> = {
  low: { iterations: 24, waveIterations: 1, pixelRatio: 0.5, precision: "mediump", stepMultiplier: 1.5 },
  medium: { iterations: 40, waveIterations: 2, pixelRatio: 0.65, precision: "mediump", stepMultiplier: 1.2 },
  high: { iterations: 72, waveIterations: 3, pixelRatio: 1, precision: "highp", stepMultiplier: 1.0 },
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full, 16);
  // sRGB -> linear, porque o shader soma luz e não cor de tela.
  const toLinear = (v: number) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return [toLinear((n >> 16) & 255), toLinear((n >> 8) & 255), toLinear(n & 255)];
}

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function LightPillar({
  topColor = "#9AA75F",
  bottomColor = "#3F4A1E",
  intensity = 1,
  rotationSpeed = 0.3,
  glowAmount = 0.005,
  pillarWidth = 3,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  pillarRotation = 0,
  quality = "high",
  className = "",
  mixBlendMode = "screen",
  scrim,
}: LightPillarProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  // Os valores vivem em refs para que mudar uma prop não recrie o contexto.
  const propsRef = useRef({
    topColor,
    bottomColor,
    intensity,
    rotationSpeed,
    glowAmount,
    pillarWidth,
    pillarHeight,
    noiseIntensity,
    pillarRotation,
  });
  propsRef.current = {
    topColor,
    bottomColor,
    intensity,
    rotationSpeed,
    glowAmount,
    pillarWidth,
    pillarHeight,
    noiseIntensity,
    pillarRotation,
  };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const cores = navigator.hardwareConcurrency ?? 8;
    let level: Quality = quality;
    if (isMobile) level = "low";
    else if (cores <= 4 && level === "high") level = "medium";
    const setting = QUALITY[level];

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";

    const gl = (canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: level === "high" ? "high-performance" : "low-power",
      failIfMajorPerformanceCaveat: false,
    }) || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentSource(setting));
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // x, y, u, v — quad de tela cheia em TRIANGLE_STRIP.
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPosition = gl.getAttribLocation(program, "aPosition");
    const aUv = gl.getAttribLocation(program, "aUv");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uTime = u("uTime");
    const uResolution = u("uResolution");
    const uTopColor = u("uTopColor");
    const uBottomColor = u("uBottomColor");
    const uIntensity = u("uIntensity");
    const uGlowAmount = u("uGlowAmount");
    const uPillarWidth = u("uPillarWidth");
    const uPillarHeight = u("uPillarHeight");
    const uNoiseIntensity = u("uNoiseIntensity");
    const uRotCos = u("uRotCos");
    const uRotSin = u("uRotSin");
    const uPillarRotCos = u("uPillarRotCos");
    const uPillarRotSin = u("uPillarRotSin");
    const uWaveSin = u("uWaveSin");
    const uWaveCos = u("uWaveCos");

    gl.uniform1f(uWaveSin, Math.sin(0.4));
    gl.uniform1f(uWaveCos, Math.cos(0.4));

    host.appendChild(canvas);

    let cssW = 0;
    let cssH = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * setting.pixelRatio;

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w === cssW && h === cssH) return;
      cssW = w;
      cssH = h;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };
    resize();

    let time = 0;
    const draw = () => {
      const p = propsRef.current;
      const [tr, tg, tb] = hexToRgb(p.topColor);
      const [br, bg, bb] = hexToRgb(p.bottomColor);
      const rad = (p.pillarRotation * Math.PI) / 180;
      gl.uniform1f(uTime, time);
      gl.uniform3f(uTopColor, tr, tg, tb);
      gl.uniform3f(uBottomColor, br, bg, bb);
      gl.uniform1f(uIntensity, p.intensity);
      gl.uniform1f(uGlowAmount, p.glowAmount);
      gl.uniform1f(uPillarWidth, p.pillarWidth);
      gl.uniform1f(uPillarHeight, p.pillarHeight);
      gl.uniform1f(uNoiseIntensity, p.noiseIntensity);
      gl.uniform1f(uRotCos, Math.cos(time * 0.3));
      gl.uniform1f(uRotSin, Math.sin(time * 0.3));
      gl.uniform1f(uPillarRotCos, Math.cos(rad));
      gl.uniform1f(uPillarRotSin, Math.sin(rad));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let raf = 0;
    let running = false;
    let last = 0;
    const frameTime = 1000 / (level === "low" ? 30 : 60);

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const delta = now - last;
      if (delta < frameTime) return;
      last = now - (delta % frameTime);
      time += 0.016 * propsRef.current.rotationSpeed;
      draw();
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    // Um quadro sempre, inclusive sob movimento reduzido.
    draw();

    let visible = false;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible && !document.hidden) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    ro.observe(host);

    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, [quality]);

  if (failed) return null;

  return (
    <>
      <div
        ref={hostRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-20 ${className}`}
        style={{ mixBlendMode }}
      />
      {scrim ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: scrim }}
        />
      ) : null}
    </>
  );
}
