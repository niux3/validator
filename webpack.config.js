const path = require('path');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const dev = process.env.NODE_ENV === 'dev';

let cssLoaders = [
    { loader: 'css-loader', options: { importLoaders: 1, minimize : !dev, url : false } }
]

if(!dev){
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: [
              require('autoprefixer')({
                  browsers : ["last 2 versions"]
              }),
            ]
        }
    });
}


let configuration = {
    watch : dev,
    devtool : dev ? "cheap-eval-source-map" : false,
    entry : {
        min : [
            './src/js/index.js',
            './src/scss/index.scss'
        ]
    },
    output : {
        path : path.resolve('./js'),
        filename : dev ? '[name].js' : '[name].[chunkhash:5].js',
        publicPath: './'
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use : ['babel-loader']
            },
            {
                test : /\.css$/,
                use : ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        ...cssLoaders
                    ]
                })
            },
            {
                test : /\.scss$/,
                use : ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        ...cssLoaders,
                        'sass-loader'
                    ]
                })
            },

        ]
    },
    plugins : [
        new ExtractTextPlugin({
            filename : dev ? '../css/[name].css' : '../css/[name].[contenthash:5].css',
            disable : false
        })
    ]
}
if(!dev){
    configuration.plugins.push(new uglifyjsWebpackPlugin());
    configuration.plugins.push(new ManifestPlugin({
        fileName : '../manifest.json'
    }));
    configuration.plugins.push(new CleanWebpackPlugin(['./js', './css'], {
        root : path.resolve('./'),
        verbose : true,
        dry : false,

    }));
}
module.exports = configuration;
