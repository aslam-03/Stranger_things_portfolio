module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        stDark: '#050507',
        stDarkAlt: '#0b0b0d',
        stRed: '#e50914',
        stPurple: '#5b2bff',
        stBlue: '#3056d3',
        stCream: '#f3e4cf'
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Source Code Pro', 'SFMono-Regular', 'ui-monospace']
      },
      boxShadow: {
        neon: '0 0 20px rgba(229, 9, 20, 0.55)',
        glass: '0 15px 60px rgba(0, 0, 0, 0.75)'
      },
      backgroundImage: {
        vignette: 'radial-gradient(circle at center, rgba(229,9,20,0.07), transparent 65%)',
        grain: "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'4\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(#n)\\' opacity=\\'0.15\\' /></svg>')"
      },
      screens: {
        '3xl': '1680px'
      }
    }
  },
  plugins: []
}
