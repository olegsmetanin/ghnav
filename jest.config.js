const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
    // '^.+\\.tsx?$': 'ts-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/babel.config.js',
    '<rootDir>/enzyme.config.js',
    '<rootDir>/jest.config.js',
    '<rootDir>/next.config.js',
    '<rootDir>/pages/',
    '<rootDir>/server/',
    '/__tests__/'
  ]
}
