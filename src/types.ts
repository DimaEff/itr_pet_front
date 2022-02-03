export interface Image {
    filename: string;
    path: string;
}

export type ImageWithPreview = [File, string] | null;