/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add custom asset extensions
config.resolver.assetExts = [
  ...config.resolver.assetExts.filter(ext => ext !== 'svg'),
  'db',
  'ttf',
  'otf',
  'svg',
  'png',
  'jpg',
  'jpeg',
  'gif'
];

// Setup SVG transformer
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// Source extensions
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  'jsx',
  'js',
  'ts',
  'tsx',
  'cjs',
  'mjs',
  'json'
];

module.exports = config;