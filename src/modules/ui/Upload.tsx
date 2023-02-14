import { ChangeEvent, useEffect, useRef } from 'react';
import { Button } from '../../components';
import { useContextProvider } from '../../context';
import uuid from 'react-uuid';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { firebaseConfig } from '../../config';
import { IImage } from '../../types';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const Upload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { images, setImage } = useContextProvider();

  /** Загрузка картинок с облака */
  const getUploadedImages = async () => {
    /** Путь к картинкам в облаке */
    const listRef = ref(storage, 'images/');
    /** Все картинки */
    const { items } = await listAll(listRef);

    let currentImages: IImage[] = [];

    for (const itemRef of items) {
      const url = await getDownloadURL(itemRef);
      const metaData = await getMetadata(itemRef);

      currentImages.push({
        name: metaData.name,
        size: metaData.size,
        url: url,
        file: null,
        ref: itemRef,
        id: metaData.customMetadata?.id || '',
      });
    }

    setImage(currentImages);
  };

  /** Загрузка всех картинок локально */
  const onChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (files) {
      const arrayFiles = Array.from(files);

      arrayFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          setImage((prev) => {
            return [
              ...prev,
              {
                id: uuid(),
                name: file.name,
                size: file.size,
                url: reader.result as string,
                file,
              },
            ];
          });
        };

        reader.readAsDataURL(file);
      });
    }
  };

  /** Загрузка в облако */
  const onUpload = () => {
    images.forEach((image) => {
      /** Если нету ref, значит картинка новая. Обрабатываем */
      if (!image.ref) {
        /** Создаем ссылку на картинку */
        const storageRef = ref(storage, 'images/' + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image.file!, {
          customMetadata: { id: image.id },
        });

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            setImage((prev) => {
              return prev.map((_image) => {
                let temp: IImage | undefined;

                /** Если id равны, добавляем количество байтов, которые были успешно загружены на данный момент */
                if (_image.id === image.id) {
                  temp = {
                    ..._image,
                    loaded: snapshot.bytesTransferred,
                  };
                }

                /** + если === общему количеству байтов, которые должны быть загружены */
                if (
                  temp &&
                  _image.id === image.id &&
                  snapshot.bytesTransferred === snapshot.totalBytes
                ) {
                  temp = { ...temp, ref: storageRef };
                }

                return temp || _image;
              });
            });
          },
          (error) => console.log(error)
        );
      }
    });
  };

  // console.log(getPercentage());

  useEffect(() => {
    getUploadedImages();
  }, []);

  return (
    <div className=''>
      <input
        type='file'
        ref={inputRef}
        onChange={onChange}
        className='hidden'
        multiple
      />
      <div className='flex justify-end gap-2'>
        <Button
          className='border-2 border-slate-500 hover:border-slate-600'
          onClick={() => inputRef.current?.click()}
          text='Выбрать'
        />
        <Button
          className='text-white bg-green-700 hover:bg-green-800'
          onClick={onUpload}
          text='Загрузить'
        />
      </div>
    </div>
  );
};
