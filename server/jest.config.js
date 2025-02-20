module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    testPathIgnorePatterns: [
      '/node_modules./',
      '<rootDir>/(coverage|dist|lib|tmp)./',
    ],
    moduleDirectories: ['node_modules', 'src'],
    rootDir: '.',
    moduleNameMapper: {
      '^@(database|common|config|app)$':
        '<rootDir>/src/$1/index',
    },
  };