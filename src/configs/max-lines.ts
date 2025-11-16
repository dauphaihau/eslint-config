import { Options } from '..'
import { strategyManager } from '../strategies'

const defaultConfig = {
  ui: 300,
  logic: 500,
  test: 800,
  fallback: 400,
}

export function maxLinesConfig(options: Options = {}) {
  const allFiles = strategyManager.getAllFiles(options)
  const reactFiles = strategyManager.getReactFiles(options)
  const vueFiles = strategyManager.getVueFiles(options)
  const tsFiles = strategyManager.getTypeScriptFiles(options)
  const testFiles = strategyManager.getTestFiles(options)

  return [
    // general default for all files (fallback)
    {
      name: "dauphaihau/max-lines",
      files: allFiles,
      rules: {
        'max-lines-per-function': [
          'error',
          { max: defaultConfig.fallback }
        ],
      },
    },

    // Service / logic files (using strategy pattern)
    ...(tsFiles.length > 0 ? [{
      name: "dauphaihau/max-lines",
      files: tsFiles,
      rules: {
        'max-lines-per-function': [
          'warn',
          { max: defaultConfig.logic },
        ],
      },
    }] : []),

    // Test files (using strategy pattern)
    ...(testFiles.length > 0 ? [{
      files: testFiles,
      rules: {
        'max-lines': 'off', // or allow 800
      },
    }] : []),

    // React components files (using strategy pattern)
    ...(reactFiles.length > 0 ? [{
      files: reactFiles,
      rules: {
        'max-lines': [
          'warn',
          { max: defaultConfig.ui, skipBlankLines: true, skipComments: true },
        ],
      },
    }] : []),

    // Vue components files (using strategy pattern)
    ...(vueFiles.length > 0 ? [{
      files: vueFiles,
      rules: {
        'max-lines': [
          'warn',
          { max: defaultConfig.ui, skipBlankLines: true, skipComments: true },
        ],
      },
    }] : []),
  ]

}

