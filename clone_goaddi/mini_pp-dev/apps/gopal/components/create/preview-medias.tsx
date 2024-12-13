"use client";
import React, { useEffect, useState, useCallback, Dispatch, SetStateAction, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Modal from "../goui/modal";
import { Separator } from "../ui/separator";
import { Gallery } from "@/assets/icons";
import GoButton from "../goui/button";
import { useDropzone } from "react-dropzone";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/create-carousel";
import UploadForm from "./form";
import CreateAvatar from "./avatar";
import {
	ArrowsInSimple,
	ArrowsOutSimple,
	CaretCircleLeft,
	CaretCircleRight,
	CaretRight,
	ImageSquare,
	MapPin,
	MinusSquare,
	MusicNotes,
	Smiley,
	Trash,
	UserPlus,
	XCircle,
} from "@phosphor-icons/react";
import Tag from "./tag";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowLeft, Dot, Pen } from "@phosphor-icons/react/dist/ssr";
import { Flex } from "../ui/flex";
import Paragraph from "../ui/typography/paragraph";
import EditImageModal from "./edit-image-modal";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { IPostImage } from "./add-media-to-post";
import Cropper from "react-easy-crop";
import { AspectRatioControl, Previews, ZoomControlDropDown } from "./aspect-ratio-dropdown";
import getCroppedImg from "./get-cropped-imgurl";
// import { Resize } from "@phosphor-icons/react";
import { IoResize } from "react-icons/io5";
import { CarouselSize } from "./EditMediaFiles/carouselSize";
import { createPostStepEnum, useCreatePostStore } from "@/store/useCreatePostStore";

const PreviewMedias = ({ processedFiles, setProcessedFiles, defaultAspectRatio }: any) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { processedMediaFiles, setCreatePostStep,setProcessedMediaFiles, selectedMediaFiles,setSelectedMediaFiles } = useCreatePostStore((state) => ({
		...state,
	}));

	function handleAddMedia(){
		setProcessedMediaFiles([])
    setSelectedMediaFiles(processedMediaFiles)
//     handleCloseEditorForce()
	}

	// Add Media to Files
	const addMediaFiles = () => {
		setProcessedFiles([]);
		console.log("Click outside Media", fileInputRef);
		if (fileInputRef.current) {
			console.log("Clicked inside Media");
			fileInputRef.current.click();
		}
	};

	const handleAddMusic = () => {
		setCreatePostStep(createPostStepEnum.addMusic)
	
	};


	return (
		<div className="flex flex-col gap-y-10 ">
			<CarouselSize
				diary={false}
			/>

			<div className="flex gap-4 justify-center bg-neutral200 rounded-md p-1 px-3 items-center">
				<button onClick={handleAddMedia} className="flex items-center gap-2 hover:opacity-95">
					<ImageSquare size={20} className="text-neutral-900" />
					<p className="text-sm">Add media</p>
				</button>

				<button className="flex items-center gap-2 hover:opacity-95">
					<ArrowsOutSimple size={20} className="text-neutral-900" />
					<p className="text-sm">Resize Media</p>
				</button>

				<button onClick={handleAddMusic}  className="flex items-center gap-2 hover:opacity-95">
					<MusicNotes size={20} className="text-neutral-900" />
					<p className="text-sm">Add music</p>
				</button>

				<Separator orientation="vertical" className="h-full shrink-0 " />

				<Flex className="w-fit">
					<button className="w-12 h-12 flex items-center justify-center hover:opacity-95">
						<MapPin size={20} className="text-neutral-900" />
					</button>
					<button className="w-12 h-12 flex items-center justify-center hover:opacity-95">
						<UserPlus size={20} className="text-neutral-900" />
					</button>
				</Flex>
			</div>
		</div>
	);
};

export default PreviewMedias;

// export function CarouselSize({
// 	setExistingImages,
// 	processedFiles,
// 	setProcessedFiles,
// 	defaultAspectRatio,
// }: {
// 	setExistingImages?: Dispatch<any>;
// 	coverImageIndex?: number;
// 	setCoverImage?: React.Dispatch<React.SetStateAction<File[]>>; // Make setCoverImage optional
// 	diary?: boolean;
// 	processedFiles: any;
// 	setProcessedFiles: Dispatch<SetStateAction<string[]>>;
// 	setCoverImageIndex?: Dispatch<SetStateAction<number>>;
// 	defaultAspectRatio: number;
// }) {
// 	const [currentSelectedImage, setCurrentSelectedImage] = useState<IPostImage | undefined>();
// 	const [openEditor, setOpenEditor] = useState(false);

// 	const removeImage = (indexToRemove: number) => {
// 		setProcessedFiles((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
// 		if (setExistingImages) {
// 			return setExistingImages((prevPreviews: any) =>
// 				prevPreviews.filter((_: any, index: any) => index !== indexToRemove)
// 			);
// 		}
// 	};

// 	const switchImages = (indexA: number, indexB: number) => {
// 		const newFilePreviews = [...processedFiles];
// 		[newFilePreviews[indexA], newFilePreviews[indexB]] = [newFilePreviews[indexB], newFilePreviews[indexA]];
// 		setProcessedFiles(newFilePreviews);
// 	};

// 	const handleEditImage = (selectedImage: IPostImage) => {
// 		setCurrentSelectedImage(selectedImage);
// 		setOpenEditor(true);
// 	};

// 	const handleCloseEditor = () => {
// 		setCurrentSelectedImage(undefined);
// 		setOpenEditor(false);
// 	};

// 	return (
// 		<Carousel
// 			opts={{
// 				align: "center",
// 			}}
// 			className="w-full h-full relative max-w-md mx-auto"
// 		>
// 			<CarouselContent className="w-full">
// 				{processedFiles.map((file: any, index: number) => {
// 					const { preview, type } = file;
// 					const isVideo = type?.startsWith("video/");

// 					return (
// 						<CarouselItem
// 							key={index}
// 							className={` md:basis-full ${processedFiles.length === 2 && "lg:basis-1/2"} ${
// 								processedFiles.length >= 3 && "lg:basis-1/3"
// 							} relative`}
// 						>
// 							<div className="relative w-auto h-40 group">
// 								{isVideo ? (
// 									<video controls className="object-cover rounded-sm">
// 										<source src={preview} type="video/mp4" />
// 										Your browser does not support the video tag.
// 									</video>
// 								) : (
// 									<img src={preview} alt="image" className="object-cover rounded-xl h-full w-full" />
// 								)}
// 								<div className="absolute group-hover:visible invisible rounded-xl w-full h-full bg-black/30 top-0 left-0  inset-0 z-10 transition-all centered ">
// 									<Flex gap={1} className="absolute top-0 left-0 w-full p-2">
// 										{/* <IoResize
//                       role="button"
//                       onClick={() => handleEditImage(file)}
//                       size={20}
//                       className="text-white"
//                     /> */}
// 										<Trash role="button" onClick={() => removeImage(index)} size={20} className="text-white" />
// 									</Flex>

// 									{index > 0 && (
// 										<button onClick={() => switchImages(index, index - 1)} className="absolute bottom-1 left-1">
// 											<CaretCircleLeft size={23} weight="fill" className="text-white " />
// 										</button>
// 									)}

// 									{index < processedFiles.length - 1 && (
// 										<button onClick={() => switchImages(index, index + 1)} className="absolute bottom-1 right-1">
// 											<CaretCircleRight size={23} weight="fill" className="text-white" />
// 										</button>
// 									)}
// 								</div>

// 								{/* <ImageEditor
//                   openEditor={openEditor}
//                   setOpenEditor={setOpenEditor}
//                   selectedFile={currentSelectedImage}
//                   onBackClick={handleCloseEditor}
//                   processedFiles={processedFiles}
//                   setProcessedFiles={setProcessedFiles}
//                   defaultAspectRatio={defaultAspectRatio}
//                 /> */}
// 							</div>
// 						</CarouselItem>
// 					);
// 				})}
// 			</CarouselContent>
// 			{/* <div className="absolute -bottom-4 flex gap-3 items-center left-1/2 -translate-x-1/2"> */}
// 			<CarouselPrevious className="text-primary600 bg-primary100" />
// 			<CarouselNext className="text-primary600 bg-primary100" />
// 			{/* </div> */}
// 		</Carousel>
// 	);
// }

// export const ImageEditor = ({
//   selectedFile,
//   setProcessedFiles,
//   openEditor,
//   setOpenEditor,
//   defaultAspectRatio,
//   processedFiles,
//   onBackClick,
// }: any) => {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [aspectRatio, setAspectRatio] = useState(defaultAspectRatio);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   function handleCancel() {
//     onBackClick();
//   }

//   const onCropComplete = (_croppedArea: any, _croppedAreaPixels: any) => {
//     setCroppedAreaPixels(_croppedAreaPixels);
//   };

//   function onAspectRatioSelect() {
//     return;
//   }

//   async function handleApply(croppedAreaPixels: any) {
//     // setIsCropping(true);
//     try {
//       const preview = await getCroppedImg(
//         selectedFile.preview,
//         croppedAreaPixels,
//       );

//       const croppedImage = {
//         ...selectedFile,
//         preview: preview,
//       };

//       const newProcessedFiles = processedFiles.map((item) => {
//         if (item.preview === selectedFile.preview) {
//           return croppedImage;
//         }
//         return item;
//       });

//       setProcessedFiles(newProcessedFiles);
//       setOpenEditor(false);
//       // setIsCropping(false);
//     } catch (e) {
//       console.error("Error occurred during processing:", e);
//     }
//   }

//   return (
//     <Dialog open={openEditor} onOpenChange={setOpenEditor}>
//       <DialogContent
//         noCloseBtn
//         className="md:max-w-[650px] p-0 bg-transparent border-none"
//       >
//         {selectedFile && (
//           <div className="p-1 bg-primary/60 h-[600px] relative">
//             <Cropper
//               image={selectedFile.preview}
//               crop={crop}
//               zoom={zoom}
//               aspect={aspectRatio}
//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}
//               style={{
//                 containerStyle: {
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: "6px",
//                 },
//               }}
//             />

            // <div className=" bottom-4 absolute gap-3 flex justify-between items-center left-1/2 -translate-x-1/2 w-[30%]">
            //   <button
            //     onClick={handleCancel}
            //     className=" p-2 rotate-180  flex items-center justify-center rounded-full  bg-white/30 shadow  right-10"
            //   >
            //     <CaretRight size={20} className=" text-neutral-200" />
            //   </button>

            //   <div className="p-2 w-[190px] flex items-center justify-between rounded-xl bg-white/30 shadow  ">
            //     <AspectRatioControl setRatio={onAspectRatioSelect} disabled />
            //     <ZoomControlDropDown
            //       onZoomChange={(e) => setZoom(Number(e.target.value))}
            //     />
            //     {/* <Previews selectedFiles={selectedFiles} onFileClick={handleFileClick} /> */}
            //   </div>
            //   <button
            //     onClick={() => handleApply(croppedAreaPixels)}
            //     className=" p-2  flex items-center justify-center rounded-full  bg-white/30 shadow  right-10"
            //   >
            //     <CaretRight size={20} className=" text-neutral-200" />
            //   </button>
            // </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };
