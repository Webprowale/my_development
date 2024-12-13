"use client";

import {
  ArrowsOut,
  Pause,
  Play,
  Screencast,
  SpeakerHigh,
  SpeakerX,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

const GoPaddiVideo = () => {
  const video = useRef(null);
  const progressSlider = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // @ts-ignore
      video.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    console.log(video);
  });

  return (
    <>
      <div className="timeline-video relative h-[410px] w-[100%] ">
        <video
          className="h-full w-full"
          ref={video}
          onTimeUpdate={() => {
            const time =
              // @ts-ignore
              (video.current?.currentTime / video.current.duration) * 100;

            // @ts-ignore
            progressSlider.current.value = time;
          }}
        >
          <source
            src="https://videos.pexels.com/video-files/6247699/6247699-hd_1920_1080_24fps.mp4"
            type="video/mp4"
          ></source>
        </video>
        {/* video player controls */}
        <div className="control absolute bottom-0 left-0 right-0 w-full flex items-center p-1 bg-[#2D2D2DCC] text-white gap-2">
          <button
            id="playPauseBtn"
            className="flex items-center"
          >
            {isPaused ? (
              <Play
                size={18}
                weight="fill"
                onClick={() => {
                  setIsPaused(false);
                  // @ts-ignore
                  video.current?.play();
                }}
              />
            ) : (
              <Pause
                size={18}
                weight="fill"
                onClick={() => {
                  setIsPaused(true);
                  // @ts-ignore
                  video.current?.pause();
                }}
              />
            )}
          </button>
          <input
            type="range"
            id="progressSlider"
            ref={progressSlider}
            min="0"
            max="100"
            value="0"
            className="flex-auto"
            onInput={() => {
              const newTime =
                // @ts-ignore
                (progressSlider.current?.value * video.current?.duration) / 100;
              // @ts-ignore
              video.current.currentTime = newTime;
            }}
          />
          <button
            id="muteBtn"
            onClick={() => {
              setIsMuted(!isMuted);
              // @ts-ignore
              video.current.muted = !video.current?.muted;
            }}
          >
            {isMuted ? (
              <SpeakerX
                size={18}
                weight="fill"
              />
            ) : (
              <SpeakerHigh
                size={18}
                weight="fill"
              />
            )}
          </button>
          <button
            id="fullScreenBtn"
            onClick={() => toggleFullscreen()}
          >
            <ArrowsOut
              size={18}
              weight="fill"
            />
          </button>
          <button>
            <Screencast
              size={18}
              weight="fill"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default GoPaddiVideo;
