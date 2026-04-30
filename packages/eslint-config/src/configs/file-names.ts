import type { Options } from '..';
import checkFile from 'eslint-plugin-check-file';
import { strategyManager } from '../strategies';

export function fileNamesConfig(options: Options = {}) {
  const allFiles = strategyManager.getSourceFiles(options);
  const tsxFiles = strategyManager.getComponentFiles(options);
  const vueFiles = strategyManager.getVueFiles(options);

  const kebabCaseRule = {
    'check-file/filename-naming-convention': [
      'error',
      { '**/*': 'KEBAB_CASE' },
      { ignoreMiddleExtensions: true },
    ],
  } as const;

  const configs = [
    {
      name: 'dauphaihau/file-names',
      files: allFiles,
      plugins: { 'check-file': checkFile },
      rules: kebabCaseRule,
    },
    {
      name: 'dauphaihau/file-names-tsx',
      files: tsxFiles,
      plugins: { 'check-file': checkFile },
      rules: kebabCaseRule,
    },
  ];

  if (vueFiles.length > 0) {
    configs.push({
      name: 'dauphaihau/file-names-vue',
      files: vueFiles,
      plugins: { 'check-file': checkFile },
      rules: kebabCaseRule,
    });
  }

  return configs;
}
