import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import type { BuildOptions } from './types/types';
import type webpack from 'webpack';

export function buildWebpack(options: BuildOptions): webpack.Configuration {

    const { mode, paths } = options;
    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].js',
            clean: true,
        },
        plugins: buildPlugins(options),
        module: { rules: buildLoaders() },
        resolve: buildResolvers(options),
        devtool: isDev && 'inline-source-map',
    };
}
