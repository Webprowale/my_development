import GoButton from "@/components/goui/button";
import React from "react";

type Props = {};

const ProductsHero = (props: Props) => {
  return (
    <div className="pt-32">
      <div className="relative text-white bg-primary700 py-20 rounded-md h-full w-full mx-auto max-w-[1470px]">
        <div className="flex flex-col max-w-4xl mx-auto w-full justify-center items-center">
          <p className="text-sm text-white">Go beyond the ordinary</p>
          <h2 className="text-3xl text-center font-extrabold text-white my-6">
            With GoPal's individual plan, you can create your own adventures and
            fuel your love of travel! Make memories that will last a lifetime.
          </h2>
          <GoButton className="px-20 py-2.5 rounded-sm mb-20">
            Get Started
          </GoButton>
        </div>

        <img
          src="/assets/landing/gopal/cosmos.svg"
          alt=""
          className="w-64 h-fit object-cover z-[1] rotate-90  left-28 top-6 absolute bottom-0"
        />
        <img
          src="/assets/landing/gopal/cosmos.svg"
          alt=""
          className="w-64 h-fit object-cover z-[1] right-28 top-6 absolute bottom-0"
        />
        <img
          src="/assets/landing/gopal/star.svg"
          alt=""
          className="w-2 h-fit object-cover z-[1] left-10 top-12 absolute bottom-0"
        />
        <img
          src="/assets/landing/gopal/star.svg"
          alt=""
          className="w-2 h-fit object-cover z-[1] right-10 top-12 absolute bottom-0"
        />
        <img
          src="/assets/landing/gopal/star.svg"
          alt=""
          className="w-2 h-fit object-cover z-[1] right-16 top-20 absolute bottom-0"
        />
        <img
          src="/assets/landing/gopal/star.svg"
          alt=""
          className="w-2 h-fit object-cover z-[1] right-40 top-36 absolute bottom-0"
        />
        <img
          src="/assets/landing/gopal/star.svg"
          alt=""
          className="w-2 h-fit object-cover z-[1] left-36 top-24 absolute bottom-0"
        />
        <img
          src="/assets/landing/gopal/star.svg"
          alt=""
          className="w-2 h-fit object-cover z-[1] left-64 top-36 absolute bottom-0"
        />
        <img
          src="/assets/landing/gopal/star.svg"
          alt=""
          className="w-2 h-fit object-cover z-[1] left-20 top-40 absolute bottom-0"
        />
        <img
          src="/assets/landing/gopal/star.svg"
          alt=""
          className="w-2 h-fit object-cover z-[1] absolute bottom-0"
        />
        <img
          src="/assets/landing/gopal/clouds.svg"
          alt=""
          className="w-full h-fit object-cover z-[1] absolute bottom-0"
        />
      </div>
    </div>
  );
};

export default ProductsHero;
