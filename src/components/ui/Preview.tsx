import { IImage } from "../../types";
import { Delete } from "../icons";

interface Props {
  images: IImage[];
  onDelete: (image: IImage) => void;
}

export const Preview = (props: Props) => {
  const { images, onDelete } = props;

  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-6 gap-2">
        {images.map((image) => {
          return (
            <div
              className="border rounded-md p-1 flex flex-col relative shadow-md h-[200px]"
              key={Math.random()}
            >
              {image.url && (
                <div className="flex-1 rounded-md h-[150px] w-full">
                  <img
                    src={image.url as string}
                    className="object-cover h-full w-full rounded-md"
                    alt={image.name}
                  />
                </div>
              )}
              {image.ref && (
                <span className="absolute top-[-5px] left-[-5px] px-2 py-0.5 shadow-md shadow-blue-600 rounded-full flex text-white text-xs bg-blue-500">
                  В облаке
                </span>
              )}
              <span
                onClick={() => onDelete(image)}
                className="absolute top-0.5 right-0.5 w-5 h-5 cursor-pointer flex items-center justify-center"
              >
                <Delete />
              </span>
              <p className="text-sm truncate">{image.name}</p>
              <p className="text-sm font-semibold text-right">
                Size: {image.size} kB
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
