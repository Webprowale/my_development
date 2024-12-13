import cloudinary from "./cloudinary";

export const UploadFile = async (file: File, folder: string) => {
  const bufffer = await file.arrayBuffer();
  const bytes = Buffer.from(bufffer);

  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
          quality: "auto:low",
          // categorization: "google_tagging",
        },
        async (err, result) => {
          if (err) {
            reject(err.message);
          }
          resolve(result);
        },
      )
      .end(bytes);
  });
};
