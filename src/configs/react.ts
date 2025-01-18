import {filesFactory} from '../utils.js';
import type {
  FlatConfig,
  Options,
  ReactOptions,
  TypeScriptOptions,
} from '../index.js';

type ReactConfig = {
  fileRoots: Options['fileRoots'];
  react: ReactOptions;
  typescript: TypeScriptOptions;
};

export const reactConfig = async ({
  fileRoots,
  react,
  typescript,
}: ReactConfig): Promise<FlatConfig[]> => {
  const jsxA11yPlugin = await import('eslint-plugin-jsx-a11y');
  const reactPlugin = await import('eslint-plugin-react');

  return [
    {
      files: typescript?.enabled
        ? filesFactory(['**/*.jsx', '**/*.tsx'], fileRoots)
        : filesFactory(['**/*.jsx'], fileRoots),
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        'jsx-a11y': jsxA11yPlugin,
        react: reactPlugin,
      },
      rules: {
        ...reactPlugin.configs['recommended']?.rules,
        ...jsxA11yPlugin.configs['recommended']?.rules,
        'no-alert': 'error',
        'no-console': ['error', {allow: ['warn', 'error']}],
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
      },
      settings: {
        react: {
          version: react.version,
        },
      },
    },
    {
      files: filesFactory(['**/*.stories.jsx', '**/*.stories.tsx'], fileRoots),
      rules: {
        'no-alert': 'off',
      },
    },
  ];
};
