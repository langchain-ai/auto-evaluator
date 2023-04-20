/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/e2e-tests',
  ],
  clearMocks: true,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
}
