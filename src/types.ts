import { StorageReference } from 'firebase/storage';
import { Dispatch, SetStateAction } from 'react';

export type IImage = {
  id: string;
  name: string;
  size: number;
  url: string;
  file: File | null;
  loaded?: number;
  ref?: StorageReference;
};

export interface IContext {
  images: IImage[];
  setImage: Dispatch<SetStateAction<IImage[]>>;
}
