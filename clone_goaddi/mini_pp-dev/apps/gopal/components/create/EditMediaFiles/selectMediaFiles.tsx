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
import getCroppedImg from "../get-cropped-imgurl";
import { AspectRatioControl, Previews, ZoomControlDropDown } from "../aspect-ratio-dropdown";
import { CaretRight } from "@phosphor-icons/react/dist/icons/CaretRight";
import { useCreatePostStore } from "@/store/useCreatePostStore";
import { MediaFilesSchema } from "@/store/useCreatePostStore";
import PreviewSelectedFiles from "./preview";
import Image from "next/image";
import { toast } from "sonner";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowsOutSimple, CaretLeft } from "@phosphor-icons/react";
import { useCarousel } from "@/components/ui/carousel";
import { Flex } from "@/components/ui/flex";
import ImageCropper from "./ImageCropper";
import { Button } from "@/components/ui/button";

interface IAddMediaToPostProps {
	// selectedFiles?: File[];
	aspectRatio: number;
	setAspectRatio: any;
	openEditor: boolean;
	setOpenEditor: any;
	selectedFiles: any;
	// setSelectedFiles: any;
}

const SelectMediaFiles = ({
	openEditor,
	selectedFiles,
	// setSelectedFiles,
	setOpenEditor,
}: IAddMediaToPostProps) => {
	const router = useRouter();
	const pathName = usePathname();
	const [onTag, setOnTag] = useState(false);
	// const [selectedFiles, setSelectedFiles] = useState<any>([]);
	const {
		selectedMediaFiles,
		setSelectedMediaFiles,
		croppedAreaPixels,
		setProcessedMediaFiles,
		setOpenCreatePostModal,
	} = useCreatePostStore((state) => ({
		...state,
	}));
	const [edit, setEdit] = useState(true);
	const [isDone, setIsDone] = useState(false);
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: !true }));

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
			const newPreviews: MediaFilesSchema[] = validFiles.map((file) => ({
				preview: URL.createObjectURL(file),
				type: file.type,
				file: file,
				dimension: "",
				edited: false,
				originalFile: file,
			}));

			setSelectedMediaFiles(newPreviews);
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

	function handleCloseEditor(open) {
		if (selectedMediaFiles.length > 0) return toast.info("you have unsaved files");
		setOpenEditor(open);
	}

	function handleCloseEditorForce() {
		if (selectedMediaFiles.length > 0) {
			setSelectedMediaFiles([]);
		}
		setOpenEditor(false);
	}

	async function handleDoneEditing() {
		const notEdited = selectedMediaFiles.filter((item) => item.edited == false);
		if (notEdited.length > 0) {
			const promises = notEdited.map(async (file, idx) => {
				const croppedImage = (await getCroppedImg(file.preview, croppedAreaPixels)) as MediaFilesSchema;
				return {
					...file,
					...croppedImage,
				};
			});

			const defaultCroppedFiles = await Promise.all(promises)

			console.log(defaultCroppedFiles, "default crop!");

			const editedFiles = selectedMediaFiles.filter((item) => item.edited == true);

			setProcessedMediaFiles([...editedFiles, ...defaultCroppedFiles]);
			setOpenCreatePostModal(true);
			setSelectedMediaFiles([]);
			return handleCloseEditorForce();
		}

		setProcessedMediaFiles(selectedMediaFiles);
		setOpenCreatePostModal(true);
		setSelectedMediaFiles([]);

		handleCloseEditorForce();
	}

	function handleEdit() {
		setEdit(!edit);
	}

	// function handleNextImage(canScrollNext, scrollNext) {
	// 	if (canScrollNext) return scrollNext();

	// 	setIsDone(true);
	// }

	useEffect(() => {
		if (!api) {
			return;
		}
		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<Suspense>
			<div className="add_media-section w-full flex items-center gap-5 justify-around p-4 h-auto">
				{/* create normal post */}
				<div
					{...getRootProps()}
					className={cn(
						"flex hover:bg-primary100 rounded justify-center items-center flex-col  p-4 cursor-pointer w-[235px]",
						isDragActive ? "bg-gray-50 border-2  border-dashed border-gray-100" : ""
					)}
				>
					<img src={"/assets/create/image.svg"} alt="upload icon" className="w-[49px] h-[52px]" />

					<p className="pt-3 pb-2 font-medium md:text-sm text-xs">Create a post</p>
					<p className="text-text-secondary text-xs text-center w-[90%]">
						Share your thoughts, and updates with your audience
					</p>
					<input {...getInputProps()} ref={fileInputRef} />
				</div>

				{/* create FLICKS post */}
				{/* <div className={cn("flex justify-center items-center flex-col  p-4 cursor-pointer w-[235px]")}>
					<img src={"/assets/create/flicks-icon.svg"} alt="upload icon" className="w-[49px] h-[52px]" />

					<p className="pt-3 pb-2 font-medium md:text-sm text-xs">Flicks</p>
					<p className="text-text-secondary text-xs text-center w-[90%]">
						Short videos up to 1 minute long. Capture moments and share them
					</p>
				</div> */}

				{/* create POLLS post */}

				<div className={cn("flex justify-center items-center flex-col  p-4 cursor-pointer w-[235px]")}>
					<img src={"/assets/create/poll-icon.svg"} alt="upload icon" className="w-[49px] h-[52px]" />

					<p className="pt-3 pb-2 font-medium md:text-sm text-xs">Polls</p>
					<p className="text-text-secondary text-xs text-center w-[90%]">Engage with your audience by creating polls</p>
				</div>
			</div>

			<Dialog open={openEditor} onOpenChange={handleCloseEditor}>
				<DialogContent noCloseBtn className="max-h-[600px] md:max-w-[550px] p-0">
					<Carousel
						opts={{
							align: "center",
						}}
						setApi={setApi}
						className="preview_and_edit h-full w-full bg-white"
					>
						<ActionBar handleCloseEditorForce={handleCloseEditorForce} handleDoneEditing={handleDoneEditing} />

						<CarouselContent className="h-[80%]">
							{selectedMediaFiles.map((file: MediaFilesSchema, index: number) => (
								<FileCarouselItem file={file} key={index} edit={edit} setEdit={setEdit} />
							))}
						</CarouselContent>

						<PreviewControls handleEdit={handleEdit} count={count} current={current} />
					</Carousel>
				</DialogContent>
			</Dialog>
		</Suspense>
	);
};

export default SelectMediaFiles;

function FileCarouselItem({ file, edit, setEdit, ...props }: any) {
	return (
		<CarouselItem {...props} className={``}>
			{!edit ? (
				<div className="group relative p-2 flex flex-col">
					<div
						style={{
							backgroundImage: `url(${file.preview})`,
							backgroundSize: "contain",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
						}}
						className="image_frame h-[420px]"
					></div>

					<div className="absolute top-4 p-2 left-4">
						<ArrowsOutSimple role="button" size={20} className="text-white" />
					</div>
				</div>
			) : (
				<ImageCropper currentImage={file} setOpenCropper={setEdit} />
			)}
		</CarouselItem>
	);
}

export function PreviewControls({ handleEdit, count, current }: any) {
	const { canScrollPrev, canScrollNext, scrollNext, scrollPrev } = useCarousel();

	// useEffect(() => {}, []);

	return (
		<div className="flex w-fit border gap-2 justify-center  mx-auto bg-white rounded-md p-1 px-3 items-center">
			<button onClick={handleEdit} className="flex items-center gap-2 hover:opacity-95">
				<ArrowsOutSimple size={20} className="text-neutral-900" />
				<p className="text-sm">Resize Media</p>
			</button>

			<Separator orientation="vertical" className="h-full shrink-0 w-1" />

			<button
				disabled={!canScrollPrev}
				onClick={scrollPrev}
				className="w-12 h-12 flex items-center justify-center hover:opacity-95"
			>
				<CaretLeft size={20} className="text-neutral-400" />
			</button>
			<p className="text-neutral-700">{current + "/" + count}</p>
			<button
				disabled={!canScrollNext}
				onClick={scrollNext}
				className="w-12 h-12 flex items-center justify-center hover:opacity-95"
			>
				<CaretRight size={20} className="text-neutral-400" />
			</button>
		</div>
	);
}

export function ActionBar({ handleCloseEditorForce, handleDoneEditing }: any) {
	const { canScrollNext, scrollNext } = useCarousel();

	// useEffect(() => {}, []);

	return (
		<Flex between className="w-full items-center border-b p-3">
			<h1 className="text-black font-bold text-xl">Resize Media</h1>

			<Flex gap={2}>
				<Button onClick={handleCloseEditorForce} variant="secondary">
					Cancel
				</Button>
				{canScrollNext ? (
					<Button onClick={scrollNext}>Next</Button>
				) : (
					<Button onClick={handleDoneEditing}>Continue</Button>
				)}
			</Flex>
		</Flex>
	);
}
export interface IPostImage {
	preview: string;
	type: Blob | string;
	file?: File;
}

{
	/* <Flex gap={2}>
								<button onClick={handleCloseEditorForce} className="text-white p-2 hove:bg-white/50">
									Cancel
								</button>
								<button onClick={handleDoneEditing} className="text-white p-2 hove:bg-white/50">
									Next
								</button>
							</Flex> */
}

// old component to select files
{
	/* <div
					{...getRootProps()}
					className={cn(
						"flex justify-center items-center flex-col py-8 cursor-pointer",
						false ? "hidden" : "",
						isDragActive ? "bg-gray-50 border-2  border-dashed border-gray-100" : ""
					)}
				>
					<img src={"/assets/create/image.svg"} alt="upload icon" className="w-[49px] h-[52px]" />
					{isDragActive ? (
						<p className="pt-3 pb-2 font-medium md:text-sm text-xs">Drop the media files here</p>
					) : (
						<p className="pt-3 pb-2 font-medium md:text-sm text-xs">
							Drag and drop your media file here or <span className="text-primary600 cursor-pointer">click here</span>
						</p>
					)}
					<input {...getInputProps()} ref={fileInputRef} />
				</div> */
}

// old image editor

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
// 	const [zoom, setZoom] = useState(1);
// 	// const [aspectRatio, setAspectRatio] = useState(1/1);
// 	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
// 	const [isCropping, setIsCropping] = useState(false);
// 	const [index, setIndex] = useState<number>(1);
// 	// const [currentImage, setCurrentImage] = useState<string>(selectedFiles[0].preview);
// 	const [currentImage, setCurrentImage] = useState<IPostImage>(selectedFiles[0]);

// 	function handleCancle() {
// 		//   onClose();
// 	}

// 	const onCropComplete = (_croppedArea: any, _croppedAreaPixels: any) => {
// 		setCroppedAreaPixels(_croppedAreaPixels);
// 	};

// 	async function handleDone() {
// 		try {
// 			setProcessedFiles((prev) => [...prev, ...selectedFiles]);
// 			setSelectedFiles([]);
// 		} catch (e) {}
// 	}

// 	// edit single image from the array
// 	async function handleApply(imageString: string, croppedAreaPixels: any) {
// 		setIsCropping(true);

// 		try {
// 			const processedFiles: any[] = [];

// 			// for (const file of selectedFiles) {
// 			//   let preview: string;

// 			//   if (file.preview === imageString) {
// 			//     preview = (await getCroppedImg(
// 			//       file.preview,
// 			//       croppedAreaPixels,
// 			//     )) as string;
// 			//   } else {
// 			//     preview = file.preview;
// 			//   }

// 			//   processedFiles.push({
// 			//     preview,
// 			//     type: file.type as string,
// 			//   });
// 			// }

// 			//Get the image from the selected files
// 			const currentImage = selectedFiles.find((item) => item.preview === imageString);

// 			const cropCurrentImage = (await getCroppedImg(currentImage.preview, croppedAreaPixels)) as Promise<IPostImage>;

// 			// console.log(cropCurrentImage, "this file is ready for upload");

// 			const croppedImage = {
// 				...currentImage,
// 				...cropCurrentImage,
// 			};

// 			setProcessedFiles((prev) => [...prev, croppedImage]);
// 			setSelectedFiles([]);

// 			setIsCropping(false);
// 		} catch (e) {
// 			console.error("Error occurred during processing:", e);
// 		}
// 	}

// 	function onAspectRatioSelect(value: any) {
// 		if (value) {
// 			const parts = value.split("/");
// 			const numerator = parseInt(parts[0], 10);
// 			const denominator = parseInt(parts[1], 10);

// 			const aspectRatio = numerator / denominator;

// 			setAspectRatio(aspectRatio);
// 			// Use the aspectRatio as needed (e.g., set element style)
// 		}
// 		// console.log(value);
// 	}

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

{
	/* <div className="p-1 bg-primary/60 h-[600px] relative">
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
					</div> */
}
