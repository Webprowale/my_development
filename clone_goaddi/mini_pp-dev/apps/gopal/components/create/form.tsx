"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter, usePathname } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import UploadAvatar, { FormAvatar } from "./avatar";
import Tag from "./tag";
import Mentions from "rc-mentions";
import axios from "axios";
import { createPost } from "@/axios/endpoints/post.endpoint";
import EmojiPicker from "emoji-picker-react";
import { Smiley } from "@phosphor-icons/react";
import { useAuthStore } from "@/store/useAuthStore";
import PostInput from "./post-input";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useClickOutside from "@/hooks/useClickOutside";
import { convertImageDataUrlsToFiles } from "./get-cropped-imgurl";
import { IPostImage } from "./add-media-to-post";
import { MediaFilesSchema, useCreatePostStore } from "@/store/useCreatePostStore";

const { Option } = Mentions;

type UploadFormProps = {
	filePreviews: string[];
	mediaFiles: MediaFilesSchema[];
	mentions: [];
	setMentions: any;
	processedFiles?: MediaFilesSchema[];
};

const formSchema = z.object({
	post: z.string().min(1, { message: "Post must be at least 1 character" }).max(300, {
		message: "Post must not be longer than 300 characters.",
	}),
});

const UploadForm = ({ filePreviews, mediaFiles, mentions, setMentions, processedFiles }: UploadFormProps) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [atSymbolIndex, setAtSymbolIndex] = useState<number | null>(null);
	const [mediaLinks, setMediaLinks] = useState<string[]>([]);
	const [emojiOpen, setEmojiOpen] = useState(false);
	const [postLength, setPostLength] = useState(0);
	const [showEmojis, setShowEmojis] = useState(false);
	const { toggleBackLoader, setOpenCreatePostModal } = useCreatePostStore((state) => ({
		...state,
	}));

	const { user } = useAuthStore((state) => ({ ...state })) as any;
	const { firstName, lastName, picture } = user;

	const emojiRef = useClickOutside(() => setShowEmojis(false));

	const form = useForm<any>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			post: "",
		},
	});

	const { isDirty } = form.formState;

	const postWatch = form.watch("post");

	const onSubmit = async (data: any) => {
		const loadingId = toast.loading("Uploading media");

		setOpenCreatePostModal(false)
		setOpenCreatePostModal(false)

		// alert user when there are un adjusted images
		// const unEditedFiles = mediaFiles.filter(item => !item.hasOwnProperty("file"))

		// if(unEditedFiles.length > 0) return toast.info("One or Image is not edited", {
		// 	id: loadingId,
		// });

		try {
			setLoading(true);
			toggleBackLoader({ active: true, progress: 20 });
			try {
				if (!mediaFiles) {
					return;
				}

				const formData = new FormData();
				for (let i = 0; i < mediaFiles.length; i++) {
					formData.append(`file${i}`, mediaFiles[i].file);
				}

				toggleBackLoader({ active: true, progress: 40 });

				// Uploading Post
				const filesresponse = await axios.post("/api/upload", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				toggleBackLoader({ active: true, progress: 60 });


				const links = filesresponse?.data?.data;

				const arrayOfFilesString = links?.map((obj: { file: string }) => obj.file);

				setMediaLinks(arrayOfFilesString);
				toggleBackLoader({ active: true, progress: 70 });

				//Creating Post
				toast.loading("Creating post", {
					id: loadingId,
				});

				toggleBackLoader({ active: true, progress: 80 });

				const { success } = await createPost({
					caption: data?.post,
					files: arrayOfFilesString,
					visibility: "public",
				});

				if (success) {
					toggleBackLoader({ active: true, progress: 100 });

					toast.success("Post created successfully", {
						id: loadingId,
					});

					setTimeout(() => {
						toggleBackLoader({ active: false, progress: 20 });

						router.push("/gopal?mode=refresh");
					}, 4000);
				}
			} catch (error) {
				console.log("Error", error.message);
			}
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		form.setValue("post", value); // Update the form value
		if (value.endsWith("@")) {
			setShowModal(true); // Show modal if "@" is typed
		} else if (value.endsWith("@ ")) {
			setShowModal(false); // Close modal if space is typed after "@"
		}
	};

	useEffect(() => {
		const post = form.getValues("post");
		setPostLength(post.length);
	}, [postWatch]);

	const addEmoji = (e: any) => {
		let sym: string[] = e.unified.split("-");
		let codesArray: number[] = [];
		sym.forEach((el: string) => codesArray.push(parseInt("0x" + el, 16)));
		let emoji: string = String.fromCodePoint(...codesArray);
		form.setValue("post", form.getValues("post") + emoji);
	};

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full relative">
					<FormAvatar
						filePreviews={filePreviews}
						firstName={firstName}
						picture={picture}
						lastName={lastName}
						loading={loading}
						isDirty={isDirty}
					/>
					<div className="w-full relative">
						<FormField
							control={form.control}
							name="post"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										{/* <textarea
                    placeholder="Share your experience with the world!"
                    {...field}
                    id="postTextarea"
                    onChange={handleChange}
                    className="scrollbar scrollbar-track-gray-100 scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full  scrollbar-track-rounded-full scrollbar-corner-border md:w-full w-full min-h-[150px] border-none outline-none py-1 md:text-sm text-sm resize-none text-slate-600"
                  ></textarea> */}
										{/* <Mentions
                    className="w-full border-none"
                    autoFocus
                    rows={3}
                    defaultValue="Hello World"
                    onSelect={onSelect}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    options={[
                      {
                        value: "light",
                        label: "Light",
                      },
                      {
                        value: "bamboo",
                        label: "Bamboo",
                      },
                      {
                        value: "cat",
                        label: "Cat",
                      },
                    ]}
                  /> */}
										<PostInput field={field} mentions={mentions} setMentions={setMentions} postWatch={postWatch} />
									</FormControl>
									<FormMessage className="md:text-base text-sm mt-6" />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
			<div className="mt-5 w-full">
				<div className="ml-auto">
					<div className="flex gap-2 items-center justify-end w-full">
						<div className="">
							<div style={{ width: 300 / 4 }} className="h-2 bg-primary200 rounded-full overflow-hidden">
								<div className="bg-primary600 h-2 rounded-full" style={{ width: postLength / 4 }}></div>
							</div>
							<div className="text-xs text-slate-600">{postLength} / 300</div>
						</div>
						<div ref={emojiRef} className="relative">
							<button className="button" onClick={() => setShowEmojis(!showEmojis)}>
								<Smiley weight="bold" className="text-slate-600" size={27} />
							</button>
							{showEmojis && (
								<div className="fixed z-50 right-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
									<Picker set="" data={data} theme="light" onEmojiSelect={addEmoji} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadForm;
