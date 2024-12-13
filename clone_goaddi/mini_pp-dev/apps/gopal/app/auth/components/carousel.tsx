//@ts-nocheck
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Bounce from "@/animations/bounce";
import Autoplay from "embla-carousel-autoplay";
import TranstitionChildren from "@/animations/transitionChildren";
import Motion from "./motion";
import { HorizontalAnim } from "@/animations/horizontalAnim";
import Marquee from "react-fast-marquee";
import Curve from "@/animations/curve";
import Scale from "@/animations/scale";
import Float from "@/animations/float";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

type Props = {};

const AuthImageCarousel = (props: Props) => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
      className="w-full sticky top-0 h-screen"
    >
      <CarouselContent className="">
        <CarouselItem className="pl-4 h-screen bg-primary700">
          <WelcomeAirplane />
        </CarouselItem>
        <CarouselItem className="pl-4 h-screen bg-primary100">
          <Bounce>
            <motion.img
              src="/assets/auth-1.png"
              className="max-w-[420px] mx-auto"
              alt=""
            />
          </Bounce>
        </CarouselItem>
        <CarouselItem className="pl-4 h-screen bg-primary700">
          <SocialHands />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default AuthImageCarousel;

export const WelcomeAirplane = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* AirPlane */}
      <Float className="absolute right-0 top-[17%]">
        <motion.img
          src="/assets/airplane.png"
          alt=""
          className="max-w-lg"
        />
      </Float>
      {/* Clouds */}
      <Marquee className="h-[140px] absolute -top-10 ">
        <motion.img
          src="/assets/clouds/cloud-3.png"
          alt=""
          className="object-cover w-[62.92px] h-[6.91px]"
        />
        <motion.img
          src="/assets/clouds/cloud-2.png"
          alt=""
          className="translate-y-12  w-[146.51px] h-[32.18px]"
        />
        <motion.img
          src="/assets/clouds/cloud-1.png"
          alt=""
          className="translate-y-7 h-2 object-cover"
        />
        <motion.img
          src="/assets/clouds/cloud-3.png"
          alt=""
          className="object-cover w-[62.92px] h-[6.91px]"
        />
        <motion.img
          src="/assets/clouds/cloud-2.png"
          alt=""
          className="translate-y-12  w-[146.51px] h-[32.18px]"
        />
        <motion.img
          src="/assets/clouds/cloud-1.png"
          alt=""
          className="translate-y-7 h-2 object-cover"
        />
        <motion.img
          src="/assets/clouds/cloud-3.png"
          alt=""
          className="object-cover w-[62.92px] h-[6.91px]"
        />
        <motion.img
          src="/assets/clouds/cloud-2.png"
          alt=""
          className="translate-y-12  w-[146.51px] h-[32.18px]"
        />
        <motion.img
          src="/assets/clouds/cloud-1.png"
          alt=""
          className="translate-y-7 h-2 object-cover"
        />
      </Marquee>
      {/* Buildings & Ocean */}
      <Marquee
        speed={23}
        className=" h-full absolute bottom-28"
      >
        <div className="absolute bottom-0 flex flex-col w-[55vw]">
          <motion.img
            src="/assets/buildings.png"
            className=""
          />
          <motion.img
            src="/assets/water.png"
            className=""
          />
        </div>
      </Marquee>
      {/* Welcome Text */}
      <div className="absolute left-10 bottom-[30%] z-30">
        <WelcomeText />
      </div>
      {/* Aiplane Sound */}
      <AirplaneSound />
    </div>
  );
};

export const SocialHands = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden text-white">
      <TranstitionChildren className="justify-center mt-20 text-center max-w-xl mx-auto">
        <Motion>{""}</Motion>
        <Motion>
          <h2 className="font-bold text-3xl">
            GoPaddi - Where travel meets social
          </h2>
        </Motion>
        <Motion>
          <p className="text-center text-base font-normal mt-2">
            Share travel tips, recommendations, and stories. Find travel buddies
            with similar interests; post stunning travel photos and videos;
            document your experiences, and inspire others. Browse through other
            travelers&apos; journeys and unearth hidden gems.
          </p>
        </Motion>
      </TranstitionChildren>

      <div className="absolute bottom-0 w-full">
        {/* Hand 1 */}
        <div className="flex gap-10 items-end justify-center w-full">
          <div className="relative">
            <Curve
              rotateFrom={60}
              yTo={5}
              className="w-[230px]"
            >
              <Float
                yFrom={0}
                xFrom={5}
                yTo={5}
              >
                <motion.img
                  src="/assets/social/hand-2.png"
                  className="w-[230px]"
                />
              </Float>
            </Curve>
            <Scale
              delay={1.3}
              className="absolute left-16 top-7 "
            >
              <motion.div className="w-3 h-3 bg-white rounded-full" />
            </Scale>
            <Scale
              delay={1.5}
              className="absolute left-12 top-32"
            >
              <motion.div className=" w-4 h-4 bg-white rounded-full" />
            </Scale>
            <Scale
              delay={1.7}
              className="absolute top-3 right-0"
            >
              <motion.div className=" w-1 h-1 bg-white rounded-full" />
            </Scale>
            <Scale
              delay={1.9}
              className="absolute top-52 right-6"
            >
              <motion.div className=" w-2 h-2 bg-white rounded-full" />
            </Scale>
            <Scale
              delay={2.1}
              className="absolute top-[275px] right-16"
            >
              <motion.div className="w-[6px] h-[5px] bg-white rounded-full" />
            </Scale>
          </div>

          {/* Hand 2 */}
          <div className="relative">
            <Curve
              yTo={5}
              className="w-[210px]"
            >
              <Float
                yFrom={5}
                xTo={5}
                yTo={0}
              >
                <motion.img
                  src="/assets/social/hand-1.png"
                  className="w-[210px]"
                />
              </Float>
            </Curve>
            <Scale
              delay={1.3}
              className="absolute -top-5 left-0"
            >
              <motion.img
                src="/assets/social/goodie-love.png"
                className="w-5 h-6"
                alt="Love Chat"
              />
            </Scale>
            <Scale
              delay={1.6}
              className="absolute top-[165px] -left-2"
            >
              <motion.img
                src="/assets/social/goodie-like.png"
                alt="Like Chat"
                className=" w-6 h-[26px] "
              />
            </Scale>
            <Scale
              delay={1.9}
              className="absolute right-10 top-0"
            >
              <motion.img
                src="/assets/social/goodie-share.png"
                alt="Share Chat"
                className=" w-6 h-[26px]"
              />
            </Scale>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WelcomeText = () => {
  return (
    <TranstitionChildren
      stagger={0.4}
      className="text-white max-w-md"
    >
      <Motion>
        <h2 className="text-3xl font-bold">Welcome to GoPaddi!</h2>
      </Motion>
      <Motion>
        <p className="pt-4 text-sm">
          Welcome to GoPaddi, your one-stop shop for unforgettable travel
          experiences! Dive into curated getaways, explore hidden gems, and
          unlock exclusive deals. Let&apos;s turn your travel dreams into
          memories that last a lifetime. Explore with us!{" "}
        </p>
      </Motion>
    </TranstitionChildren>
  );
};

export const AirplaneSound = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  let audio: HTMLAudioElement | null = null;

  const toggleMusic = () => {
    if (!isMusicPlaying) {
      audio?.play();
    } else {
      audio?.pause();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="absolute bottom-5 right-5 z-30">
      <audio
        ref={(element) => (audio = element)}
        src="/assets/sound/plane-sound.mp3"
        className=""
      />

      <button
        onClick={toggleMusic}
        className="bg-white rounded-sm p-1.5 shadow-sm hover:scale-105 transition-all"
      >
        {isMusicPlaying ? (
          <SpeakerHigh
            weight="bold"
            className="text-2xl text-primary600 animate-pulse"
          />
        ) : (
          <SpeakerSlash
            weight="bold"
            className="text-2xl text-primary600"
          />
        )}
      </button>
    </div>
  );
};
