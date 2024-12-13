"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  CloudArrowUp,
  FilePdf,
  Images,
  TrashSimple,
  XCircle,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

type Inputs = {
  document: any;
};

const DocumentUpload = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data: any) => console.log(data);

  useEffect(() => {}, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const onDragOver = (event: any) => {
    event.preventDefault();
    // Add hover styling here
    setIsHovered(true);
  };

  const onDragLeave = (event: any) => {
    event.preventDefault();
    // Remove hover styling here
    setIsHovered(false);
  };

  const onDrop = (event: any) => {
    event.preventDefault();
    setIsHovered(false);
    const file = event.dataTransfer.files[0];
    if (file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const onClickUpload = (event: any) => {
    event.preventDefault();
    const fileInput: any = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const formatFileSize = (size: number) => {
    const threshold = 1024; // 1 KB is 1024 bytes

    if (size < threshold) {
      return `${size} bytes`;
    } else if (size < threshold * threshold) {
      return `${(size / threshold).toFixed(2)} KB`;
    } else {
      return `${(size / (threshold * threshold)).toFixed(2)} MB`;
    }
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="font-semibold text-[2.25rem] text-[#1D2433]">
          Document Upload
        </h1>
        <p className="text-[#676E7E] font-medium">
          Upload a scanned copy of your certificate of incorporation (CAC) 
        </p>
      </header>
      {/* Page form */}

      <form
        className="profile-setup"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="image-uploader">
          <div
            className={`drop-zone relative`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <label
              htmlFor="fileInput"
              className="block text-[#1D2433] mb-3"
            >
              Upload CAC Document
            </label>
            <div
              className={`flex flex-col items-center justify-center gap-4 text-center  border-2  ${errors.document ? "border-red-600" : "border-[#D0D5DD]"} py-16 rounded ${isHovered ? " border-solid border-primary500 bg-[#f1f4f8]" : "border-dashed"} ease-linear duration-150`}
            >
              <div className="upload-text flex flex-col items-center gap-2">
                <span className="w-[64px] h-[64px] bg-primary100 rounded-full grid place-items-center">
                  <CloudArrowUp
                    size={32}
                    weight="fill"
                    className="text-primary600"
                  />
                </span>
                <p className="text-[#676E7E] font-medium text-sm">
                  Drag and drop files
                </p>
                <p className="text-[#98A2B3] text-xs font-normal">
                  (PDF or Docx)
                </p>
              </div>

              <p className="text-sm text-[#676E7E]">or</p>

              <label
                htmlFor="fileInput"
                className="flex items-center gap-1 text-sm bg-primary600 text-white font-medium py-3 px-8 rounded cursor-pointer hover:bg-primary700 ease-linear duration-150"
              >
                Browse Files
              </label>
              <input
                type="file"
                id="fileInput"
                accept=".pdf, .docx"
                hidden
                {...register("document", { required: true })}
                onChange={onClickUpload}
              />
            </div>
          </div>
          {errors.document && (
            <span className="block font-normal text-sm text-red-500 mt-2 mb-4">
              This field is required
            </span>
          )}

          {/* When the file has been uploaded */}
          {selectedFile && (
            <div className="flex items-center justify-between border border-[#E4E7EC] rounded p-4 mt-6">
              <div className="file-details flex items-center gap-2">
                <FilePdf size={30} />
                <div className="flex items-start flex-col">
                  <span className="text-[#1D2433] font-medium">
                    {/* @ts-ignore */}
                    {selectedFile?.name}
                  </span>
                  <span className="font-medium text-[#676E7E] text-sm">
                    {/* @ts-ignore */}
                    {formatFileSize(selectedFile?.size)}
                  </span>
                </div>
              </div>
              <span
                className="self-start cursor-pointer"
                onClick={() => {
                  setSelectedFile(null);
                }}
              >
                <TrashSimple
                  size={20}
                  className="text-[#344054] hover:text-primary600"
                />
              </span>
            </div>
          )}
        </div>
        <Button
          variant={"default"}
          type="submit"
          className="bg-primary600 w-full col-start-1 col-end-3 py-6 hover:bg-primary700 mt-6"
        >
          Complete
        </Button>
      </form>
    </>
  );
};

export default DocumentUpload;
