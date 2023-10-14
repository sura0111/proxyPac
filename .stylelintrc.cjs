const variablePattern =
  /^((s_)?(([a-z]+[A-Z]?([a-z]+)?)+)(__(([a-z]+[A-Z]?([a-z]+)?)+))?(--(([a-z]+[A-Z]?([a-z]+)?)+))?(__(([a-z]+[A-Z]?([a-z]+)?)+))?)|(v-.+)$/

/** @type {import('stylelint').Config} */
module.exports = {
  defaultSeverity: 'warning',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-prettier', 'stylelint-scss', 'stylelint-order'],
  rules: {
    'import-notation': null,
    'color-hex-length': 'long',
    'selector-class-pattern': variablePattern,
    
  },
  ignoreFiles: ['dist/**/*', 'coverage/**/*', '**/*.html', 'artifacts/**/*'],
}
