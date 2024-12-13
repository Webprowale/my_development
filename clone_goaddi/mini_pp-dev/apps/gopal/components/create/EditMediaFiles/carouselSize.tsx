"use client";
import React, { useState, useCallback, Dispatch, SetStateAction, useRef, Suspense } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/create-carousel";
import { CaretCircleLeft, CaretCircleRight, MinusSquare, Trash, XCircle } from "@phosphor-icons/react";
import { MediaFilesSchema, useCreatePostStore } from "@/store/useCreatePostStore";

export function CarouselSize({
	setExistingImages,
	diary,
	coverImageIndex, // Include coverImage prop
	setCoverImage,
	setCoverImageIndex, // Include setCoverImage prop
}: {
	setExistingImages?: Dispatch<any>;
	coverImageIndex?: number;
	setCoverImage?: React.Dispatch<React.SetStateAction<File[]>>; // Make setCoverImage optional
	diary?: boolean;

	setCoverImageIndex?: Dispatch<SetStateAction<number>>;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [currentSelectedImage, setCurrentSelectedImage] = useState<any>([]);
	const [croppedImage, setCroppedImage] = useState("");
	const { processedMediaFiles, setSelectedMediaFiles, setProcessedMediaFiles } = useCreatePostStore((state) => ({
		...state,
	}));

	const removeImage = (indexToRemove: number) => {
		setProcessedMediaFiles(processedMediaFiles.filter((_, index) => index !== indexToRemove));
		if (setExistingImages) {
			return setExistingImages((prevPreviews: any) =>
				prevPreviews.filter((_: any, index: any) => index !== indexToRemove)
			);
		}
	};

	const switchImages = (indexA: number, indexB: number) => {
		// const newFilePreviews = [...filePreviews];
		const newProcessedMediaFiles = [...processedMediaFiles];
		[newProcessedMediaFiles[indexA], newProcessedMediaFiles[indexB]] = [
			newProcessedMediaFiles[indexB],
			newProcessedMediaFiles[indexA],
		];
		// setFilePreviews(newFilePreviews);
		setProcessedMediaFiles(newProcessedMediaFiles);
	};

	const handleEditImage = (selectedImage: File) => {
		setIsEditing(true);
		setCurrentSelectedImage(selectedImage);
	};

	const onEditDone = (processedImage?: File | string) => {
		setCroppedImage(processedImage as string);
		console.log(processedImage);

		setIsEditing(false);
		// setCurrentSelectedImage(selectedImage)
	};

	return (
		<Carousel
			opts={{
				align: "center",
			}}
			className="w-full h-full relative max-w-md mx-auto"
		>
			<CarouselContent className="w-full">
				{processedMediaFiles.map((file: MediaFilesSchema, index: number) => {
					const { preview, type } = file;
					const isVideo = type?.startsWith("video/");

					return (
						<CarouselItem
							key={index}
							className={` md:basis-auto ${processedMediaFiles.length === 2 && "lg:basis-1/2"} ${
								processedMediaFiles.length >= 3 && "lg:basis-1/3"
							} relative`}
						>
							<div className="relative w-auto h-40 group">
								{isVideo ? (
									<video controls className="object-cover rounded-sm">
										<source src={preview} type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								) : (
									<img src={preview} alt="nsin" className="object-cover rounded-xl h-full w-full" />
								)}
								<div className="absolute group-hover:visible invisible rounded-xl w-full h-full bg-black/30 top-0 left-0  inset-0 z-10 transition-all centered ">
									<button onClick={() => removeImage(index)} className="absolute top-1 right-1">
										<XCircle size={23} weight="fill" className="text-white" />
									</button>

									{index > 0 && (
										<button onClick={() => switchImages(index, index - 1)} className="absolute bottom-1 left-1">
											<CaretCircleLeft size={23} weight="fill" className="text-white " />
										</button>
									)}

									{index < processedMediaFiles.length - 1 && (
										<button onClick={() => switchImages(index, index + 1)} className="absolute bottom-1 right-1">
											<CaretCircleRight size={23} weight="fill" className="text-white" />
										</button>
									)}
								</div>

								{diary && setCoverImageIndex && (
									<button
										onClick={() => {
											setCoverImageIndex(index);
										}}
										className="z-50 absolute top-1 left-1 p-1 gap-[4px] rounded text-white bg-[#FFFFFF33] text-[8px] font-bold  backdrop-blur-md flex justify-start items-center"
									>
										<span
											className={`w-[12px] h-[12px] rounded-full border-1 border-[#344054] ${
												coverImageIndex === index ? "bg-[#0D6EFD] " : "bg-white"
											} flex justify-center items-center relative`}
										>
											<p className="text-white text-[40px] pb-[1.65rem] ">.</p>
											{/* <Dot size={18} color="#FFFFFF" /> */}
										</span>
										Select as cover
									</button>
								)}

								{/* <EditImageModal
									onEditDone={onEditDone}
									open={isEditing}
									onOpenChange={setIsEditing}
									onClose={onEditDone}
									imageFile={currentSelectedImage}
								/> */}
							</div>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			{/* <div className="absolute -bottom-4 flex gap-3 items-center left-1/2 -translate-x-1/2"> */}
			<CarouselPrevious className="text-primary600 bg-primary100" />
			<CarouselNext className="text-primary600 bg-primary100" />
			{/* </div> */}
		</Carousel>
	);
}

// interface IEditImageModal
// {
//   imageFile?: File,
//   open: boolean,
//   onClose: () => void
// }
// function EditImageModal({ imageFile, open, onClose }: IEditImageModal)
// {
//   const [onTag, setOnTag] = useState(false);
//   const [_, setOpen] = useState(true);

//   // const onClose = () =>
//   // {
//   //   // setOpen(false);
//   //   // router.push("/gopal");
//   // };

//   return (
//     <Modal isOpen={open} onClose={onClose} left={true} trigger={<p></p>}>
//       <div className="bg-text max-w-[500px] w-full h-[400px]">
//         <Flex between className="bg-primary">
//           <ArrowLeft size={32} color="#321c9b" />

//           <Paragraph>Crop</Paragraph>

//           <Paragraph>Done</Paragraph>
//         </Flex>

//         <div className="image_box overflow-hidden w-full h-full relative">
//           <Image
//             src={imageFile}
//             alt="nsin"
//             className="object-cover rounded-xl h-full w-full"
//             fill
//           />
//         </div>

//       </div>
//     </Modal>
//   )
// }
