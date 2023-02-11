import { ChangeEvent, useRef } from 'react';
import { Button } from '../../components';
import { useContextProvider } from '../../context';
import uuid from 'react-uuid';

export const Upload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onSetImage } = useContextProvider();

  const onChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (files) {
      const arrayFiles = Array.from(files);

      arrayFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          onSetImage({
            id: uuid(),
            name: file.name,
            size: file.size,
            image: reader.result,
          });
        };

        reader.readAsDataURL(file);
      });
    }
  };

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
          text='Загрузить'
        />
      </div>
    </div>
  );
};
