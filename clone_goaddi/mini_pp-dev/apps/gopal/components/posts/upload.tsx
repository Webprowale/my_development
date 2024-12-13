"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/utils";
import { cn } from "@/lib/utils";
import SelectMediaFiles from "../create/EditMediaFiles/selectMediaFiles";
import { useCreatePostStore } from "@/store/useCreatePostStore";
import CreateNormalPostModal from "../create/createNormalPost";

interface Props {}

const UploadPost = ({ classes }: { classes?: string }) => {
	const router = useRouter();
	const { user, setUser } = useAuthStore((state) => ({ ...state })) as any;
	const { firstName, lastName, picture } = user;
	// const [open, setOpen] = useState(false);

	const [aspectRatio, setAspectRatio] = useState(1 / 1);
	const [openEditor, setOpenEditor] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState<any>([]);
	const { processedMediaFiles, openCreatePostModal, backLoader,  setOpenCreatePostModal } = useCreatePostStore((state) => ({
		...state,
	}));

	useEffect(() => {
		// if (processedMediaFiles.length > 0) {
		// 	setOpen(true);
		// }
		if(backLoader.active){
			setOpen(false)
		}
	}, [processedMediaFiles]);

	const setOpen = (value) => {
		setOpenCreatePostModal(value)
	};

	return (
		<div className={cn("min-w-[200px] w-full bg-white shadow-sm rounded-[4px]", classes)}>
			<div className="flex gap-2 py-2 items-center px-7">
				<Avatar className="md:w-6 md:h-6 w-5 h-5 cursor-pointer">
					<AvatarImage src={picture} />
					<AvatarFallback className="text-[10px]">{getInitials(firstName + " " + lastName)}</AvatarFallback>
				</Avatar>
				<p className="font-satoshi font-semibold md:text-sm text-xs">Share your experience with the world</p>
			</div>

			<Separator className="h-[2px]" />

			{/* TODO: CREATE NORMAL POST */}
			{processedMediaFiles && (
				<CreateNormalPostModal
					// processedFiles={processedMediaFiles}
					open={openCreatePostModal}
					setOpen={setOpen}
					// setProcessedFiles={setProcessedFiles}
					defaultAspectRatio={aspectRatio}
					selectedFiles={selectedFiles}
					setSelectedFiles={setSelectedFiles}
					openEditor={openEditor}
					setOpenEditor={setOpenEditor}
				/>
			)}

			{/* TODO: CREATE FLICKS */}

			{/* TODO: CREATE POLLS */}


			<SelectMediaFiles
				selectedFiles={selectedFiles}
				openEditor={openEditor}
				setOpenEditor={setOpenEditor}
				aspectRatio={aspectRatio}
				setAspectRatio={setAspectRatio}
			/>
		</div>
	);
};

export default UploadPost;
