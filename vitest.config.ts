import viteConfig from './vite.config';
import { mergeConfig } from 'vitest/config';

export default mergeConfig(viteConfig, {
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
  },
});
