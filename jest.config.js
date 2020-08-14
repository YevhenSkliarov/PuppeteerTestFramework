module.exports = {
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/__tests__/**',
    '!src/*.js',
    '!src/store/*.js',
    '!src/utils/testUtils/*.js'
  ],
  reporters: ['default', 'jest-junit'],
  setupFilesAfterEnv: ['./jest.setup.js']
};
