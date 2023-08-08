import react from '@vitejs/plugin-react';
import '@testing-library/jest-dom';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  test: {
    include: ['**/*.test.tsx'],
    globals: true,
    setupFiles: './src/test/setup.ts'
  },
});
