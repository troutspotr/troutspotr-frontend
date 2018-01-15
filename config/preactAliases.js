const PREACT_ALIASES = {
  // https://github.com/developit/preact-compat/issues/14
  // 'react-addons-css-transition-group': 'preact-css-transition-group',
  react: 'preact-compat',
  'react-dom': 'preact-compat',
  'react-redux': 'preact-redux',
  'create-react-class': 'preact-compat/lib/create-react-class',
}

module.exports = {
  preactAliases: PREACT_ALIASES,
}
