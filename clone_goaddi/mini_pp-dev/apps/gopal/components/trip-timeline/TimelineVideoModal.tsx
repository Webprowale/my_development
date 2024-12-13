import {
  ArrowsOut,
  CalendarBlank,
  DownloadSimple,
  Pause,
  Play,
  Screencast,
  ShareFat,
  SpeakerHigh,
  User,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import GoPaddiVideo from "./GoPaddiVideo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const TimelineVideoModal = ({ close }: { close: () => void }) => {
  // Close the modal
  const closeModal = (e: any) => {
    // close the modal only when teh parent container is cicked
    if (e.target.id === "videos") {
      close();
    }
  };
  return (
    <div
      className="videos fixed inset-0 w-full h-screen bg-[#00000063] backdrop-blur-sm grid place-items-center z-50"
      id="video"
    >
      <div className="videos-container relative min-w-[50%] max-w-[50%] min-h-[60vh] max-h-[80vh] p-4 pb-8 rounded bg-white">
        <button
          className="absolute top-0 -right-20 text-white"
          onClick={() => {
            close();
          }}
        >
          <X
            size={32}
            weight="bold"
          />
        </button>

        {/* carousel for video */}
        <Carousel>
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4">
              <section className="main">
                <GoPaddiVideo />
                <div className="video-details mt-6 flex items-start justify-between">
                  <div className="details">
                    <h2 className="font-bold text-lg mb-2 ">
                      Bahamas Family Trip
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1 border-r border-r-[#98A2B3]  pr-4">
                        <p className="flex items-center text-sm text-[#647995] font-medium ">
                          <User size={18} />
                          Created by
                        </p>
                        <p className="text-sm font-medium">Ayo Philiphs</p>
                      </div>
                      <div className="flex flex-col gap-1 border-r border-r-[#98A2B3] pr-4">
                        <p className="flex items-center text-sm text-[#647995] font-medium">
                          <CalendarBlank size={18} />
                          Date Started
                        </p>
                        <p className="text-sm font-medium">12-04-2024</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="flex items-center text-sm text-[#647995] font-medium">
                          <CalendarBlank size={18} />
                          Date Ended
                        </p>
                        <p className="text-sm font-medium">12-05-2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="actions flex items-center gap-2">
                    <Button
                      variant={"default"}
                      className="text-xs flex items-center gap-2 bg-primary100 text-primary600 hover:bg-primary200"
                    >
                      Share
                      <ShareFat
                        size={15}
                        weight="fill"
                      />
                    </Button>
                    <a
                      href={
                        "https://videos.pexels.com/video-files/6247699/6247699-hd_1920_1080_24fps.mp4"
                      }
                      className="flex bg-primary600 group-hover:flex py-3 px-4 rounded-md ease-in delay-75 duration-100 items-center gap-2 text-white hover:bg-primary700 text-xs"
                      download={true}
                    >
                      Download
                      <DownloadSimple
                        size={15}
                        weight="fill"
                      />
                    </a>
                  </div>
                </div>
              </section>
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4">
              <section className="main">
                <GoPaddiVideo />
                <div className="video-details mt-6 flex items-start justify-between">
                  <div className="details">
                    <h2 className="font-bold text-lg mb-2 ">
                      Bahamas Family Trip
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1 border-r border-r-[#98A2B3]  pr-4">
                        <p className="flex items-center text-sm text-[#647995] font-medium ">
                          <User size={18} />
                          Created by
                        </p>
                        <p className="text-sm font-medium">Ayo Philiphs</p>
                      </div>
                      <div className="flex flex-col gap-1 border-r border-r-[#98A2B3] pr-4">
                        <p className="flex items-center text-sm text-[#647995] font-medium">
                          <CalendarBlank size={18} />
                          Date Started
                        </p>
                        <p className="text-sm font-medium">12-04-2024</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="flex items-center text-sm text-[#647995] font-medium">
                          <CalendarBlank size={18} />
                          Date Ended
                        </p>
                        <p className="text-sm font-medium">12-05-2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="actions flex items-center gap-2">
                    <Button
                      variant={"default"}
                      className="text-xs flex items-center gap-2 bg-primary100 text-primary600 hover:bg-primary200"
                    >
                      Share
                      <ShareFat
                        size={15}
                        weight="fill"
                      />
                    </Button>
                    <a
                      href={
                        "https://videos.pexels.com/video-files/6247699/6247699-hd_1920_1080_24fps.mp4"
                      }
                      className="flex bg-primary600 group-hover:flex py-3 px-4 rounded-md ease-in delay-75 duration-100 items-center gap-2 text-white hover:bg-primary700 text-xs"
                      download={true}
                    >
                      Download
                      <DownloadSimple
                        size={15}
                        weight="fill"
                      />
                    </a>
                  </div>
                </div>
              </section>
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4">
              <section className="main">
                <GoPaddiVideo />
                <div className="video-details mt-6 flex items-start justify-between">
                  <div className="details">
                    <h2 className="font-bold text-lg mb-2 ">
                      Bahamas Family Trip
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1 border-r border-r-[#98A2B3]  pr-4">
                        <p className="flex items-center text-sm text-[#647995] font-medium ">
                          <User size={18} />
                          Created by
                        </p>
                        <p className="text-sm font-medium">Ayo Philiphs</p>
                      </div>
                      <div className="flex flex-col gap-1 border-r border-r-[#98A2B3] pr-4">
                        <p className="flex items-center text-sm text-[#647995] font-medium">
                          <CalendarBlank size={18} />
                          Date Started
                        </p>
                        <p className="text-sm font-medium">12-04-2024</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="flex items-center text-sm text-[#647995] font-medium">
                          <CalendarBlank size={18} />
                          Date Ended
                        </p>
                        <p className="text-sm font-medium">12-05-2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="actions flex items-center gap-2">
                    <Button
                      variant={"default"}
                      className="text-xs flex items-center gap-2 bg-primary100 text-primary600 hover:bg-primary200"
                    >
                      Share
                      <ShareFat
                        size={15}
                        weight="fill"
                      />
                    </Button>
                    <a
                      href={
                        "https://videos.pexels.com/video-files/6247699/6247699-hd_1920_1080_24fps.mp4"
                      }
                      className="flex bg-primary600 group-hover:flex py-3 px-4 rounded-md ease-in delay-75 duration-100 items-center gap-2 text-white hover:bg-primary700 text-xs"
                      download={true}
                    >
                      Download
                      <DownloadSimple
                        size={15}
                        weight="fill"
                      />
                    </a>
                  </div>
                </div>
              </section>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="bg-white text-primary600 z-20 h-12 w-12 -translate-x-16 text-lg" />
          <CarouselNext className="bg-white text-primary600 z-20 h-12 w-12 translate-x-16 text-lg" />
        </Carousel>
      </div>
    </div>
  );
};

export default TimelineVideoModal;
