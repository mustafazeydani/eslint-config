import {baseConfig} from './configs/base.js';
import {jsonConfig} from './configs/json.js';
import {perfectionistConfig} from './configs/perfectionist.js';
import {reactConfig} from './configs/react.js';
import {typescriptConfig} from './configs/typescript.js';
import type {Linter} from 'eslint';

// Define the types for ESLint configuration and related inputs
type FlatConfig = Linter.Config<Linter.RulesRecord>;
type ConfigDef =
  | FlatConfig
  | FlatConfig[]
  | Promise<FlatConfig>
  | Promise<FlatConfig[]>;

interface EnvOptions {
  browser?: boolean;
  es2021?: boolean;
  node?: boolean;
}

interface JsonSortOptions {
  packageJson?: boolean;
  tsconfig?: boolean;
}

interface JsonOptions {
  enabled: boolean;
  sort?: JsonSortOptions;
}

interface PerfectionistOptions {
  enabled: boolean;
}

interface ReactOptions {
  enabled: boolean;
  version?: string;
}

interface TypeScriptOptions {
  enabled: boolean;
}

interface Options {
  env: EnvOptions;
  exclude: string[];
  fileRoots?: string[];
  json: JsonOptions;
  perfectionist: PerfectionistOptions;
  react: ReactOptions;
  typescript: TypeScriptOptions;
}

export const config = async (
  options: Options = {
    env: {browser: true, es2021: true, node: true},
    exclude: [],
    fileRoots: undefined,
    json: {enabled: true, sort: {packageJson: true, tsconfig: true}},
    perfectionist: {enabled: true},
    react: {enabled: false, version: 'detect'},
    typescript: {enabled: true},
  },
  ...args: ConfigDef[]
): Promise<FlatConfig[]> => {
  const {env, exclude, fileRoots, json, perfectionist, react, typescript} =
    options;

  const items: ConfigDef[] = [];
  items.push(baseConfig({env, exclude, fileRoots}));
  if (json.enabled) {
    items.push(jsonConfig({fileRoots, json}));
  }
  if (perfectionist.enabled) {
    items.push(perfectionistConfig({fileRoots}));
  }
  if (react.enabled) {
    items.push(reactConfig({fileRoots, react, typescript}));
  }
  if (typescript.enabled) {
    items.push(typescriptConfig({fileRoots, react}));
  }
  items.push(...args);
  return (await Promise.all(items)).flat();
};

export type {
  Options,
  FlatConfig,
  JsonOptions,
  PerfectionistOptions,
  ReactOptions,
  TypeScriptOptions,
};

export default config;
