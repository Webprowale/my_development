"use client";

import { useDeleteComment } from "@/api/post/delete-comment";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Flex } from "@/components/ui/flex";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/useAuthStore";
import { DotsThreeOutline } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteCommentModal({ commentId, commentOwnerId }: any) {
	const { mutate, isPending } = useDeleteComment();
      const  [open, setOpen] = useState(false)
	const { user } = useAuthStore((state) => ({ ...state })) as any;
	// console.log(user, "the useer object")


	function handleDelete() {
		mutate({
			commentId
		});
		
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="invisible group-hover:visible">
				<DotsThreeOutline size={16} weight="fill" className="text-gray-600" />
			</DialogTrigger>
			<DialogContent noCloseBtn className="w-fit h-fit z-[99999999] bg-white rounded-xl p-0">
				<Flex col className="w-[300px]">
					{  user?.Userid === commentOwnerId ? <button onClick={handleDelete}  className="w-full bg-transparent text-red-500 p-2">
						Delete
					</button> :  <button disabled className="w-full bg-transparent text-red-500 p-2 disabled:cursor-not-allowed">
						Report
					</button>}
                              <Separator className="w-full"/>
					<button onClick={() => setOpen(false)} className="w-full bg-transparent p-2">
						Cancel
					</button>
				</Flex>
			</DialogContent>
		</Dialog>
	);
}
