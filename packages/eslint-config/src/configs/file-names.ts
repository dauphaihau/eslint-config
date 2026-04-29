import type { Options } from '..';
import checkFile from 'eslint-plugin-check-file';
import { strategyManager } from '../strategies';

export function fileNamesConfig(options: Options = {}) {
  const allFiles = strategyManager.getSourceFiles(options);
  const tsxFiles = strategyManager.getComponentFiles(options);

  return [
    {
      name: 'dauphaihau/file-names',
      files: allFiles,
      plugins: {
        'check-file': checkFile,
      },
      rules: {
        // Enforce kebab-case for regular files
        'check-file/filename-naming-convention': [
          'error',
          { '**/*': 'KEBAB_CASE' },
          { ignoreMiddleExtensions: true },
        ],
      },
    },
    {
      name: 'dauphaihau/file-names-tsx',
      files: tsxFiles,
      plugins: {
        'check-file': checkFile,
      },
      rules: {
        'check-file/filename-naming-convention': [
          'error',
          { '**/*': 'KEBAB_CASE' },
          { ignoreMiddleExtensions: true },
        ],
      },
    },
  ];
}
