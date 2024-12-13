"use client";
import InfiniteMovingCardss from "@/animations/infiniteMovingCards";
import { AspectRatio } from "../ui/aspect-ratio";
import React from "react";
import Marquee from "react-fast-marquee";

type Props = {};

const Explore = (props: Props) => {
  return (
    <div className="bg-primary700 pt-28">
      <div className="mx-auto max-w-[1470px] h-full text-white ">
        <div className="flex flex-col justify-start gap-y-2 py-12 items-start">
          <p className="text-sm text-white font-normal ">
            Here's what your travelers says
          </p>
          <h3 className="text-4xl font-extrabold inline-flex justify-center gap-y-1 items-center flex-col text-gray-50">
            Explore the world with us
          </h3>
        </div>

        {/* <div className="grid grid-cols-3 gap-x-20 items-center place-items-center">
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
        </div> */}
        <Marquee
          pauseOnHover={true}
          gradient={true}
          gradientColor="#0054E4"
          className=""
        >
          <InfiniteMovingCardsDemo />
        </Marquee>
        <div className="max-w-[800px] mx-auto py-16">
          <img src="/assets/landing/map.svg" className=" w-fit h-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Explore;

const ExploreCard = () => {
  return (
    <div className="bg-primary600 rounded-sm w-full">
      <AspectRatio ratio={8 / 7} className="bg-primary200 rounded-sm">
        <div className="bg-primary200 rounded-sm p-2.5 "></div>
      </AspectRatio>
    </div>
  );
};

const InfiniteMovingCardsDemo = () => {
  return (
    <div className="antialiased relative overflow-hidden ">
      <InfiniteMovingCardss
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
};

const testimonials = [
  {
    quote:
      "GoPaddi has completely transformed the way I travel! It's like having a personal travel agent in my pocket. From planning my dream honeymoon to finding hidden gems in a new city, GoPaddi has been there every step of the way.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
    image: "/assets/avatar-2.png",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
    image: "/assets/avatar-3.png",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
    image: "/assets/avatar-4.png",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
    image: "/assets/avatar-6.png",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
    image: "/assets/avatar-7.png",
  },
];
