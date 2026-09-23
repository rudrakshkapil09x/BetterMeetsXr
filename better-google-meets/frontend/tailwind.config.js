/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // True-neutral dark surfaces -- no blue tint, no glass.
        ink: {
          950: '#0d0e10',
          900: '#131417',
          800: '#17181b',
          700: '#202226',
          600: '#2a2c30',
        },
        ash: {
          400: '#8b8d92',
          300: '#a6a8ad',
        },
        // The only three colors that carry meaning, reused from git's own conventions:
        // a change is pending, merged, or in conflict. Never used decoratively elsewhere.
        merged: '#4f9d69',
        pending: '#c9a227',
        conflict: '#c0564d',
      },
    },
  },
  plugins: [],
}
