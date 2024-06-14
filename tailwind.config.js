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
        'oby-646464': '#646464',
        'oby-9A9898': '#9A9898',
        'oby-DFDFDF': '#DFDFDF',
        'oby-F6F7F8': '#F6F7F8',
        'oby-primary': '#006838',
        'oby-green': '#2E6A20',
        'oby-orange': '#F28825',
        'oby-red': '#E43641',
        'oby-blue': '#4FC2F8',
        'oby-E4FBDB': '#E4FBDB',
        'oby-yellow': '#FAD749',
        'agr-orange': '#E54807',
        'agr-mid-orange': '#E54807',
        'agr-light-orange': '#FFBE00'
      },
      screens: {
        '@1544': '1544px',
        '@1600': '1600px',
        '@992': '992px',
        '@768': '768px',
        '@576': '576px',
        '@520': '520px'
      },
      spacing: {
        0.75: '3px',
        1.25: '5px',
        1.75: '7px',
        2.25: '9px',
        2.5: '10px',
        2.75: '11px',
        3.25: '13px',
        3.5: '14px',
        4.5: '18px',
        6.25: '25px',
        6.5: '26px',
        7.5: '30px',
        9.5: '38px',
        12: '48px',
        12.5: '50px',
        15: '60px',
        20: '80px'
      },
      borderRadius: {
        0: '0px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        4: '16px',
        5: '20px'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, matchVariant }) {
      addComponents({
        '.container': {
          maxWidth: '1232px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '16px',
          paddingRight: '16px'
        },
        '.fs-8': {
          fontSize: '8px'
        },
        '.fs-10': {
          fontSize: '10px'
        },
        '.fs-11': {
          fontSize: '11px'
        },
        '.fs-12': {
          fontSize: '12px'
        },
        '.fs-14': {
          fontSize: '14px'
        },
        '.fs-16': {
          fontSize: '16px'
        },
        '.fs-18': {
          fontSize: '18px'
        },
        '.fs-20': {
          fontSize: '20px'
        },
        '.fs-24': {
          fontSize: '24px'
        },
        '.fs-26': {
          fontSize: '26px'
        },
        '.fs-28': {
          fontSize: '28px'
        },
        '.fs-48': {
          fontSize: '48px'
        }
      }),
        matchVariant(
          'nth',
          (value) => {
            return `&:nth-child(${value})`
          },
          {
            values: {
              DEFAULT: 'n',
              '2n': '2n',
              '3n': '3n',
              '4n': '4n',
              '5n': '5n'
            }
          }
        )
    }),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
}
