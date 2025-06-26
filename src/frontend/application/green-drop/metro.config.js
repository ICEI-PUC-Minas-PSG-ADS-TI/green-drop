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

config.server = {
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Bypass para problemas de CORS durante desenvolvimento
      if (req.url.startsWith('/v1/')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
      return middleware(req, res, next);
    };
  }
};

module.exports = config;