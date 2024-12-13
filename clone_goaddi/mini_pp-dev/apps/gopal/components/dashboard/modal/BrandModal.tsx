"use client";

import { BrandModalType } from "@/interfaces";
import { X } from "@phosphor-icons/react";
import { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageUploader from "../imageUploader/ImageUploader";
import { useRouter, useSearchParams } from "next/navigation";

type Inputs = {
  brandName: string;
  image: any;
};

const BrandModal = ({ title, paragraph }: BrandModalType) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();

  // handle image upload from image uploader
  const handleFileChange = (file: any) => {
    // Do something with the emitted file, e.g., send to server
    console.log("Received file:", file);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handleClose = () => {
    router.push("gopal/dashboard/quotation");
  };

  useEffect(() => {
    if (mode.get("brandModal") === "open") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: any) => {
        if (event.key === "Escape") {
          router.push("/dashboard/quotation");
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  useEffect(() => {
    // @ts-ignore
    if (isOpen && !modalRef.current.classList.contains("visible")) {
      // @ts-ignore
      modalRef.current.classList.add("visible");
      // @ts-ignore
    } else if (!isOpen && modalRef.current.classList.contains("visible")) {
      // @ts-ignore
      modalRef.current.classList.remove("visible");
    }
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      className={`brand-name fixed ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center w-full inset-0 backdrop-blur-sm bg-[#00000070] z-50`}
    >
      <div className="brand-name__container w-[90%] md:w-[40%] bg-white p-8 rounded relative">
        <header>
          <img
            src="/assets/brand-modal-icon.png"
            alt=""
          />
          <h3 className="font-semibold mb-1 mt-4 text-[#1D2433] text-lg">
            {title}
          </h3>
          <p className="text-[14px] text-[#647995]">{paragraph}</p>
          <span
            className="absolute top-8 cursor-pointer right-6"
            onClick={handleClose}
          >
            <X
              size={25}
              onClick={handleClose}
            />
          </span>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6"
        >
          <div className="input-group flex flex-col gap-1 mb-8">
            <label
              htmlFor="name"
              className="text-sm"
            >
              Add brand Name <sup className="text-red-600">*</sup>
            </label>
            <input
              className={`border border-[#98A2B3] min-h-[50px] ${
                errors.brandName
                  ? "border-red-600 focus:border-red-600"
                  : "focus:border-primary600"
              } outline-none rounded px-4`}
              {...register("brandName", { required: true })}
            />
            {errors.brandName && (
              <span className="text-sm text-red-600">
                Name field is required
              </span>
            )}
          </div>

          <ImageUploader onFileChange={handleFileChange} />

          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className="flex w-full rounded mt-4 items-center justify-center min-h-[50px] disabled:bg-primary100 disabled:text-[#98A2B3] bg-primary600 text-white disabled:cursor-not-allowed cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrandModal;
