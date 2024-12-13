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
import { Pause, Play } from "@phosphor-icons/react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

const random = (min, max) => Math.random() * (max - min) + min;
const randomColor = () =>
  `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

const AudioTrimmer = () => {
  const containerRef = useRef(null);
  const [loop, setLoop] = useState(true);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 70,
    waveColor: "rgb(86, 154, 254, 1)",
    progressColor: "rgb(0, 84, 228,1)",
    url: "https://testing-live-env.s3.af-south-1.amazonaws.com/public/audio/audio_6674265753300_1718888023.mp3",
    // Set a bar width
    barWidth: 4,
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

  return (
    <div className="max-w-[600px] w-full mx-auto">
      <div className="grid place-content-center place-items-center items-center grid-cols-3 w-full">
        <div>resize</div>

        <button className="" onClick={onPlayPause} style={{ minWidth: "5em" }}>
          {isPlaying ? (
            <Pause size={14} className="text-gray-600" />
          ) : (
            <Play size={14} className="text-gray-600" />
          )}
        </button>

        <div>
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
      <div
        ref={containerRef}
        className="bg-primary700 rounded-sm "
        id="waveform"
      />

      {/* <p>
        📖{" "}
        <a href="https://wavesurfer.xyz/docs/classes/plugins_regions.RegionsPlugin">
          Regions plugin docs
        </a>
      </p> */}
    </div>
  );
};

export default AudioTrimmer;
