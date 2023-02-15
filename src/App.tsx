import { deleteObject } from "firebase/storage";
import { useState } from "react";
import { Preview, ProgressBar } from "./components";
import { ContextProvider } from "./context";
import { Upload } from "./modules";
import { IImage } from "./types";

function App() {
  const [images, setImage] = useState<IImage[]>([]);

  const onDeleteImage = async (image: IImage) => {
    if (image.ref) {
      await deleteObject(image.ref);
    }
    setImage(images.filter((item) => item.id !== image.id));
  };

  const getPercentage = () => {
    const filtered = images.filter((image) => image.loaded);

    if (!filtered.length) {
      return 0;
    }

    const currentSize = filtered.reduce((sum, image) => {
      return sum + (image.loaded || 0);
    }, 0);

    if (!currentSize) {
      return 0;
    }

    const maxSize = filtered.reduce((sum, image) => {
      return sum + image.size;
    }, 0);

    if (currentSize === maxSize) {
      setImage((prev) => {
        return prev.map((_image) => ({
          ..._image,
          loaded: undefined,
        }));
      });
      return 0;
    }

    return (currentSize * 100) / maxSize;
  };

  return (
    <ContextProvider value={{ images, setImage }}>
      <div className="w-full max-w-3xl mx-auto px-2">
        <div className="flex gap-2 pt-32 pb-5">
          <ProgressBar percentage={getPercentage()} />
          <Upload />
        </div>
        <Preview images={images} onDelete={onDeleteImage} />
      </div>
    </ContextProvider>
  );
}

export default App;
