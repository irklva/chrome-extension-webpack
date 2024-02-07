interface EntryObject {
    [key: string]: string;
}
export interface BuildPaths {
    entry: string | EntryObject;
    output: string;
    src: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
    paths: BuildPaths;
    mode: BuildMode;
}
