module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./setupTests.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-expo|expo|@expo|react-native|@react-native|@unimodules|@react-navigation|@react-native-community|@react-native-picker|@react-native-masked-view|@react-native-async-storage|@react-native-segmented-control|@react-native-firebase|@react-native-google-signin|@react-native-map|@react-native-svg|@react-native-clipboard|@react-native-safe-area-context|@react-native-status-bar|@react-native-vector-icons|@react-native-community|@react-navigation/.*|@react-native/.*|@expo/.*|expo-.*|unimodules-.*|react-native-.*|@sentry/.*|@gorhom/.*|@shopify/.*|@stripe/.*|@invertase/.*|@fortawesome/.*))'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ["/node_modules/", "/__tests__/e2e/"],
};