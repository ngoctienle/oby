const config = {
  semi: false,
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrder: [
    '@/@types/(.*)$',
    '@/hooks/(.*)$',
    '@/libs/(.*)$',
    '@/helpers/(.*)$',
    '@/apis/(.*)$',
    '@/constants/*(.*)$',
    '@/components/(.*)$'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}

module.exports = config
