import { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/test/*.ts', '<rootDir>/**/test/types/*.ts'],
  collectCoverageFrom: ['src/**'],
};

export default jestConfig;