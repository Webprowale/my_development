import { Images, XCircle } from "@phosphor-icons/react";
import React, { useState } from "react";

const ImageUploader = ({ onFileChange }: { onFileChange: any }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDrop = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      // @ts-ignore
      setSelectedImage(URL.createObjectURL(file));
      onFileChange(file);
    } else {
      alert("Please select an image file.");
    }
  };

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // @ts-ignore
      setSelectedImage(URL.createObjectURL(file));
      onFileChange(file);
    } else {
      alert("Please select an image file.");
    }
  };

  return (
    <div className="image-uploader">
      <div
        className="drop-zone relative"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        {selectedImage && (
          <div className="uploaded-image w-[148px] h-[184px] relative">
            <img
              src={selectedImage}
              className="w-full h-full object-cover rounded"
              alt="Uploaded Image"
            />
            <XCircle
              size={26}
              weight="fill"
              onClick={() => setSelectedImage(null)}
              className="text-red-600 absolute top-1 right-1 cursor-pointer"
            />
          </div>
        )}

        {!selectedImage && (
          <div className="flex flex-col items-center justify-center gap-4 text-center  border border-dashed border-[#98A2B3] py-12 rounded">
            <span className="w-[64px] h-[64px] bg-primary100 grid place-items-center rounded">
              <Images size={32} weight="fill" className="text-primary600" />
            </span>

            <label
              htmlFor="image-input"
              className="flex items-center gap-1 text-sm"
            >
              <p>Drag and drop your image here or </p>

              <span className="text-primary600 font-medium cursor-pointer">
                {/*  */}click here
              </span>
            </label>
            <input
              type="file"
              id="image-input"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
