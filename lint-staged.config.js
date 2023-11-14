module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'src/components/**/*': 'cspell',
  'docs/**/*': 'cspell',
};
