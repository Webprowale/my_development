"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Props = {};

const Upload = (props: Props) => {
  const [files, setFiles] = useState<FileList | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!files) {
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(`file${i}`, files[i]);
      }

      const response = await axios.post("/api/upload", formData);
      const data = response.data;
      console.log("Upload Data", data);
    } catch (error: any) {
      console.log("Error", error.message);
    }
  };
  return (
    <div className="grid place-items-center w-full h-screen">
      <form onSubmit={onSubmitHandler}>
        <input
          onChange={onChangeHandler}
          type="file"
          name="files"
          id="files"
          multiple
          accept="image/*, video/*"
        />
        <Button>Upload</Button>
      </form>
    </div>
  );
};

export default Upload;
