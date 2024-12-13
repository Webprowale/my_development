"use client";
import React, { useState, useEffect } from "react";
import { BookmarkSimple, Plus } from "@phosphor-icons/react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/goui/modal";
import { C_Button } from "@/app/gopal/profile/[id]/button";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Flex } from "@/components/ui/flex";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Paragraph from "@/components/ui/typography/paragraph";
import Button from "@/components/goui/button";
import { toast } from "sonner";
import Collections from "./collections";
import CreateCollectionModal from "./create-collection";
import { useCreateCollection } from "@/api/post/create-collection";

type Props = {
	postImage: any;
	postId : string;
};

const BookmarkAction = ({ postImage, postId }: Props) => {
	const [isBookMarked, setIsBookMarked] = useState(false);
	const [bookmark, setBookmark] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [title, setTitle] = useState<string>("");

	const { mutate, isPending, error } = useCreateCollection();

	const handleSave = () => {
		const toastId = toast.loading("Creating collection..");
		mutate(
			{
				title,
				file: postImage?.url ?? "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244648_640.jpg",
			},
			{
				onSuccess(data) {
					toast.success(data.message, {
						id: toastId,
					});
				},
				onError(data)
				{
					console.log(data, "error creating collection");
					
					toast.error(data.message, {
						id: toastId,
					});
				},
			}
		);
	};

	function handleCreateCollection() {
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Flex className="items-center group md:gap-1.5 gap-0.5 cursor-pointer">
						<button>
							<BookmarkSimple
								weight={isBookMarked ? "fill" : "regular"}
								color={isBookMarked ? "#FFC200" : ""}
								className="md:text-xl text-lg group-hover:scale-110 transition-all"
							/>
						</button>
						<p className="md:text-base text-sm">{bookmark}</p>
					</Flex>
				</PopoverTrigger>

				<PopoverContent className="p-0 w-[322px]">
					<Flex className="justify-between border-b p-3">
						<div className=" font-semibold text-lg">Collections</div>
					</Flex>

					<Collections postId={postId} handleStart={handleCreateCollection} />
				</PopoverContent>
			</Popover>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className=" h-fit p-0">
					<div className="relative">
						<img src={"/assets/profile_modal.svg"} alt="check alt" className="absolute left-6 top-5" />
						<img src="/assets/modal-lines.svg" alt="Horizontal Line Icon" />
					</div>

					<div className="relative space-y-3 p-6 pt-1">
						<Flex col className="items-start">
							<Paragraph className=" text-xl font-bold">Create category</Paragraph>
							<Paragraph className="text-sm max-w-md">Add new category to your saved post</Paragraph>
						</Flex>

						<div className="">
							<img src={postImage?.url ?? "/assets/collection_image.png"} className="w-[155px] h-[155px]" />
						</div>

						<div className="">
							<div className="grid w-full max-full items-center gap-1.5">
								<div className="grid grid-flow-row">
									<div className="flex justify-between text-gray-500 m-0 p-0">
										<Label htmlFor="category_name">Category Name</Label>
										<span>50</span>
									</div>
									<Input
										onChange={(e) => setTitle(e.target.value)}
										type="text"
										id="category_name"
										placeholder="Love"
										className="p-4"
									/>
								</div>
							</div>
						</div>

						<div className="col-span-2 w-full flex justify-end gap-4">
							<C_Button onClick={closeModal} className="bg-blue-300/30 text-blue-700 px-12 py-3">
								Cancel
							</C_Button>

							<C_Button isLoading={isPending} className="px-12 py-3 bg-blue-700 text-white" onClick={handleSave}>
								Save
							</C_Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default BookmarkAction;

// function ModalC () {
//   return (
//     <Modal
// 				isOpen={isModalOpen}
// 				onClose={closeModal}
// 				trigger={<button></button>}
// 				className="my-modal sm:max-w-[600px]"
// 				left={false}
// 			>
// 				{collectionScreen == "create_collection" ? (
// 					<>
// 						<img className="absolute top-0 w-full h-fit z-[-1]" src="/assets/modal-lines.svg" alt="modal-lines" />

// 						<img src="/assets/profile_modal.svg" />

// <DialogHeader>
// 	<DialogTitle className="mt-2 text-xl">Create category</DialogTitle>
// 	<DialogDescription className="text-sm max-w-md mb-12">
// 		Add new category to your saved post
// 	</DialogDescription>

// 	<div className="mt-[500px]">
// 		<img src="/assets/collection_image.png" className="w-[155px] h-[155px]" />
// 	</div>

// 	<div className="pt-5">
// 		<div className="grid w-full max-full items-center gap-1.5">
// 			<div className="grid grid-flow-row">
// 				<div className="flex justify-between text-gray-500 m-0 p-0">
// 					<Label htmlFor="category_name">Category Name</Label>
// 					<span>50</span>
// 				</div>
// 				<Input type="text" id="category_name" placeholder="Love" className="p-4" />
// 			</div>
// 		</div>
// 	</div>

// 	<div className="col-span-2 w-full flex justify-end gap-4">
// 		<C_Button onClick={closeModal} className="bg-blue-300/30 text-blue-700 px-12 py-3">
// 			Cancel
// 		</C_Button>

// 		<C_Button
// 			className="px-12 py-3 bg-blue-700 text-white"
// 			onClick={() => SetCollectionScreen("add_to_collection")}
// 		>
// 			Save
// 		</C_Button>
// 	</div>
// </DialogHeader>
// 					</>
// 				) : collectionScreen == "add_to_collection" ? (
// 					<>
// 						<div className=" font-semibold text-lg">Collections</div>
// 						<Separator />

// 						<div className="grid grid-flow-row gap-4">
// 							<ScrollArea className="h-[350px] p-4">
// 								{[...new Array(6)].map(() => (
// 									<div className="flex gap-2 items-center my-4">
// 										<img src="/assets/collections.png" className="w-[120px] h-[100px]" />
// 										<span className="font-bold">Love</span>
// 									</div>
// 								))}
// 							</ScrollArea>
// 						</div>
// 					</>
// 				) : (
// 					<>
// <div className=" font-semibold text-lg">Collections</div>
// <Separator />

// <div className="flex flex-col gap-1 items-center py-16">
// 	<div>
// 		<img src="/assets/fi_8088791.svg" />
// 	</div>

// 	<div className="font-bold">No collection made yet</div>

// 	<div>
// 		<Link
// 			href=""
// 			className="text-blue-500 underline"
// 			onClick={() => SetCollectionScreen("create_collection")}
// 		>
// 			Start here
// 		</Link>
// 	</div>
// </div>
// 					</>
// 				)}

// 				{collectionScreen == "add_to_collection" ? (
// 					<div className="sticky bg-[#F7F9FC] -m-6 ">
// 						<div
// 							className="p-4 flex items-center gap-1 cursor-pointer"
// 							onClick={() => changeCollectionScreen("create_collection")}
// 						>
// 							<Plus size={32} /> Create
// 						</div>
// 					</div>
// 				) : (
// 					""
// 				)}
// 			</Modal>
//   )
// }
