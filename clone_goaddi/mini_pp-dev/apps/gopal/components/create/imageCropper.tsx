//@ts-nocheck
import { useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { Input } from "../ui/input";

type Props = {};

const ImageCropper = ({ image, onCropDone, onCropCancel }: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(4 / 3);

  const onCropComplete = (
    croppedAreaPercentage: Area,
    croppedAreaPixels: Area,
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAspectRatio(event.target.value);
  };

  return (
    <div className="flex flex-col max-w-[500px] h-full items-center gap-5">
      <Cropper
        image={image}
        aspect={aspectRatio}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        // style={{
        //   containerStyle: {
        //     width: "100%",
        //     height: "700px",
        //     backgroundColor: "#fff",
        //   },
        //   mediaStyle: {
        //     width: "100%",
        //     height: "fit-content",
        //   },
        // }}
        // classes={{
        //   mediaClassName: "h-fit",
        // }}
      />

      <div className="mt-6 space-x-4">
        <div className="pt-40 space-y-4 flex items-center gap-2">
          <Input
            type="radio"
            className="w-5 h-5"
            value={1 / 1}
            name="ratio"
            checked={aspectRatio === 1}
            onChange={onAspectRatioChange}
          />
          <span className="ml-2">1:1</span>
          <Input
            type="radio"
            value={5 / 4}
            className="w-5 h-5"
            name="ratio"
            checked={aspectRatio === 5 / 4}
            onChange={onAspectRatioChange}
          />
          <span className="ml-2">5:4</span>
          <Input
            type="radio"
            value={4 / 3}
            className="w-5 h-5"
            name="ratio"
            checked={aspectRatio === 4 / 3}
            onChange={onAspectRatioChange}
          />
          <span className="ml-2">4:3</span>
        </div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onCropCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => onCropDone(croppedArea, image)}
        >
          Crop & Apply
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
