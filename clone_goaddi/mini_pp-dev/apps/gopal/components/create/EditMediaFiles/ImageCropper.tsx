"use client";

import React, { useEffect, useState, useCallback, Dispatch, SetStateAction, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
// import Image from "next/image";
import Modal from "../../goui/modal";
import { Separator } from "../../ui/separator";
import { Gallery } from "@/assets/icons";
import GoButton from "../../goui/button";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "../../ui/card";
import Cropper from "react-easy-crop";
import Button from "../../goui/button";
import getCroppedImg from "../get-cropped-imgurl";
import { AspectRatioControl, Previews, ZoomControlDropDown } from "../aspect-ratio-dropdown";
import { CaretRight } from "@phosphor-icons/react/dist/icons/CaretRight";
import { useCreatePostStore } from "@/store/useCreatePostStore";
import { MediaFilesSchema } from "@/store/useCreatePostStore";
import PreviewSelectedFiles from "./preview";
import Image from "next/image";
import { toast } from "sonner";
import { Check } from "@phosphor-icons/react";

const ImageCropper = ({ openCropper, selectedFiles, currentImage, setOpenCropper }: any) => {
	const router = useRouter();
	const pathName = usePathname();
	const [onTag, setOnTag] = useState(false);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [aspectRatio, setAspectRatio] = useState(1 / 1);
	const {
		selectedMediaFiles,
		setSelectedMediaFiles,
		updateSelectedMediaFiles,
		defaultRatio,
		setDefaultRatio,
		croppedAreaPixels,
		setCroppedAreaPixels,
	} = useCreatePostStore((state) => ({
		...state,
	}));

	async function handleApplyCrop(file, _croppedAreaPixels) {
		const croppedImage = (await getCroppedImg(file.preview, _croppedAreaPixels)) as MediaFilesSchema;

		const updatedArray = selectedMediaFiles.map((item) => {
			if (item == file) {
				return {
					...item,
					...croppedImage,
				};
			}
			return item;
		});

		setSelectedMediaFiles(updatedArray);
		setOpenCropper(false);
	}

	function onCropComplete(_croppedArea: any, _croppedAreaPixels: any) {
		setCroppedAreaPixels(_croppedAreaPixels);
	}

	function onAspectRatioSelect(value: any) {
		if (value) {
			const parts = value.split("/");
			const numerator = parseInt(parts[0], 10);
			const denominator = parseInt(parts[1], 10);

			const aspectRatio = numerator / denominator;
			setDefaultRatio(aspectRatio);
			// Use the aspectRatio as needed (e.g., set element style)
		}
		// console.log(value);
	}

	return (
		<div className="p-1 bg-white h-[450px] relative">
			<Cropper
				image={currentImage.preview}
				crop={crop}
				zoom={zoom}
				aspect={defaultRatio || 4 / 5}
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
				<div className=" p-2 w-[190px] flex items-center justify-between rounded-xl bg-white/30 shadow  ">
					<AspectRatioControl setRatio={onAspectRatioSelect} disabled={false} />
					<ZoomControlDropDown onZoomChange={(e) => setZoom(Number(e.target.value))} />
					{/* <Previews selectedFiles={selectedFiles} onFileClick={handleFileClick} /> */}
				</div>
				<button
					onClick={() => handleApplyCrop(currentImage, croppedAreaPixels)}
					className=" p-2  flex items-center justify-center rounded-full  bg-white/30 shadow  right-10"
				>
					<Check size={20} className=" text-neutral-200" />
				</button>
			</div>
		</div>
	);
};

export default ImageCropper;

// interface IImageEditor {
// 	setOpenEditor: React.Dispatch<React.SetStateAction<boolean>>;
// 	openEditor: boolean;
// 	selectedFiles: IPostImage[];
// 	setSelectedFiles: React.Dispatch<React.SetStateAction<IPostImage[]>>;
// 	setProcessedFiles: React.Dispatch<React.SetStateAction<IPostImage[]>>;
// 	aspectRatio: number;
// 	setAspectRatio: any;
// }

// export const ImageEditor = ({
// 	selectedFiles,
// 	setSelectedFiles,
// 	setProcessedFiles,
// 	openEditor,
// 	setOpenEditor,
// 	aspectRatio,
// 	setAspectRatio,
// }: IImageEditor) => {
// 	// const img = selectedFiles[0]?.preview;
// 	const [crop, setCrop] = useState({ x: 0, y: 0 });
// const [zoom, setZoom] = useState(1);
// // const [aspectRatio, setAspectRatio] = useState(1/1);
// const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
// 	const [isCropping, setIsCropping] = useState(false);
// 	const [index, setIndex] = useState<number>(1);
// 	// const [currentImage, setCurrentImage] = useState<string>(selectedFiles[0].preview);
// 	const [currentImage, setCurrentImage] = useState<IPostImage>(selectedFiles[0]);

// 	function handleCancle() {
// 		//   onClose();
// 	}

// const onCropComplete = (_croppedArea: any, _croppedAreaPixels: any) => {
// 	setCroppedAreaPixels(_croppedAreaPixels);
// };

// 	async function handleDone() {
// 		try {
// 			setProcessedFiles((prev) => [...prev, ...selectedFiles]);
// 			setSelectedFiles([]);
// 		} catch (e) {}
// 	}

// 	// edit single image from the array

// function onAspectRatioSelect(value: any) {
// 	if (value) {
// 		const parts = value.split("/");
// 		const numerator = parseInt(parts[0], 10);
// 		const denominator = parseInt(parts[1], 10);

// 		const aspectRatio = numerator / denominator;

// 		setAspectRatio(aspectRatio);
// 		// Use the aspectRatio as needed (e.g., set element style)
// 	}
// 	// console.log(value);
// }

// 	function handleNext() {
// 		setIndex((prev) => (prev += 1));
// 	}

// 	function handleFileClick(file: IPostImage) {
// 		setCurrentImage(file);
// 	}

// 	return (
// 		<Dialog open={openEditor} onOpenChange={setOpenEditor}>
// 			<DialogContent noCloseBtn className="md:max-w-[650px] p-0 bg-white border-none relative">
// 				<div className={cn("image_frame relative w-full h-full")}>
// 					<PreviewSelectedFiles />
// 				</div>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };
