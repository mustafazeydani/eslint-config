const config = {
  '*.{ts,tsx}': ["bash -c 'pnpm check-types'"],
  '*.{js,cjs,mjs,jsx,ts,tsx,json}': ['eslint --cache --fix'],
  '*.{js,cjs,mjs,jsx,ts,tsx,css}': [
    'prettier --cache --write --ignore-unknown',
  ],
};

export default config;
