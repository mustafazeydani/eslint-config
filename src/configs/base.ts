import {filesFactory} from '../utils.js';
import type {FlatConfig, Options} from '../index.js';

export const baseConfig = async ({
  env,
  exclude,
  fileRoots,
}: Required<Pick<Options, 'env' | 'exclude'>> & {
  fileRoots?: string[];
}): Promise<FlatConfig[]> => {
  const js = await import('@eslint/js');
  const globals = await import('globals');

  return [
    {
      ignores: ['**/build', '**/dist', '**/node_modules', ...exclude],
    },
    {
      files: filesFactory(
        ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
        fileRoots,
      ),
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...(env.browser ? globals.browser : null),
          ...(env.es2021 ? globals.es2021 : null),
          ...(env.node ? globals.node : null),
        },
        sourceType: 'module',
      },
      rules: {
        ...js.configs.recommended.rules,
        'no-alert': 'error',
      },
    },
    {
      files: filesFactory(['**/*.cjs'], fileRoots),
      languageOptions: {
        globals: {
          ...globals.commonjs,
          ...globals.node,
          ...(env.es2021 ? globals.es2021 : null),
        },
        sourceType: 'commonjs',
      },
    },
  ];
};
