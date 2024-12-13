"use client";
import React, { useState, useCallback, Dispatch, SetStateAction, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

import { Gallery } from "@/assets/icons";
import { useDropzone } from "react-dropzone";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/create-carousel";

import { CaretCircleLeft, CaretCircleRight, MinusSquare, Trash } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

import { MediaFilesSchema, createPostStepEnum, useCreatePostStore } from "@/store/useCreatePostStore";
import UploadForm from "../form";
import CreateAvatar from "../avatar";
import { Separator } from "@/components/ui/separator";
import PreviewMedias from "../preview-medias";
import { DialogContent } from "@/components/ui/dialog";

interface ICreatePostModal {}

const CreatingPost = ({setOpenEditor}: any) => {
	const router = useRouter();

	const [filePreviews, setFilePreviews] = useState<any>([]);
	const [mentions, setMentions] = useState<any>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { user } = useAuthStore((state) => ({ ...state })) as any;
	const { firstName, lastName } = user;
	const { updateSelectedMediaFiles, setCreatePostStep, processedMediaFiles } = useCreatePostStore((state) => ({
		...state,
	}));

	const onDrop = useCallback(
		async (files: File[]) => {
			const totalSize = files.reduce((acc, file) => acc + file.size, 0);
			const videoCount = files.filter((file) => file.type.startsWith("video")).length;

			// Check if the total number of files exceeds 10, or if the total size exceeds 15MB,
			// or if more than 1 video is uploaded, or if any file is not an image or video
			if (
				files.length + filePreviews.length > 10 ||
				totalSize > 15 * 1024 * 1024 ||
				videoCount > 1 ||
				files.some((file) => !file.type.startsWith("image/") && !file.type.startsWith("video/"))
			) {
				alert("Please upload up to 9 images and 1 video with a total size not exceeding 15MB.");
				return;
			}

			// Filter out files that are neither images nor videos
			const validFiles = files.filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"));

			const newPreviews: MediaFilesSchema[] = validFiles.map((file) => ({
				preview: URL.createObjectURL(file),
				type: file.type,
				file: file,
				dimension: "",
				edited: false,
			}));

			updateSelectedMediaFiles(newPreviews);
			setOpenEditor(true)
		},
		[filePreviews]
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

	const handleAddMusic = () => {
		setCreatePostStep(createPostStepEnum.addMusic);
	};

	return (
			<div className="relative p-4">
				{processedMediaFiles.length == 0 && (
					<>
						<CreateAvatar firstName={firstName} lastName={lastName} />
						<Separator className="h-[2px]" />
					</>
				)}

				{processedMediaFiles.length == 0 && (
					// add files
					<div
						{...getRootProps()}
						className={cn(
							"flex justify-center items-center flex-col pt-4  relative",
							filePreviews.length > 0 ? "hidden" : "",
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
								Drag and drop your media file here or <span className="text-primary600 cursor-pointer">click here</span>
							</p>
						)}
						<input {...getInputProps()} ref={fileInputRef} />
					</div>
				)}

				{processedMediaFiles.length > 0 && (
					<div className="w-full">
						<div className="h-fit">
							<UploadForm
								setMentions={setMentions}
								mentions={mentions}
								mediaFiles={processedMediaFiles}
								filePreviews={filePreviews}
								processedFiles={processedMediaFiles}
							/>
						</div>

						<div className="flex justify-center mt-5">{processedMediaFiles.length > 0 ? <PreviewMedias /> : null}</div>

						{mentions.length ? (
							<div className="mt-10">
								<ul className="flex justify-center items-center gap-3 flex-wrap">
									{mentions.map((mention: any, index: number) => {
										const { id, display } = mention as any;
										return (
											<li
												key={index}
												className="py-2 px-3 inline-flex items-center gap-2 bg-gray-100 rounded-sm border text-sm font-medium border-gray-300"
											>
												{display}

												<MinusSquare weight="fill" color="red" size={19} />
											</li>
										);
									})}
								</ul>
							</div>
						) : null}
					</div>
				)}
			</div>
	);
};

export default CreatingPost;

{/* <DialogContent noCloseBtn={true} className="max-h-[650px] md:max-w-[650px] p-0">
 </DialogContent> */}


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
