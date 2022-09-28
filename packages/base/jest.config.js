const packagesToTranspile = [
  '@35up/*',
];

module.exports = {
  setupFilesAfterEnv: ['./src/setup-tests.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: ['base/**/*.ts'],
  moduleNameMapper: {
    nanoid: '<rootDir>/node_modules/nanoid/index.cjs',
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
