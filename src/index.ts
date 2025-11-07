import type { Config } from 'eslint/config'
import { baseConfig } from './configs/base'
import { typescriptConfig } from './configs/typescript'

export type Options = {
  typescript?: boolean
  react?: boolean
  vue?: boolean
}

export default function dauphaihau(options: Options = {}) {
  const { typescript } = options

  const configs: any[] = [
    ...baseConfig({ typescript }),
  ]

  if (typescript) {
    configs.push(...typescriptConfig())
  }

  return configs as Config[]
}
