module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'src/**/*': 'cspell --no-summary --no-progress --no-must-find-files --file-list stdin',
  'docs/**/*': 'cspell --no-summary --no-progress --no-must-find-files --file-list stdin',
};
