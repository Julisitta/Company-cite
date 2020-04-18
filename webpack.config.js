/* global require __dirname module */
let path = require('path');

let conf = {
    entry: './es6/index.js',
    output: {
        path: path.resolve(__dirname, './js'),
        filename: 'main.js',
        publicPath: 'js/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }
        ]
    }
};

module.exports = (env, options) => {
    conf.devtool = options.mode === "production" ? false : "cheap-module-eval-source-map";
    return conf;
};

const webpackConfig = {
    /* ... */
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              unsafe: true,
              inline: true,
              passes: 2,
              keep_fargs: false,
            },
            output: {
              beautify: false,
            },
            mangle: true,
          },
        }),
        new OptimizeCSSPlugin({
          cssProcessorOptions: {
            "preset": "advanced",
            "safe": true,
            "map": { "inline": false },
          },
        }),
      ],
    },
  };
