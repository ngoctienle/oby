/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'oby-222324': '#222324',
        'oby-676869': '#676869',
        'oby-DFDFDF': '#DFDFDF',
        'oby-primary': '#4AA02C'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1390px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '15px',
          paddingRight: '15px'
        },
        '.fs-16': {
          fontSize: '16px'
        }
      })
    })
  ]
}
