/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07090e',
          900: '#0c0f17',
          850: '#111520',
          800: '#161b29',
          700: '#20273a',
          600: '#2d374f',
        },
        intent: {
          claim: '#38bdf8',    // Cyan
          proposal: '#fbbf24', // Amber/Gold
          question: '#c084fc', // Purple
          action: '#4ade80',   // Green
          evidence: '#60a5fa', // Blue
        }
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ghost-glow': 'ghostGlow 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        ghostGlow: {
          '0%': { boxShadow: '0 0 10px rgba(251, 191, 36, 0.25)', borderColor: 'rgba(251, 191, 36, 0.4)' },
          '100%': { boxShadow: '0 0 24px rgba(251, 191, 36, 0.6)', borderColor: 'rgba(251, 191, 36, 0.9)' },
        }
      }
    },
  },
  plugins: [],
}
