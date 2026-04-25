import type { Config } from 'eslint/config';
import type { Options } from '..';
import { strategyManager } from '../strategies';
import fs from 'node:fs';

const tailwindConfigFile =
  ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.mjs', 'tailwind.config.cjs']
    .find(f => fs.existsSync(f));

export async function tailwindConfig(options: Options = {}): Promise<Config[]> {
  const tailwindFiles = strategyManager.getTailwindFiles(options);

  if (tailwindFiles.length === 0 || !tailwindConfigFile) {
    return [];
  }

  const { default: tailwind } = await import('eslint-plugin-tailwindcss');

  return [
    {
      name: 'dauphaihau/tailwind',
      files: tailwindFiles,
      plugins: { tailwindcss: tailwind },
      settings: {
        tailwindcss: {
          config: tailwindConfigFile,
          callees: ['classnames', 'clsx', 'ctl', 'cva', 'cx', 'cn'],
          tags: ['tw'],
        },
      },
      rules: {
        'tailwindcss/classnames-order': 'warn',
        'tailwindcss/enforces-negative-arbitrary-values': 'warn',
        'tailwindcss/enforces-shorthand': 'warn',
        'tailwindcss/migration-from-tailwind-2': 'off', // projects target v3+
        'tailwindcss/no-arbitrary-value': 'off', // too restrictive globally; colors enforced below via no-restricted-syntax
        'tailwindcss/no-contradicting-classname': 'error',
        'tailwindcss/no-custom-classname': 'warn',
        'tailwindcss/no-unnecessary-arbitrary-value': 'warn',

        // Partial enforcement of no-arbitrary-value scoped to color utilities.
        // Arbitrary color values (bg-[#fff], text-[rgba(...)]) bypass the design
        // system and should use config tokens instead. Covers: bg, text, border,
        // ring, fill, stroke, from, via, to, accent, caret, decoration, outline,
        // placeholder, shadow, divide — for hex, rgb(), rgba(), hsl(), hsla(), oklch().
        'no-restricted-syntax': [
          'warn',
          {
            selector: 'Literal[value=/(?:^|\\s)(?:bg|text|border|ring|fill|stroke|from|via|to|accent|caret|decoration|outline|placeholder|shadow|divide)-\\[(?:#[0-9a-fA-F]|rgba?\\(|hsla?\\(|oklch\\()/]',
            message: 'Avoid arbitrary color values (e.g. bg-[#fff]). Use a design system color token from the Tailwind config instead.',
          },
        ],
      },
    },
  ];
}
