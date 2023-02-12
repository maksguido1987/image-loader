import { useState } from 'react';
import { Preview, ProgressBar } from './components';
import { ContextProvider } from './context';
import { Upload } from './modules';
import { IImage } from './types';

function App() {
  const [images, setImage] = useState<IImage[]>([]);

  const onDeleteImage = (id: string) => {
    setImage(images.filter((item) => item.id !== id));
  };

  console.log(images);

  return (
    <ContextProvider value={{ images, setImage }}>
      <div className='w-full max-w-3xl mx-auto px-2'>
        <div className='flex gap-2 pt-32 pb-5'>
          <ProgressBar percentage={55} />
          <Upload />
        </div>
        <Preview images={images} isCloud={true} onDelete={onDeleteImage} />
      </div>
    </ContextProvider>
  );
}

export default App;
