"use client";
import React, { useState, useEffect } from "react";
import { BookmarkSimple, Plus } from "@phosphor-icons/react";

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { CollectionData, useGetCollections } from "@/api/post/get-all-collections";
import { Skeleton } from "@/components/ui/skeleton";
import { useSavePost } from "@/api/post/save-post-to-collection";

interface ICollections {
	handleStart: () => void;
	postId: string;
}

function Collections({ handleStart, postId }: ICollections) {
	const { data, isFetching, error } = useGetCollections();
	const { mutate, isPending } = useSavePost();


	const handleSaveToCollection = (collectionId: string) => {
		const toastId = toast.loading("Saving post...");
		mutate(
			{
				type: "post",
				collection_id: collectionId,
				post_id: postId
			},
			{
				onSuccess(data) {
					toast.success(data.message, {
						id: toastId,
					});
				},
				onError(data) {
					// console.log(data, "error creating collection");

					toast.error(data.message, {
						id: toastId,
					});
				},
			}
		);
	};

	if (isFetching) return <LoadingData />;

	if (data?.data.length == 0) return <EmptyCollection handleStart={handleStart} />;

	return <AllCollections handleStart={handleStart} data={data?.data} handleSaveToCollection={handleSaveToCollection} />;
}

function EmptyCollection({ handleStart }: any) {
	return (
		<>
			<Flex col className="gap-1 p-3 px-6">
				<Flex className="w-full justify-center">
					<Image src={"/assets/post/no-collection.svg"} width={190} height={168} alt="no collection image" />
				</Flex>

				<Flex col className="gap-2">
					<Paragraph className="font-bold text-xl">No collection made yet</Paragraph>
					<Paragraph className="font-medium text-sm text-center text-text-secondary">
						Don't let your bookmarks get lost in a sea of content! Create collections to keep your saved items
						organizedNo collection made yet
					</Paragraph>

					<Button onClick={handleStart} className="w-full">
						Start here
					</Button>
				</Flex>
			</Flex>
		</>
	);
}

function AllCollections({
	handleStart,
	data,
	handleSaveToCollection,
}: {
	handleStart: any;
	data: CollectionData[];
	handleSaveToCollection;
}) {
	return (
		<>
			<ScrollArea className="h-full p-3">
				{data.map((item, idx) => (
					<Flex
						role="button"
						onClick={() => handleSaveToCollection(item.id)}
						className="gap-2 items-center hover:bg-neutral-100 my-2"
					>
						<img src={item.image ?? "/assets/collections.png"} className="w-[36px] h-[32px] rounded-sm" />
						<Paragraph className="font-bold text-sm">{item.title}</Paragraph>
					</Flex>
				))}
			</ScrollArea>

			<Flex role="button" onClick={handleStart} className="w-full gap-1 bg-neutral200 border-t border-neutral400 p-3">
				<Plus size={16} />
				<Paragraph className="font-bold text-sm">Create</Paragraph>
			</Flex>
		</>
	);
}

function LoadingData({ handleStart }: any) {
	return (
		<>
			<ScrollArea className="h-full p-3">
				{[...new Array(4)].map((_, idx) => (
					<Skeleton key={idx} className="w-full h-6 rounded-sm my-2" />
				))}
			</ScrollArea>

			<Flex role="button" onClick={handleStart} className="w-full gap-1 bg-neutral200 border-t border-neutral400 p-3">
				<Plus size={16} />
				<Paragraph className="font-bold text-sm">Create</Paragraph>
			</Flex>
		</>
	);
}

export default Collections;
