import React, { useRef, useState, useCallback, useEffect } from "react";

const Video = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playOrPause = useCallback(() => {
    if (videoRef.current?.paused || videoRef.current?.ended) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, []);

  const onPlay = useCallback(() => setIsPlaying(true), []);

  const onPause = useCallback(() => setIsPlaying(false), []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when at least 50% of the video is in view
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If the video is in view, play it
          videoRef.current?.play();
        } else {
          // If the video is not in view, pause it
          videoRef.current?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="video-wrapper">
      <video
        onPlay={onPlay}
        onPause={onPause}
        ref={videoRef}
        className="video"
        src={src}
        autoPlay={false} // Disable autoplay to control it with Intersection Observer
        loop
        // muted // Optional: mute the video if needed
      />
      <div className="controls" onClick={playOrPause}>
        <img
          src="/assets/play.png"
          alt="play button"
          className={`video-control ${
            isPlaying ? "control-hidden" : "control-shown"
          }`}
        />
      </div>
    </div>
  );
};

export default Video;
