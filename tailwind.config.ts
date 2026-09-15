import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        ink: "#0E110F",
        "ink-2": "#1F2421",
        "ink-3": "#171B18",
        bone: "#EEE9DE",
        "bone-dim": "#C9C3B1",
        sage: "#6C7356",
        olive: "#3F4A1E",
        graphite: "#464D44",
        paper: "#C9C3B1",
        "paper-2": "#D2CCBB",
        rule: "rgba(238,233,222,0.14)",
        "rule-strong": "rgba(238,233,222,0.22)",
        "rule-ink": "rgba(14,17,15,0.22)",
        "rule-ink-strong": "rgba(14,17,15,0.30)",
        accent: "#9AA75F",
        "accent-hover": "#8B9754",
        "accent-press": "#85914F",
        "accent-ink": "#3F4A1E",
        "on-accent": "#0E110F",
        error: "#E8B4A0",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      maxWidth: {
        container: "84rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-fast": "marquee 28s linear infinite",
      },
    },
  },
  plugins: [
    // Eixo de largura da Archivo. Utilitárias de plugin, portanto aceitam
    // variantes responsivas: wdth-100 sm:wdth-112 lg:wdth-118 xl:wdth-125.
    plugin(({ addUtilities }) => {
      addUtilities({
        ".wdth-78": { fontStretch: "78%" },
        ".wdth-100": { fontStretch: "100%" },
        ".wdth-106": { fontStretch: "106%" },
        ".wdth-112": { fontStretch: "112%" },
        ".wdth-118": { fontStretch: "118%" },
        ".wdth-125": { fontStretch: "125%" },
      });
    }),
  ],
};
export default config;
