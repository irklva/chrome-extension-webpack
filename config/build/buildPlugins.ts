import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import type { BuildOptions } from './types/types';
import type { Configuration } from 'webpack';

export function buildPlugins({ mode }: BuildOptions): Configuration['plugins'] {

    const isDev = mode === 'development';

    const plugins: Configuration['plugins'] = [
        new CopyPlugin({ patterns: [{ from: 'static' }] }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
    ];

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
    }

    return plugins;
}
