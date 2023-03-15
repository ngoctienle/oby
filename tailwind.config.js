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
        'oby-F6F7F8': '#F6F7F8',
        'oby-primary': '#4AA02C',
        'oby-E4FBDB': '#E4FBDB'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1392px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '16px',
          paddingRight: '16px'
        },
        '.fs-16': {
          fontSize: '16px'
        },
        '.fs-28': {
          fontSize: '28px'
        }
      })
    })
  ]
}
