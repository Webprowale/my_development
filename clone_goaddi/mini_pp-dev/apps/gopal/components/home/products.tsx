"use client";
import React from "react";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import GoButton from "../goui/button";
import { AspectRatio } from "../ui/aspect-ratio";
import Explore from "./explore";

type Props = {};

const Products = (props: Props) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className="relative z-[1] bg-white overflow-hidden">
      <div className="h-full mx-auto max-w-[1470px]">
        <div className="flex flex-col justify-start gap-y-2 py-12 items-start">
          <p className="text-sm text-gray-600 font-medium ">Products</p>
          <h3 className="text-4xl font-extrabold inline-flex justify-center gap-y-1 items-center flex-col text-gray-950">
            Our Products
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-x-5 items-center place-items-center ">
          <ProductCard
            title="GoPal"
            img="gopal"
            desc="Connect with fellow travelers."
          />
          <ProductCard
            title="GoFamily"
            img="gofamily"
            desc="Plan family getaways."
          />
          <ProductCard
            title="GoBusiness"
            img="gobusiness"
            desc="Buy travel. Sell travel."
          />
        </div>
      </div>
      <motion.div
        style={{
          backgroundColor: "red",
          position: "relative",
          marginTop: "100px",
          height,
        }}
      >
        <div
          style={{
            height: "800%",
            width: "120%",
            left: "-10%",
            borderRadius: "0 0 50% 50%",
            backgroundColor: "white",
            zIndex: 10,
            overflowX: "hidden",
            position: "absolute",
            boxShadow: "0px 60px 50px rgba(0, 0, 0, 0.30)",
          }}
        ></div>
      </motion.div>

      <Explore />
    </div>
  );
};

export default Products;

const ProductCard = ({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img: string;
}) => {
  return (
    <div className="border w-full border-gray-200 rounded-sm">
      <div className="p-4">
        <AspectRatio ratio={8 / 7} className="bg-primary200 rounded-sm">
          {/* <div className="bg-primary200 rounded-sm p-2.5"></div> */}
          <Image src={`/assets/landing/products/${img}.jpg`} fill alt="" />
        </AspectRatio>

        <div className="text-primary600 text-lg font-semibold pb-1 mt-4">
          {title}
        </div>
        <div className="text-gray-700 font-medium  pb-2">{desc}</div>
        <GoButton className="w-full py-3 rounded-sm bg-primary200  text-primary600 hover:text-white hover:bg-primary600 border-primary200 hover:border-primary600">
          Learn More
        </GoButton>
      </div>
    </div>
  );
};
