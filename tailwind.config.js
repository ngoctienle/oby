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
        'oby-9A9898': '#9A9898',
        'oby-DFDFDF': '#DFDFDF',
        'oby-F6F7F8': '#F6F7F8',
        'oby-primary': '#4AA02C',
        'oby-green': '#2E6A20',
        'oby-orange': '#F28825',
        'oby-E4FBDB': '#E4FBDB'
      },
      spacing: {
        0.75: '3px',
        2.5: '10px',
        2.75: '11px',
        3.25: '13px',
        3.5: '14px',
        16: '16px',
        4.5: '18px',
        7.5: '30px',
        9.5: '38px',
        12: '48px',
        12.5: '50px',
        15: '60px',
        20: '80px'
      },
      borderRadius: {
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        4: '16px',
        5: '20px'
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
        '.fs-11': {
          fontSize: '11px'
        },
        '.fs-14': {
          fontSize: '14px'
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
