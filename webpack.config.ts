import path from 'path';
import { buildWebpack } from './config/build/buildWebpack';
import type { BuildMode, BuildPaths } from './config/build/types/types';
import type webpack from 'webpack';

interface EnvVariables {
    mode?: BuildMode;
}

export default (env: EnvVariables) => {

    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'dist'),
        entry: {
            content: path.resolve(__dirname, 'src', 'content', 'content.ts'),
            // Use the following directories as needed
            // service: path.resolve(__dirname, 'src', 'service', 'service.ts'),
            // popup: path.resolve(__dirname, 'src', 'popup', 'popup.ts'),
            // options: path.resolve(__dirname, 'src', 'options' 'options.ts'),
        },
        src: path.resolve(__dirname, 'src'),
    };

    const config: webpack.Configuration = buildWebpack({
        mode: env.mode ?? 'development',
        paths: paths,
    });

    return config;
};
