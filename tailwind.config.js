module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          pink: '#EC4899',
        },
      },
      backdropFilter: {
        none: 'none',
        sm: 'blur(4px)',
      },
    },
  },
  plugins: [],
}
