import path from 'path';
import {Linter} from 'eslint';

type FlatConfig = Linter.Config<Linter.RulesRecord>;

export const filesFactory = (files: string[], roots?: string[]): string[] => {
  if (!roots) {
    return files;
  }
  return roots.flatMap(root => files.map(file => path.join(root, file)));
};

export const applyFilesFactory = (
  configs: FlatConfig[],
  roots?: string[],
): FlatConfig[] => {
  return configs.map(config => {
    const files: string[] | undefined = Array.isArray(config.files)
      ? config.files.flat()
      : config.files;
    if (!files) {
      return config;
    }
    return {...config, files: filesFactory(files, roots)};
  });
};
