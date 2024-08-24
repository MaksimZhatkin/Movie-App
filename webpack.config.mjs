/*eslint-disable*/
import { fileURLToPath } from 'url';
import path from 'path';

// import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
// const ProgressPlugin = webpack.ProgressPlugin;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default (env) => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  return {
    // Configuration
    mode: env.mode ?? 'development',
    devtool: isDev ? 'eval' : 'source-map',
    entry: './src/index.tsx',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'public'),
      clean: true,
    },
    resolve: {
      extensions: ['.jsx', '.js', '.ts', '.tsx'],
    },

    // Modules
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        browsers: ['last 2 versions', 'Firefox ESR', 'not OperaMini All', 'not dead'],
                      },
                    ],
                    ['autoprefixer', {}],
                  ],
                },
              },
            },
          ],
        },
      ],
    },

    // Pugins
    plugins: [
      // isDev && new ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'assets', 'img'),
            to: path.resolve(__dirname, 'public', 'img'),
          },
        ],
      }),
    ].filter(Boolean),

    // Optimization
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin({})],
    },

    // Server
    devServer: {
      static: './public',
      port: 3000,
      hot: true,
    },
  };
};
