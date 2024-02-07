import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { ModuleOptions } from 'webpack';

export function buildLoaders(): ModuleOptions['rules'] {

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    const scssLoader = {
        test: /\.(s[ac]ss|css)$/i,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
        ],
    };

    //Enable ts-loader if necessary
    // const tsLoader = {
    //     test: /\.tsx?$/,
    //     exclude: /node_modules/,
    //     use: 'ts-loader',
    // };

    const babelLoader = {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                // cacheDirectory: true,
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                ],
                plugins: ['@babel/plugin-transform-runtime'],
            },
        },
    };

    return [
        assetLoader,
        scssLoader,
        babelLoader,
        // tsLoader,
    ];
}
