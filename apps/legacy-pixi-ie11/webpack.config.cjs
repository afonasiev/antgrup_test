const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_env, argv) => ({
  mode: argv.mode || 'development',
  devtool: argv.mode === 'production' ? false : 'eval-cheap-module-source-map',
  entry: {
    app: path.resolve(__dirname, 'src/main.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: { ie: '11' },
                    useBuiltIns: 'entry',
                    corejs: '3.47',
                  },
                ],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, 'dist') }],
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 5174,
  },
});
