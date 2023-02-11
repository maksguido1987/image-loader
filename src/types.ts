export interface IImage {
  name: string;
  size: number;
  image: string | ArrayBuffer | null;
}

export interface IContext {
  images: IImage[];
  onSetImage: (image: IImage) => void;
}
