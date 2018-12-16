const TEST_REGEX = '(/__tests__/.*|(\\.|/))(test|spec)\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    // '^.+\\.tsx?$': 'ts-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/out/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/babel.config.js',
    '<rootDir>/enzyme.config.js',
    '<rootDir>/jest.config.js',
    '<rootDir>/next.config.js',
    '<rootDir>/startstatic.js',
    '<rootDir>/pages/_app.tsx',
    '<rootDir>/pages/_document.tsx',
    '<rootDir>/src/common/theme/getPageContext.ts',
    '<rootDir>/server/',
    '/__tests__/'
  ],
  // moduleNameMapper: {
  //   '^common/(.*)$': '<rootDir>/src/common/$1',
  //   '^interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
  //   '^modules/(.*)$': '<rootDir>/src/modules/$1',
  //   '^fixtures/(.*)$': '<rootDir>/src/fixtures/$1',
  // }
}
