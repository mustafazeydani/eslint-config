const config = {
  '*.{ts,tsx}': ["bash -c 'pnpm check-types'"],
  '*.{js,cjs,mjs,jsx,ts,tsx,json}': ['eslint --fix'],
  '*.{js,cjs,mjs,jsx,ts,tsx,css}': ['prettier --write --ignore-unknown'],
};

export default config;
