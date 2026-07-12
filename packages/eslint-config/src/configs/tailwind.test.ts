import {
  describe, expect, it, vi, beforeEach 
} from 'vitest';

vi.mock('node:fs');

type TailwindTestConfig = {
  settings?: {
    tailwindcss?: {
      config?: string;
    };
  };
};

describe('tailwindConfig', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('returns empty array when no tailwind config file exists (tailwind v4)', async () => {
    const fs = await import('node:fs');
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const { tailwindConfig } = await import('./tailwind');
    const result = await tailwindConfig({ tailwind: true, react: true });

    expect(result).toEqual([]);
  });

  it('loads plugin and sets config path when tailwind.config.js exists (tailwind v3)', async () => {
    const fs = await import('node:fs');
    vi.mocked(fs.existsSync).mockImplementation(
      (path) => path === 'tailwind.config.js'
    );

    const { tailwindConfig } = await import('./tailwind');
    const result = await tailwindConfig({ tailwind: true, react: true });
    const config = result[0] as TailwindTestConfig;

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('dauphaihau/tailwind');
    expect(config.settings?.tailwindcss?.config).toBe('tailwind.config.js');
  });

  it('resolves the first matching config file', async () => {
    const fs = await import('node:fs');
    vi.mocked(fs.existsSync).mockImplementation(
      (path) => path === 'tailwind.config.ts'
    );

    const { tailwindConfig } = await import('./tailwind');
    const result = await tailwindConfig({ tailwind: true, react: true });
    const config = result[0] as TailwindTestConfig;

    expect(config.settings?.tailwindcss?.config).toBe('tailwind.config.ts');
  });

  it('returns empty array when tailwind option is false, even if config file exists', async () => {
    const fs = await import('node:fs');
    vi.mocked(fs.existsSync).mockImplementation(
      (path) => path === 'tailwind.config.js'
    );

    const { tailwindConfig } = await import('./tailwind');
    const result = await tailwindConfig({ tailwind: false });

    expect(result).toEqual([]);
  });
});
