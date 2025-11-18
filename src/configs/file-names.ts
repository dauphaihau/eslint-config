import type { Options } from '..';
import filenamesSimple from 'eslint-plugin-filenames-simple';
import { strategyManager } from '../strategies';

export function fileNamesConfig(options: Options = {}) {
  const allFiles = strategyManager.getSourceFiles(options);
  const tsxFiles = strategyManager.getComponentFiles(options);

  return [
    {
      name: 'dauphaihau/file-names',
      files: allFiles,
      plugins: {
        'filenames-simple': filenamesSimple,
      },
      rules: {
        // Enforce kebab-case for regular files
        'filenames-simple/naming-convention': [
          'error',
          { rule: 'kebab-case' },
        ],
        'filenames-simple/extension': 'error',
      },
    },
    // TSX/JSX files: Allow PascalCase for React components (e.g., MyComponent.tsx)
    {
      name: 'dauphaihau/file-names-tsx',
      files: tsxFiles,
      plugins: {
        'filenames-simple': filenamesSimple,
      },
      rules: {
        'filenames-simple/naming-convention': [
          'error',
          { rule: 'PascalCase' },
        ],
        'filenames-simple/extension': 'error',
      },
    },
  ];
}
