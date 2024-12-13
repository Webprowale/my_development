"use client";
// components/AudioTrimmer.js
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useWavesurfer } from "@wavesurfer/react";
import {
  Pause,
  Play,
  SpeakerSimpleHigh,
  SpeakerSimpleSlash,
  Trash,
} from "@phosphor-icons/react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";

const random = (min, max) => Math.random() * (max - min) + min;
const randomColor = () =>
  `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

const formatTime = (seconds) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

const AudioPreview = ({
  musicTitle,
  url,
}: {
  musicTitle: string;
  url: string;
}) => {
  const containerRef = useRef(null);
  const [muted, setMuted] = useState(false);

  const [loop, setLoop] = useState(true);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 35,
    waveColor: "rgb(86, 154, 254, 1)",
    progressColor: "rgb(0, 34, 176)",
    url: url,
    // Set a bar width
    barWidth: 4,
    autoScroll: true,
    // minPxPerSec: 100,
    // Optionally, specify the spacing between bars
    barGap: 0,
    // And the bar radius
    barRadius: 20,
    // fillParent: false,
    // backend: "WebAudio",
    // plugins: useMemo(
    //   () => [
    //     RegionsPlugin.create({
    //       dragSelection: {
    //         color: "rgba(255, 0, 0, 0.1)",
    //       },
    //     }),
    //   ],
    //   [],
    // ),
    plugins: useMemo(() => [Timeline.create()], []),
  });

  //   const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create());

  useEffect(() => {
    if (wavesurfer) {
      const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create());
      wavesurfer.on("decode", () => {
        // Create regions
        wsRegions.addRegion({
          start: 0,
          end: 30,
          // content: "Resize me",
          color: randomColor(),
          drag: false,
          resize: true,
        });
        // wsRegions.addRegion({
        //   start: 9,
        //   end: 10,
        //   content: "Cramped region",
        //   color: randomColor(),
        //   minLength: 1,
        //   maxLength: 10,
        // });
      });

      wsRegions.on("region-updated", (region) => {
        console.log("Updated region", region);
      });

      let activeRegion = null;
      wsRegions.on("region-in", (region) => {
        console.log("region-in", region);
        activeRegion = region;
      });
      wsRegions.on("region-out", (region) => {
        console.log("region-out", region);
        if (activeRegion === region) {
          if (loop) {
            region.play();
          } else {
            activeRegion = null;
          }
        }
      });
      wsRegions.on("region-clicked", (region, e) => {
        e.stopPropagation(); // prevent triggering a click on the waveform
        activeRegion = region;
        region.play();
        region.setOptions({
          color: randomColor(),
          start: 0,
        });
      });
      wavesurfer.on("interaction", () => {
        activeRegion = null;
      });
    }

    return () => {
      if (wavesurfer) {
        wavesurfer.destroy();
      }
    };
  }, [wavesurfer, loop]);

  const handleLoopChange = () => {
    setLoop((prevLoop) => !prevLoop);
  };

  const handleZoomChange = (e) => {
    const minPxPerSec = Number(e.target.value);
    wavesurfer.zoom(minPxPerSec);
  };

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);
  const onMute = useCallback(
    (mute: boolean) => {
      wavesurfer && wavesurfer.setMuted(mute);
      setMuted(mute);
    },
    [wavesurfer],
  );

  return (
    <div className="max-w-[800px] mx-auto w-full">
      <div className="grid   items-center grid-cols-3 w-full py-2 ">
        <div className="">
          <div className="flex items-center gap-x-3">
            <button className="" onClick={() => onMute(!muted)}>
              {muted ? (
                <SpeakerSimpleSlash
                  size={18}
                  weight="bold"
                  className="text-gray-600"
                />
              ) : (
                <SpeakerSimpleHigh
                  weight="bold"
                  size={18}
                  className="text-gray-600"
                />
              )}
            </button>
            <div className="h-6 w-[1px] bg-gray-300 rounded-sm" />
            <button className="flex items-center">
              <Trash size={18} weight="bold" className="text-gray-600" />
            </button>
          </div>
        </div>

        <button
          className="flex items-center gap-x-1 place-self-center place-items-center"
          onClick={onPlayPause}
          style={{ minWidth: "5em" }}
        >
          {isPlaying ? (
            <Pause size={16} weight="fill" className="text-gray-600" />
          ) : (
            <Play size={16} weight="fill" className="text-gray-600" />
          )}
          <span className="text-sm">{formatTime(currentTime)}</span>
        </button>

        <div className="place-items-end place-self-end">
          <p>
            <input
              type="range"
              min="10"
              max="1000"
              defaultValue="10"
              onInput={handleZoomChange}
            />
          </p>
        </div>
      </div>
      <div className="overflow-x-hidden flex gap-y-2 flex-col bg-primary700 rounded-sm  w-full py-2 justify-center items-start">
        <div className="text-nowrap text-[12px] break bg-gray-50/20 py-1 px-2 ml-4 rounded-md text-white">
          {musicTitle}
        </div>
        <div
          ref={containerRef}
          className="z-10 w-full pb-1 overflow-x-hidden"
          id="waveform"
        />
      </div>

      {/* <p>
        📖{" "}
        <a href="https://wavesurfer.xyz/docs/classes/plugins_regions.RegionsPlugin">
          Regions plugin docs
        </a>
      </p> */}
    </div>
  );
};

export default AudioPreview;
