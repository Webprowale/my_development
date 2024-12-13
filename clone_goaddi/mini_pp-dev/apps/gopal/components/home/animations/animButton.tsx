//@ts-nocheck

import React from "react";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import Magnetic from "./magnetic";

export default function AnimButton({
  children,
  backgroundColor = "#00004A",
  ...attributes
}) {
  const circle = useRef(null);
  let timeline = useRef(null);
  let timeoutId = null;
  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter",
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit",
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  return (
    <Magnetic>
      <div
        className="relative rounded-full  border border-gray-400 cursor-pointer flex items-center justify-center py-4 px-16"
        style={{ overflow: "hidden" }}
        onMouseEnter={() => {
          manageMouseEnter();
        }}
        onMouseLeave={() => {
          manageMouseLeave();
        }}
        {...attributes}
      >
        {children}
        {/* <div
          className="overflow-hidden"
          ref={circle}
          style={{
            width: "100%",
            height: "150%",
            position: "absolute",
            borderRadius: "50%",
            top: "100%",
            backgroundColor,
          }}
        ></div> */}
      </div>
    </Magnetic>
  );
}
