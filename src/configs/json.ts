import {filesFactory} from '../utils.js';
import {FlatConfig, JsonOptions, Options} from '../index.js';

type JsonConfig = {
  fileRoots: Options['fileRoots'];
  json: JsonOptions;
};

export const jsonConfig = async ({
  fileRoots,
  json,
}: JsonConfig): Promise<FlatConfig[]> => {
  const plugin = await import('eslint-plugin-jsonc');
  const parser = await import('jsonc-eslint-parser');

  const configs: FlatConfig[] = [];
  if (json.sort?.packageJson) {
    configs.push({
      files: filesFactory(['**/package.json'], fileRoots),
      languageOptions: {
        parser,
      },
      plugins: {
        // @ts-ignore
        jsonc: plugin,
      },
      rules: {
        'jsonc/sort-array-values': [
          'warn',
          {
            order: {type: 'asc'},
            pathPattern: '^files$',
          },
        ],
        'jsonc/sort-keys': [
          'warn',
          {
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
            ],
            pathPattern: '^$',
          },
          {
            order: {type: 'asc'},
            pathPattern:
              '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
          },
          {
            order: {type: 'asc'},
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
          },
          {
            order: ['types', 'import', 'require', 'default'],
            pathPattern: '^exports.*$',
          },
        ],
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
      },
    });
  }
  if (json.sort?.tsconfig) {
    configs.push({
      files: filesFactory(
        ['**/jsconfig.json', '**/tsconfig.json', '**/tsconfig.*.json'],
        fileRoots,
      ),
      rules: {
        'jsonc/sort-keys': [
          'warn',
          {
            order: [
              'extends',
              'compilerOptions',
              'references',
              'files',
              'include',
              'exclude',
            ],
            pathPattern: '^$',
          },
        ],
      },
    });
  }
  return configs;
};
