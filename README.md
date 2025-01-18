# ESLint Config

## Installation

```shell
npm install --save-dev @mustafazeydani/eslint-config eslint
# Or
yarn add --dev @mustafazeydani/eslint-config eslint
# Or
pnpm add --save-dev @mustafazeydani/eslint-config eslint
```

## Usage

**eslint.config.js**

```javascript
import { config } from '@mustafazeydani/eslint-config';

// These are the defaults, override as needed depending on project
export default config({
  env: { browser: true, es2021: true, node: true },
  exclude: [],
  json: { enabled: true, sort: { packageJson: true, tsconfig: true } },
  perfectionist: { enabled: true },
  react: { enabled: false },
  typescript: { enabled: true }
});

```

## VSCode

**settings.json**

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "javascript",
    "javascriptreact",
    "json",
    "jsonc"
  ]
}
```