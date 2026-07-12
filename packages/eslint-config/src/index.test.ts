import { describe, expect, it } from 'vitest';
import dauphaihauConfig from './index';
import { namingConfig } from './configs/naming';

type RuleLevel = 'off' | 'warn' | 'error' | 0 | 1 | 2;

type ConfigWithRules = {
  name?: string
  rules?: Record<string, RuleLevel | [RuleLevel, ...unknown[]]>
};

type NamingConventionSelector = {
  selector?: string | string[]
  modifiers?: string[]
  format?: string[] | null
  filter?: {
    regex: string
    match: boolean
  }
};

function hasRule(configs: unknown[], ruleName: string): boolean {
  return configs.some((config) => {
    const rules = (config as ConfigWithRules).rules;
    return !!rules && ruleName in rules;
  });
}

function hasNamedConfig(configs: unknown[], name: string): boolean {
  return configs.some((config) => (config as ConfigWithRules).name === name);
}

function getNamingConventionSelectors(configs: unknown[], name: string): NamingConventionSelector[] {
  const config = configs.find((entry) => (entry as ConfigWithRules).name === name) as ConfigWithRules | undefined;
  const namingConvention = config?.rules?.['@typescript-eslint/naming-convention'];

  if (!Array.isArray(namingConvention)) {
    return [];
  }

  return namingConvention.slice(1) as NamingConventionSelector[];
}

describe('dauphaihauConfig tech stack disabling', () => {
  it('omits TypeScript configs when typescript is false', async () => {
    const configs = await dauphaihauConfig({ typescript: false });

    expect(hasNamedConfig(configs, 'dauphaihau/typescript-explicit-return-types')).toBe(false);
    expect(hasRule(configs, '@typescript-eslint/explicit-function-return-type')).toBe(false);
  });

  it('omits React configs when react is false', async () => {
    const configs = await dauphaihauConfig({
      typescript: true,
      react: false,
    });

    expect(hasNamedConfig(configs, 'dauphaihau/react')).toBe(false);
    expect(hasRule(configs, 'react/jsx-key')).toBe(false);
    expect(hasRule(configs, 'react-hooks/rules-of-hooks')).toBe(false);
  });

  it('omits Tailwind configs when tailwind is false', async () => {
    const configs = await dauphaihauConfig({
      typescript: true,
      react: true,
      tailwind: false,
    });

    expect(hasNamedConfig(configs, 'dauphaihau/tailwind')).toBe(false);
    expect(hasRule(configs, 'tailwindcss/classnames-order')).toBe(false);
  });
});

describe('namingConfig', () => {
  it('allows const variables to use UPPER_CASE', () => {
    const configs = namingConfig({ typescript: true });
    const selectors = getNamingConventionSelectors(configs, 'dauphaihau/naming');

    expect(selectors).toContainEqual(
      expect.objectContaining({
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'UPPER_CASE'],
      }),
    );
  });

  it('only allows PascalCase variable names in TSX when they look like component names', () => {
    const configs = namingConfig({ typescript: true });
    const selectors = getNamingConventionSelectors(configs, 'dauphaihau/naming-tsx');

    expect(selectors[0]).toEqual(
      expect.objectContaining({
        selector: 'function',
        format: ['PascalCase', 'camelCase'],
      }),
    );
    expect(selectors[1]).toEqual(
      expect.objectContaining({
        selector: 'variable',
        format: ['camelCase', 'PascalCase'],
        filter: {
          regex: '^[A-Z][a-zA-Z0-9]*$',
          match: true,
        },
      }),
    );
  });
});
