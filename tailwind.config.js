/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8FAFB',
        card: '#FFFFFF',
        border: '#E8ECEF',
        groww: {
          teal: '#00D09C',
          tealDark: '#00B386',
          tealLight: '#E8FAF5',
          tealBorder: '#A7F0DC',
          blue: '#5367FF',
          blueDark: '#3F52E3',
          blueLight: '#EEF1FF',
          dark: '#1E222B',
          body: '#44475B',
          muted: '#7C7E8C',
          border: '#E5E7EB',
          bg: '#F8FAFB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
