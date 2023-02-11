import { useState } from 'react';
import { Preview } from './components';
import { ContextProvider } from './context';
import { Upload } from './modules';
import { IImage } from './types';

function App() {
  const [images, setImage] = useState<IImage[]>([]);

  const onSetImage = (image: IImage) => {
    setImage([...images, image]);
  };

  console.log(images);

  return (
    <ContextProvider value={{ images, onSetImage }}>
      <div className='w-full max-w-3xl mx-auto px-2'>
        <Upload />
        <Preview images={images} />
      </div>
    </ContextProvider>
  );
}

export default App;
