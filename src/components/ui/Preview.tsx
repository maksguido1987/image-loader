import { IImage } from '../../types';

export const Preview = (props: { images: IImage[] }) => {
  const { images } = props;

  return (
    <div>
      <div className='flex'>
        {images.map((image) => {
          return (
            <div className=''>
              <p className=''>{image.name}</p>
              <p className=''>{image.size}</p>
              {image.image && <img src={image.image as string} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
