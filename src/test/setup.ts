// this file is imported by vitest.config.ts
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest'
import '@testing-library/react';

expect.extend(matchers);
