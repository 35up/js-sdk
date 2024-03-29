const packagesToTranspile = [
  '@35up/*',
];

module.exports = {
  setupFilesAfterEnv: ['./src/setup-tests.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    ...(process.env.JEST_ACCEPTANCE ? [] : ['/demo/']),
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 75,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: ['src/**/*.ts', 'index.ts'],
  moduleNameMapper: {
    nanoid: '<rootDir>/../../node_modules/nanoid/index.cjs',
  },
  transformIgnorePatterns: [
    `/node_modules/(?!${packagesToTranspile.join('|')})`,
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
};
