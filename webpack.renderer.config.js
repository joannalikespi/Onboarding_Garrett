'use strict';

module.exports = (config) => {
  {
    /**
     * For {@link https://github.com/electron-userland/electron-webpack/issues/361}.
     */
    config.externals = [...config.externals, 'react', 'react-dom'];
  }

  {
    /**
     * For raw-loader. See {@link https://webpack.electron.build/modifying-webpack-configurations#configure-raw-loader}.
     */
    config.module.rules.push({
      test: /\.txt$/,
      use: 'raw-loader',
    });
  }

  return config;
};
