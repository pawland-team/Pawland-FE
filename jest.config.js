const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  // testEnvironment: 'jsdom',
  testEnvironment: 'jest-environment-jsdom',
  // https://yamea-guide.tistory.com/entry/NEXTjs-Cannot-find-module-mswnode-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0
  // https://github.com/mswjs/msw/issues/1786
  // https://mswjs.io/docs/migrations/1.x-to-2.x/#cannot-find-module-mswnode-jsdom
  // testEnvironmentOptions: {
  //   customExportConditions: [''],
  // },

  // https://mswjs.io/docs/migrations/1.x-to-2.x/#requestresponsetextencoder-is-not-defined-jest
  // setupFiles: ['./jest.polyfills.js'],
  setupFiles: ['<rootDir>/dotenv-config.js'],

  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  modulePathIgnorePatterns: ['cypress'],
  preset: 'ts-jest',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
