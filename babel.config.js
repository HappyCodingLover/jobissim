module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          api: './src/api',
          assets: './src/assets',
          components: './src/components',
          config: './src/config',
          contexts: './src/contexts',
          hooks: './src/hooks',
          main: './src/main',
          modals: './src/modals',
          navigation: './src/navigation',
          screens: './src/screens',
          store: './src/store',
          types: './src/types',
          utils: './src/utils',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ],
};
