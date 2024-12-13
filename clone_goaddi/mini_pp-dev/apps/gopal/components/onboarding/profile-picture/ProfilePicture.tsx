import { useForm } from "react-hook-form";
import { useState } from "react";
import { OnboardProfilePicture } from "@/interfaces";
import Image from "next/image";

const ProfilePicture = ({
  name,
  label,
  errors,
  classes,
  setMediaFiles,
}: OnboardProfilePicture) => {
  // @ts-ignore
  const { register, getFieldValue } = useForm();

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      // @ts-ignore
      setPreviewImage(URL.createObjectURL(file));
      setMediaFiles(event.target.files);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div
      className={`bg-[#F0F2F5] rounded flex items-center justify-between w-full py-4 px-6 ${classes}`}
    >
      <div className="picture-text flex items-center gap-2 text-sm">
        {previewImage ? (
          <Image
            src={previewImage}
            width={64}
            height={64}
            className="rounded-full object-cover w-[64px] h-[64px]"
            alt=""
          ></Image>
        ) : (
          <Image
            src={"/assets/onboarding-profile.png"}
            width={64}
            height={64}
            className="rounded-full object-cover"
            alt=""
          ></Image>
        )}
        <div className="labels">
          <p className="text-[#676E7E] font-medium">
            At least 800 x 800 px recommended <br /> JPG or PNG is allowed
          </p>
        </div>
      </div>
      <label
        htmlFor={name}
        className="bg-primary600 text-sm text-white hover:bg-primary700 py-2 px-4 rounded cursor-pointer"
      >
        {label}
      </label>
      <input
        type="file"
        id={name}
        {...register(name)}
        hidden
        accept=".png, .jpg, .jpeg"
        onChange={handleImageChange}
      />
      {/* {previewImage && <img src={previewImage} alt="Preview" />} */}
      {/* {errors[name] && <span className="error">{errors[name].message}</span>} */}
    </div>
  );
};

export default ProfilePicture;
