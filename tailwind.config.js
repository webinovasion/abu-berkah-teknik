// tailwind.config.js

module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
    },

    extend: {
      colors: {
        primary: {
          dark: "#0F172A",
        },

        surface: {
          base: "#FFFFFF",
          light: "#F8FAFC",
          muted: "#F1F5F9",
        },

        accent: {
          blue: "#2563EB",
          orange: "#F97316",
        },

        neutral: {
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },

      boxShadow: {
        soft: "0 10px 40px rgba(15,23,42,0.08)",
        card: "0 4px 20px rgba(15,23,42,0.06)",
        elevated: "0 20px 60px rgba(2,6,23,0.18)",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },

  plugins: [],
};