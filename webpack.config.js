// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'index.js',
    },
    devServer: {
        open: true,
        host: 'localhost',
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
    module: {
        rules: [
          {
            test: /\.(scss)$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: () => [
                      require('autoprefixer')
                    ]
                  }
                }
              },
              {
                loader: 'sass-loader'
              }
            ]
          }
        ]
      }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
