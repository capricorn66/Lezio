const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function generateHtml(htmltemplate) {
    return new HtmlWebpackPlugin({
        filename: `${htmltemplate}.html`,
        template: `./app/${htmltemplate}.html`,
    });
}

const htmlIndex = generateHtml('index');
const htmlBusiness = generateHtml('business');
const htmlBusiness2 = generateHtml('business_v2');
const htmlFAQ = generateHtml('FAQ');
const htmlContact = generateHtml('contact');
const htmlRegulations = generateHtml('regulations');
const htmlAppRegulations = generateHtml('appRegulations');


module.exports = (env, options) => {

    const devMode = options.mode !== 'production';

    return {

        entry: {
            script: './app/js/app.js',
            style: './app/scss/app.scss',
        },

        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: devMode ? 'js/[name].js' : 'js/[name].min.js'
        },

        plugins: [
            new CopyPlugin([
                {from: './app/images', to: 'images'},
                {from: './app/favicon', to: 'favicon'},
            ]),
            new MiniCssExtractPlugin({
                filename: devMode ? 'css/[name].css' : 'css/[name].min.css',
                chunkFilename: devMode ? 'css/[name].css' : 'css/[name].min.css',
            }),
        ]
            .concat(htmlIndex)
            .concat(htmlBusiness)
            .concat(htmlFAQ)
            .concat(htmlContact)
            .concat(htmlRegulations)
            .concat(htmlAppRegulations)
            .concat(htmlBusiness2),

        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new UglifyJsPlugin(),
            ],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        enforce: true
                    },
                },
                chunks: 'all',
            }
        },

        module: {
            rules: [
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                        {
                            loader: 'expose-loader',
                            options: '$'
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node-modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use:  [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: path.resolve(__dirname, 'dist'),
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                },
                {
                    test: /\.(woff|woff2)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            //limit: 500,
                            publicPath: path.resolve(__dirname, 'dist/fonts'),
                            outputPath:  `fonts`,
                            name: '[name].[ext]?[hash:6]'
                        }
                    }
                },
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            publicPath: `../images`,
                            outputPath:  `images`,
                            name:'[name].[ext]'
                        }
                    }
                }


            ]
        },

        devtool: 'source-map'

    }
};

