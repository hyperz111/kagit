import * as packageJson from 'prettier-plugin-packagejson'

export default {
  semi: false,
  bracketSpacing: false,
  trailingComma: 'none',
  singleQuote: true,
  plugins: [packageJson],
  overrides: [
    {
      files: './bin/kagit.js',
      options: {
        printWidth: Infinity
      }
    }
  ]
}
