import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  test: {
    globals: true,
    include: ['**/*.test.tsx'],
    setupFiles: resolve(__dirname, 'src/test/setup.ts'),
  },
});
