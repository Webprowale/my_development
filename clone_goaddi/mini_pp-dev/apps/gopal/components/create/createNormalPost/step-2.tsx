"use client";
import React, {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useRef,
  Suspense,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { Gallery } from "@/assets/icons";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookmarkSimple,

  CaretLeft,
  CaretRight,
  CheckCircle,
  MagnifyingGlass,
  Pause,
  Play,
  XCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import {
  createPostStepEnum,
  useCreatePostStore,
} from "@/store/useCreatePostStore";

import { Separator } from "@/components/ui/separator";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import AudioPreview from "./waves/audioPreview";
import axios from "axios";
import MiniAudioPreview from "./waves/miniAudioPreview";

interface ICreatePostModal {}

const AddMusic = ({}: ICreatePostModal) => {
  const router = useRouter();

  const [filePreviews, setFilePreviews] = useState<any>([]);
  const [musics, setMusics] = useState([]);
  const [mentions, setMentions] = useState<any>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore((state) => ({ ...state })) as any;
  const { firstName, lastName } = user;
  const { createPostStep, processedMediaFiles, setCreatePostStep } =
    useCreatePostStore((state) => ({
      ...state,
    }));
  const [currentAudio, setCurrentAudio] = useState<any>();

  const onDrop = useCallback(
    async (files: File[]) => {
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      const videoCount = files.filter((file) =>
        file.type.startsWith("video"),
      ).length;

      // Check if the total number of files exceeds 10, or if the total size exceeds 15MB,
      // or if more than 1 video is uploaded, or if any file is not an image or video
      if (
        files.length + filePreviews.length > 10 ||
        totalSize > 15 * 1024 * 1024 ||
        videoCount > 1 ||
        files.some(
          (file) =>
            !file.type.startsWith("image/") && !file.type.startsWith("video/"),
        )
      ) {
        alert(
          "Please upload up to 9 images and 1 video with a total size not exceeding 15MB.",
        );
        return;
      }

      // Filter out files that are neither images nor videos
      const validFiles = files.filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/"),
      );

      // Convert valid files to previews along with their types
      const newPreviews: { preview: string; type: string }[] = validFiles.map(
        (file) => ({
          preview: URL.createObjectURL(file),
          type: file.type,
        }),
      );

      // Update previews and media files state
      // setFilePreviews((prevPreviews: any) => [...prevPreviews, ...newPreviews]);
      // setMediaFiles((prevMediaFiles) => [...prevMediaFiles, ...validFiles]);
    },
    [filePreviews],
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

  // const onClose = () => {

  // };

  const handleCancel = () => {
    setCreatePostStep(createPostStepEnum.creating);

    // toast.warning("Cancel Add music to post?", {
    // 	description: "Are you sure you want to cancel add music",
    // 	action: {
    // 		label: "Yes",
    // 		onClick(event) {
    // 			setCreatePostStep(createPostStepEnum.creating);
    // 		},
    // 	},
    // });
  };

  useEffect(() => {
    const fetchMusics = async () => {
      const data = new FormData();
      data.append("Userid", "1");

      const response = await fetch(
        "https://monaco.vgtechdemo.com/api/trending-music",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer gopaddi@v1",
            // "Custom-Header": "CustomValue",
          },
          body: data,
        },
      );

      const result = await response.json();
      console.log("Library", result.data);
      setMusics(result.tracks.data);
    };

    fetchMusics();
  }, []);

  return (
    <>
      <div className="relative flex  flex-col">
        <Flex between className="w-full items-center border-b p-4">
          <h1 className="text-black font-bold text-xl">Add music to a post</h1>

          <Flex gap={2}>
            <Button onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
            <Button>Save</Button>
          </Flex>
        </Flex>

        <div className="w-full grid grid-cols-2">
          <AudioList
            musics={musics}
            currentAudio={currentAudio}
            setCurrentAudio={setCurrentAudio}
          />
          <Preview />
        </div>

        <div className="w-full  relative">
          <TrimAudio
            currentAudio={currentAudio}
            setCurrentAudio={setCurrentAudio}
          />
        </div>
      </div>
    </>
  );
};

export default AddMusic;

function AudioList({ currentAudio, setCurrentAudio, musics }: any) {
  const [searchKey, setSearchKey] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  function handleSearch(e: any) {
    setSearchKey(e.target.value);
  }

  // mock seawrch result
  useEffect(() => {
    const searchMusic = async () => {
      const data = new FormData();
      data.append("Userid", "1");
      data.append("find_music", searchKey);

      const response = await fetch(
        "https://monaco.vgtechdemo.com/api/search_music",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer gopaddi@v1",
            // "Custom-Header": "CustomValue",
          },
          body: data,
        },
      );

      const result = await response.json();
      // console.log("Library", result.data);
      setSearchResult(result.data);
    };

    searchMusic();

    if (searchKey.length > 0 && searchKey.length < 3) {
      setSuggestions(["brother bernard", "bob", "Amapiano"]);
    }
    if (searchKey.length > 3) {
      setSuggestions([]);
      setSearchResult(searchResult);
    }
  }, [searchKey]);

  return (
    <div className="music_list bg-white h-full">
      <div className="search_container relative p-2 mt-1 flex items-center">
        <div
          className={cn(
            "input relative w-full h-[48px]",
            searchResult.length > 0 && "w-[90%]",
          )}
        >
          <MagnifyingGlass
            size={16}
            className="text-[#667185] absolute left-2 -translate-y-1/2 top-1/2"
          />
          <Input
            placeholder="Search"
            value={searchKey}
            onChange={handleSearch}
            className="w-full h-full border-none rounded p-2 pl-8 bg-[#F0F2F5]"
          />
          {searchKey.length > 0 && (
            <XCircle
              onClick={() => setSearchKey("")}
              weight="fill"
              size={20}
              className="text-[#667185] absolute right-2 -translate-y-1/2 top-1/2"
            />
          )}
        </div>
        {searchResult.length > 0 && (
          <div className="w-[10%] centered shrink-0">
            <CheckCircle size={20} weight="fill" className="text-success600" />
          </div>
        )}
      </div>
      <Separator className="w-full my-3" />

      <div className="audio_list w-full p-2">
        {searchKey.length == 0 ? (
          <Tabs defaultValue="Recommended" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="Recommended" className="w-full">
                Recommended
              </TabsTrigger>
              <TabsTrigger value="Favorite" className="w-full">
                Favorite
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="Recommended"
              className="overflow-y-scroll h-[280px] no-scrollbar"
            >
              <div className="relative h-full space-y-1">
                {musics.length
                  ? musics.map((item, index) => (
                      <AudioCard
                        key={index}
                        data={item}
                        currentAudio={currentAudio}
                        setCurrentAudio={setCurrentAudio}
                      />
                    ))
                  : null}
              </div>
            </TabsContent>
            <TabsContent
              value="Favorite"
              className="overflow-y-scroll h-[280px] no-scrollbar"
            >
              <div className="relative h-full space-y-1">
                {musics.length
                  ? musics
                      .filter((item) => item.ml_audio_favorite)
                      .map((item, index) => (
                        <AudioCard
                          key={index}
                          data={item}
                          currentAudio={currentAudio}
                          setCurrentAudio={setCurrentAudio}
                        />
                      ))
                  : null}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="search_result w-full h-[300px] bg-white overflow-y-scroll no-scrollbar">
            <SearchResult
              data={searchResult}
              currentAudio={currentAudio}
              setCurrentAudio={setCurrentAudio}
              suggestions={suggestions}
              isSearching={isSearching}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Preview() {
  const { processedMediaFiles } = useCreatePostStore((state) => ({
    ...state,
  }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: !true }),
  );

  const handleChangeCarousel = (index: number) => {
    if (!api) {
      return null;
    }

    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      //     console.log(api.slidesInView());
    });
  }, [api]);

  return (
    <div className="post_preview w-full h-full bg-neutral200 flex items-center justify-center p-4 pt-10">
      <Carousel setApi={setApi} opts={{}} className="flex-col h-auto min-h-[70%] w-[80%] gap-4">
        <CarouselContent>
          {processedMediaFiles.map((file, index) => (
            <CarouselItem key={index} className="p-0 w-[360px]">
              <div
                style={{
                  backgroundImage: `url(${file.preview})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                className="media_preview w-[360px] h-[250px] bg-primary100 rounded-sm relative"
              >
                <div className="pagination w-full centered  absolute bottom-2">
                  <Flex gap={1}>
                    {Array.from({ length: count }).map((_, index) => (
                      <div
                        role="button"
                        onClick={() => handleChangeCarousel(index)}
                        className={cn(
                          "w-2 h-2 rounded-full bg-primary",
                          index !== current - 1 && "bg-primary/25",
                        )}
                      ></div>
                    ))}
                  </Flex>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <PreviewControls />
      </Carousel>
    </div>
  );
}

function TrimAudio({ currentAudio, setCurrentAudio }: any) {
  return (
    <>
      <Separator className="w-full" />
      {currentAudio?.preview ? (
        <AudioPreview
          musicTitle={`${currentAudio?.title} by ${currentAudio?.artist.name}`}
          url={currentAudio?.preview}
        />
      ) : null}
    </>
  );
}

function AudioCard({ currentAudio, setCurrentAudio, data, ...props }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  console.log(currentAudio, "the current audio");

  const {
    // ml_id,
    // ml_title,
    // ml_description,
    // ml_artist_name,

    // ml_audio_url,
    // ml_album_image_url,
    // ml_audio_favorite,
    preview,
    artist,
    title,
  } = data;

  function handleClick(audio) {
    if (currentAudio === audio) {
      toast.info("Removed music");
      setCurrentAudio();
    } else if (currentAudio && currentAudio !== audio) {
      toast.info("Swapped music");

      setCurrentAudio(audio);
    } else if (!currentAudio) {
      toast.info("Music added");

      setCurrentAudio(audio);
    }
  }

  function handleControlClick() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentTime(0);
      }
    }
    return;
  }

  const handleProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      const duration = audioRef.current.duration;
      if (duration > 0) {
        // Avoid division by zero
        const progress = (currentTime / duration) * 100;
        setCurrentTime(progress); // Update with percentage
      }
    }
  };

  const isActive = data == currentAudio;

  return (
    <Flex {...props} col className={cn("items-start h-auto gap-2 group p-2")}>
      <Flex gap={2} className="justify-between w-full">
        <Flex gap={2}>
          <Flex className="">
            <div
              className="group-hover:hidden 
             w-1 h-1 bg-gray-800 rounded-full"
            />
            <button
              onClick={handleControlClick}
              className={cn(
                "control group-hover:visible invisible ",
                isActive && "visible",
              )}
            >
              {isPlaying ? (
                <Pause size={20} weight="fill" className="text-neutral900" />
              ) : (
                <Play size={20} weight="fill" className="text-neutral900" />
              )}
            </button>
          </Flex>

          <Avatar className="w-[48px] h-[48px]">
            <AvatarImage src={artist.picture_small} alt="audio thumb" />
            <AvatarFallback>{artist.name}</AvatarFallback>
          </Avatar>

          <Flex col className="items-start h-full justify-between gap-3">
            <p className="font-bold text-text capitalize text-sm">
              {title || "Blues"}
            </p>

            <Flex gap={2}>
              <p className="font-bold text-text-secondary capitalize text-xs">
                {artist.name || "Billie Eillish"}
              </p>

              <div className="w-2 h-2 bg-neutral400"></div>

              <p className="font-bold text-text-secondary capitalize text-xs">
                0:30 / 02:04
              </p>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          gap={2}
          className={cn(
            "group-hover:visible invisible transition-all",
            isActive && "visible",
            false && "visible",
          )}
        >
          <Button
            onClick={() => handleClick(data)}
            variant="secondary"
            size="xs"
          >
            {currentAudio === data
              ? "remove"
              : currentAudio && currentAudio !== data
                ? "Swap"
                : !currentAudio
                  ? "Add to Post"
                  : ""}
          </Button>

          <BookmarkSimple
            size={22}
            weight={false ? "fill" : "regular"}
            className={cn(
              "hover:fill-yellow-500",
              false ? "text-yellow-300" : "text-neutral900",
            )}
          />
        </Flex>
      </Flex>
      <div className="w-full h-10 flex items-center">
        {/* <Progress current={20} isActive={isActive} /> */}
        <audio
          ref={audioRef}
          src={preview}
          onPlay={handleProgress}
          onTimeUpdate={handleProgress}
          onEnded={() => setIsPlaying(false)}
        ></audio>
        <MiniAudioPreview url={preview} isPlaying={isPlaying} />
      </div>
    </Flex>
  );
}

function Progress({ max = 100, current = 0 }: any) {
  return (
    <div
      className={cn(
        "progress h-[14px] bg-neutral200 relative rounded-xl",
        `w-[${max}%]`,
      )}
    >
      <div
        style={{
          width: `${current}%`,
        }}
        className="progress_bar bg-primary h-full rounded-xl group-hover:visible invisible"
      />
    </div>
  );
}

function SearchResult({
  currentAudio,
  setCurrentAudio,
  isSearching,
  data,
  suggestions,
}: any) {
  if (isSearching)
    return (
      <div className="w-full centered p-1 gap-1">
        <Skeleton className="rounded-lg w-full h-5" />
        <Skeleton className="rounded-lg w-full h-5" />
        <Skeleton className="rounded-lg w-full h-5" />
        <Skeleton className="rounded-lg w-full h-5" />
      </div>
    );

  if (suggestions.length > 0)
    return (
      <div className="w-full h-full relative space-y-3">
        {suggestions.map((item, index) => (
          <Flex key={index} className="w-full gap-3 h-[52px]">
            <div className="w-12 h-12 bg-primary200 centered rounded-full">
              <MagnifyingGlass size={16} className="text-primary" />
            </div>

            <p className="font-bold text-text-secondary capitalize text-xs">
              {item}
            </p>
          </Flex>
        ))}
      </div>
    );

  if (data.length > 0)
    return (
      <div className="w-full h-full relative">
        {data.map((item, index) => (
          <AudioCard
            key={index}
            data={item}
            currentAudio={currentAudio}
            setCurrentAudio={setCurrentAudio}
          />
        ))}
      </div>
    );

  return <div>No music found</div>;
}

export function PreviewControls() {
  const { canScrollPrev, canScrollNext, scrollNext, scrollPrev } =
    useCarousel();

  return (
    <div className="flex w-fit border gap-2 justify-center mt-3 mx-auto bg-white rounded-md p-1 px-3 items-center shadow">
      <button
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        className="w-12 h-12 flex items-center justify-center hover:opacity-95"
      >
        <CaretLeft size={20} className="text-neutral-900" />
      </button>
      <button
        disabled={!canScrollNext}
        onClick={scrollNext}
        className="w-12 h-12 flex items-center justify-center hover:opacity-95"
      >
        <CaretRight size={20} className="text-neutral-900" />
      </button>
    </div>
  );
}



// 	<Flex className="flex-col h-[70%] w-[80%] gap-4">
// 	<div
// 		style={{
// 			backgroundImage: `url(${processedMediaFiles[currentImageIndex].preview})`,
// 			backgroundSize: "contain",
// 			backgroundRepeat: "no-repeat",
// 			backgroundPosition: "center",
// 		}}
// 		className="media_preview w-[360px] h-[460px] bg-primary100 rounded-sm"
// 	>
// 		{/* <img
// 			src={processedMediaFiles[currentImageIndex].preview}
// 			alt=""
// 			className="w-full h-full object-cover rounded-sm"
// 		/> */}
// 		{/* <img src="/assets/create/1_1.png" alt="" className="w-full h-full object-cover rounded-sm" /> */}
// 	</div>
// 	{/* controls */}
// 	<div className="flex w-full gap-2 justify-between bg-white rounded-md p-1 px-3 items-center shadow">
// 		{/* <button className="flex items-center gap-2 hover:opacity-95">
// 			<ArrowsOutSimple size={20} className="text-neutral-900" />
// 			<p className="text-sm">Resize Media</p>
// 		</button>

// 		<Separator orientation="vertical" className="h-full shrink-0 " /> */}

// 		<Flex className="w-fit">
// 			<button
// 				disabled={currentImageIndex == 0}
// 				onClick={() => setCurrentImageIndex((p) => (p -= 1))}
// 				className="w-12 h-12 flex items-center justify-center hover:opacity-95"
// 			>
// 				<CaretLeft size={20} className="text-neutral-900" />
// 			</button>
// 			<button
// 				disabled={currentImageIndex == processedMediaFiles.length - 1}
// 				onClick={() => setCurrentImageIndex((p) => (p += 1))}
// 				className="w-12 h-12 flex items-center justify-center hover:opacity-95"
// 			>
// 				<CaretRight size={20} className="text-neutral-900" />
// 			</button>
// 		</Flex>
// 	</div>
// </Flex>
