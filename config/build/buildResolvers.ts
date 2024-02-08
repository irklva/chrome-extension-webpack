import type { BuildOptions } from './types/types';
import type { Configuration } from 'webpack';

export function buildResolvers({ paths }: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.ts', '.js'],
        preferAbsolute: false,
        modules: [paths.src, 'node_modules'],
        mainFiles: ['index'],
        //Enable alias if necessary
        // alias: {
        //     '@': paths.src,
        // }
    };
}
