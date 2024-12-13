"use client";

import React, { useEffect, useState, useCallback, Dispatch, SetStateAction, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
// import Image from "next/image";
import Modal from "../goui/modal";
import { Separator } from "../ui/separator";
import { Gallery } from "@/assets/icons";
import GoButton from "../goui/button";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "../ui/card";
import Cropper from "react-easy-crop";
import Button from "../goui/button";
import getCroppedImg from "./get-cropped-imgurl";
import { AspectRatioControl, Previews, ZoomControlDropDown } from "./aspect-ratio-dropdown";
import { CaretRight } from "@phosphor-icons/react/dist/icons/CaretRight";

interface IAddMediaToPostProps {
	setProcessedFiles: React.Dispatch<React.SetStateAction<IPostImage[]>>;
	// selectedFiles?: File[];
	aspectRatio: number;
	setAspectRatio: any;
	openEditor: boolean;
	setOpenEditor: any;
	selectedFiles: any;
	setSelectedFiles: any;
}

const AddMediaToPost = ({
	setProcessedFiles,
	aspectRatio,
	setAspectRatio,
	openEditor,
	selectedFiles,
	setSelectedFiles,
	setOpenEditor,
}: IAddMediaToPostProps) => {
	const router = useRouter();
	const pathName = usePathname();
	const [onTag, setOnTag] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const onDrop = useCallback(
		async (files: File[]) => {
			const totalSize = files.reduce((acc, file) => acc + file.size, 0);
			const videoCount = files.filter((file) => file.type.startsWith("video")).length;

			// Check if the total number of files exceeds 10, or if the total size exceeds 15MB,
			// or if more than 1 video is uploaded, or if any file is not an image or video
			if (
				files.length + selectedFiles.length > 10 ||
				totalSize > 15 * 1024 * 1024 ||
				videoCount > 1 ||
				files.some((file) => !file.type.startsWith("image/") && !file.type.startsWith("video/"))
			) {
				alert("Please upload up to 9 images and 1 video with a total size not exceeding 15MB.");
				return;
			}

			// Filter out files that are neither images nor videos
			const validFiles = files.filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"));

			// Convert valid files to previews along with their types
			const newPreviews: { preview: string; type: string }[] = validFiles.map((file) => ({
				preview: URL.createObjectURL(file),
				type: file.type,
			}));

			// Update previews and media files state
			setSelectedFiles((prevPreviews: any) => [...prevPreviews, ...newPreviews]);
			// setMediaFiles((prevMediaFiles) => [...prevMediaFiles, ...validFiles]);
			setOpenEditor(true);
		},
		[selectedFiles]
	);

	const accept = {
		"image/*": [".jpg", ".jpeg", ".png", ".gif"],
		"video/*": [".mp4", ".mov", ".avi", ".mkv"],
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept,
		multiple: true,
	});

	return (
		<Suspense>
			<div className="add_media-section w-full  h-auto">
				<div
					{...getRootProps()}
					className={cn(
						"flex justify-center items-center flex-col py-8 cursor-pointer",
						false ? "hidden" : "",
						isDragActive ? "bg-gray-50 border-2  border-dashed border-gray-100" : ""
					)}
				>
					<div className="p-3 bg-primary100 w-fit rounded-[4px]">
						<Gallery className="w-6 h-6" />
					</div>
					{isDragActive ? (
						<p className="pt-3 pb-2 font-medium md:text-sm text-xs">Drop the media files here</p>
					) : (
						<p className="pt-3 pb-2 font-medium md:text-sm text-xs">
							Add media to post <span className="text-primary600 cursor-pointer">click here</span>
						</p>
					)}
					<input {...getInputProps()} ref={fileInputRef} />
				</div>
			</div>

			{selectedFiles.length > 0 && (
				<ImageEditor
					openEditor={openEditor}
					setOpenEditor={setOpenEditor}
					setProcessedFiles={setProcessedFiles}
					selectedFiles={selectedFiles}
					setSelectedFiles={setSelectedFiles}
					aspectRatio={aspectRatio}
					setAspectRatio={setAspectRatio}
				/>
			)}
		</Suspense>
	);
};

export default AddMediaToPost;

export interface IPostImage {
	preview: string;
	type: Blob | string;
	file?: File;
}
interface IImageEditor {
	setOpenEditor: React.Dispatch<React.SetStateAction<boolean>>;
	openEditor: boolean;
	selectedFiles: IPostImage[];
	setSelectedFiles: React.Dispatch<React.SetStateAction<IPostImage[]>>;
	setProcessedFiles: React.Dispatch<React.SetStateAction<IPostImage[]>>;
	aspectRatio: number;
	setAspectRatio: any;
}

export const ImageEditor = ({
	selectedFiles,
	setSelectedFiles,
	setProcessedFiles,
	openEditor,
	setOpenEditor,
	aspectRatio,
	setAspectRatio,
}: IImageEditor) => {
	// const img = selectedFiles[0]?.preview;
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	// const [aspectRatio, setAspectRatio] = useState(1/1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [isCropping, setIsCropping] = useState(false);
	const [index, setIndex] = useState<number>(1);
	// const [currentImage, setCurrentImage] = useState<string>(selectedFiles[0].preview);
	const [currentImage, setCurrentImage] = useState<IPostImage>(selectedFiles[0]);

	function handleCancle() {
		//   onClose();
	}

	const onCropComplete = (_croppedArea: any, _croppedAreaPixels: any) => {
		setCroppedAreaPixels(_croppedAreaPixels);
	};

	async function handleDone() {
		try {
			setProcessedFiles((prev) => [...prev, ...selectedFiles]);
			setSelectedFiles([]);
		} catch (e) {}
	}

	// edit single image from the array
	async function handleApply(imageString: string, croppedAreaPixels: any) {
		setIsCropping(true);

		try {
			const processedFiles: any[] = [];

			// for (const file of selectedFiles) {
			//   let preview: string;

			//   if (file.preview === imageString) {
			//     preview = (await getCroppedImg(
			//       file.preview,
			//       croppedAreaPixels,
			//     )) as string;
			//   } else {
			//     preview = file.preview;
			//   }

			//   processedFiles.push({
			//     preview,
			//     type: file.type as string,
			//   });
			// }

			//Get the image from the selected files
			const currentImage = selectedFiles.find((item) => item.preview === imageString);

			const cropCurrentImage = (await getCroppedImg(currentImage.preview, croppedAreaPixels)) as Promise<IPostImage>;

			// console.log(cropCurrentImage, "this file is ready for upload");

			const croppedImage = {
				...currentImage,
				...cropCurrentImage,
			};

			setProcessedFiles((prev) => [...prev, croppedImage]);
			setSelectedFiles([]);

			setIsCropping(false);
		} catch (e) {
			console.error("Error occurred during processing:", e);
		}
	}

	function onAspectRatioSelect(value: any) {
		if (value) {
			const parts = value.split("/");
			const numerator = parseInt(parts[0], 10);
			const denominator = parseInt(parts[1], 10);

			const aspectRatio = numerator / denominator;

			setAspectRatio(aspectRatio);
			// Use the aspectRatio as needed (e.g., set element style)
		}
		// console.log(value);
	}

	function handleNext() {
		setIndex((prev) => (prev += 1));
	}

	function handleFileClick(file: IPostImage) {
		setCurrentImage(file);
	}

	return (
		<Dialog open={openEditor} onOpenChange={setOpenEditor}>
			<DialogContent noCloseBtn className="md:max-w-[650px] p-0 bg-transparent border-none">
				{selectedFiles.length === 0 ? (
					<div className="w-full h-full centered">no file selected</div>
				) : (
					<div className="p-1 bg-primary/60 h-[600px] relative">
						<Cropper
							image={currentImage.preview}
							crop={crop}
							zoom={zoom}
							aspect={aspectRatio}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropComplete={onCropComplete}
							style={{
								containerStyle: {
									width: "100%",
									height: "100%",
									borderRadius: "6px",
								},
							}}
						/>

						<div className=" bottom-4 absolute gap-3 flex justify-between items-center left-1/2 -translate-x-1/2 w-[30%]">
							<button
								onClick={handleDone}
								className=" p-2 rotate-180  flex items-center justify-center rounded-full  bg-white/30 shadow  right-10"
							>
								<CaretRight size={20} className=" text-neutral-200" />
							</button>

							<div className=" p-2 w-[190px] flex items-center justify-between rounded-xl bg-white/30 shadow  ">
								<AspectRatioControl setRatio={onAspectRatioSelect} disabled={false} />
								<ZoomControlDropDown onZoomChange={(e) => setZoom(Number(e.target.value))} />
								<Previews selectedFiles={selectedFiles} onFileClick={handleFileClick} />
							</div>
							<button
								onClick={() => handleApply(currentImage.preview, croppedAreaPixels)}
								className=" p-2  flex items-center justify-center rounded-full  bg-white/30 shadow  right-10"
							>
								<CaretRight size={20} className=" text-neutral-200" />
							</button>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};
