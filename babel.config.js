module.exports = {
  presets: [
    ['@babel/env', { modules: false }],
    '@babel/react',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/syntax-dynamic-import',
    'react-hot-loader/babel',
    'recharts',
  ],
  env: {
    test: {
      presets: [
        ['@babel/env'],
        '@babel/react',
      ],
      plugins: [
        '@babel/proposal-class-properties',
      ],
    },
  },
};
