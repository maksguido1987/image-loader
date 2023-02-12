import { IImage } from '../../types';
import { Delete, Cloud } from '../icons';

interface Props {
  images: IImage[];
  isCloud: boolean;
  onDelete: (id: string) => void;
}

export const Preview = (props: Props) => {
  const { images, isCloud, onDelete } = props;

  return (
    <div>
      <div className='grid grid-cols-4 grid-rows-6 gap-2'>
        {images.map((image) => {
          return (
            <div
              className='border rounded-md p-1 flex flex-col relative shadow-md min-h-[200px]'
              key={Math.random()}
            >
              {image.url && (
                <div className='flex-1 rounded-md'>
                  <img
                    src={image.url as string}
                    className='object-cover h-full rounded-md'
                    alt={image.name}
                  />
                </div>
              )}
              {isCloud && (
                <span className='absolute top-0.5 left-0.5 w-5 h-5 flex items-center justify-center'>
                  <Cloud />
                </span>
              )}
              <span
                onClick={() => onDelete(image.id)}
                className='absolute top-0.5 right-0.5 w-5 h-5 cursor-pointer flex items-center justify-center'
              >
                <Delete />
              </span>
              <p className='text-sm truncate'>{image.name}</p>
              <p className='text-sm font-semibold text-right'>
                Size: {image.size} kB
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
