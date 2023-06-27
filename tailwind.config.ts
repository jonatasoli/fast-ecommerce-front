import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default <Partial<Config>>{
  plugins: [daisyui],
  theme: {
    extend: {
      colors: {
        gattoRosa: {
          primary: '#DA9A39',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
}
