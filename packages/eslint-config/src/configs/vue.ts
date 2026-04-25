import type { Config } from 'eslint/config';
import type { Options } from '..';
import { strategyManager } from '../strategies';

export async function vueConfig(options: Options = {}): Promise<Config[]> {
  const vueFiles = strategyManager.getVueFiles(options);

  if (vueFiles.length === 0) {
    return [];
  }

  const { default: pluginVue } = await import('eslint-plugin-vue');

  // flat/recommended = [setup, vue-parser+processor, essential-rules, strongly-recommended-rules, recommended-rules]
  const recommendedConfigs = pluginVue.configs['flat/recommended'] as Config[];
  const [pluginSetup, parserSetup, ...ruleConfigs] = recommendedConfigs;

  // Merge all rule-only configs into one scoped to vueFiles
  const mergedRules = ruleConfigs.reduce<Record<string, unknown>>(
    (acc, c) => ({ ...acc, ...(c as { rules?: Record<string, unknown> }).rules }),
    {}
  );

  // When TypeScript is enabled, inject @typescript-eslint/parser as the inner <script> parser
  const tsParser = options.typescript
    ? (await import('typescript-eslint')).parser
    : undefined;

  const parserConfig: Config = tsParser
    ? {
      ...parserSetup,
      languageOptions: {
        ...parserSetup.languageOptions,
        parserOptions: {
          ...(parserSetup.languageOptions as { parserOptions?: object } | undefined)?.parserOptions,
          parser: tsParser,
        },
      },
    }
    : parserSetup;

  return [
    pluginSetup, // registers vue plugin globally
    parserConfig, // vue-eslint-parser + processor for *.vue files
    {
      name: 'dauphaihau/vue',
      files: vueFiles,
      rules: {
        ...mergedRules,
        'vue/comment-directive': 'off', // meta-rule; disable directives handled by ESLint core
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        'vue/multi-word-component-names': 'warn',
        'vue/no-v-html': 'warn',
        'vue/html-self-closing': ['error', {
          html: { void: 'always', normal: 'always', component: 'always' },
          svg: 'always',
          math: 'always',
        }],
        'vue/attribute-hyphenation': ['error', 'always'],
        'vue/no-unused-vars': 'error',
        'vue/no-use-v-if-with-v-for': 'error',
        'vue/require-v-for-key': 'error',
      },
    },
  ];
}
