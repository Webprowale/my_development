"use client";
// components/AudioTrimmer.js
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useWavesurfer } from "@wavesurfer/react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";

const random = (min, max) => Math.random() * (max - min) + min;

const MiniAudioPreview = ({
  url,
  //   onPlayPause,
  isPlaying,
}: {
  url: string;
  //   onPlayPause: () => void;
  isPlaying: boolean;
}) => {
  const containerRef = useRef(null);
  const [loop, setLoop] = useState(true);

  const { wavesurfer } = useWavesurfer({
    container: containerRef,
    height: 10,
    waveColor: "rgb(240, 242, 245)",
    progressColor: "rgb(0, 34, 176)",
    url: url,
    // Set a bar width
    barWidth: 4,
    // autoScroll: true,
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
    plugins: useMemo(
      () => [
        Timeline.create({
          height: 1,
          style: {
            color: "#2D5B88",
          },
        }),
      ],
      [],
    ),
  });

  useEffect(() => {
    if (wavesurfer) {
      const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create());

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
    }

    return () => {
      if (wavesurfer) {
        wavesurfer.destroy();
      }
    };
  }, [wavesurfer]);

  const onPlay = useCallback(() => {
    wavesurfer && wavesurfer.play();
  }, [wavesurfer]);

  const onPause = useCallback(() => {
    wavesurfer && wavesurfer.pause();
  }, [wavesurfer]);

  useEffect(() => {
    if (isPlaying) {
      onPlay();
    } else {
      onPause();
    }
  }, [isPlaying, onPlay, onPause]);

  return (
    <div
      ref={containerRef}
      className="z-10 h-10 w-full py-1 overflow-x-hidden"
      id="waveform"
    />
  );
};

export default MiniAudioPreview;
