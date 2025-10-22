import '@testing-library/jest-dom';
import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock console methods in CI to reduce noise
if (process.env.CI) {
  beforeAll(() => {
    global.console = {
      ...console,
      warn: () => {},
      error: () => {},
    };
  });
}

// Mock URL and URLSearchParams for CI environment
if (typeof global.URL === 'undefined') {
  global.URL = class URL {
    constructor(public href: string, base?: string) {
      this.href = base ? new URL(href, base).href : href;
    }
    toString() {
      return this.href;
    }
  } as any;
}

if (typeof global.URLSearchParams === 'undefined') {
  global.URLSearchParams = class URLSearchParams {
    private params = new Map();
    
    constructor(init?: string | string[][] | Record<string, string>) {
      if (typeof init === 'string') {
        // Simple parsing for test purposes
        init.split('&').forEach(pair => {
          const [key, value] = pair.split('=');
          if (key) this.params.set(key, value || '');
        });
      }
    }
    
    get(name: string) {
      return this.params.get(name) || null;
    }
    
    set(name: string, value: string) {
      this.params.set(name, value);
    }
  } as any;
}

// runs a cleanup after each test case
afterEach(() => {
  cleanup();
});