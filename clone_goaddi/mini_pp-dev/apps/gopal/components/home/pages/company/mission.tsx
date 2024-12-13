import React from "react";

type Props = {};

const CompanyMission = (props: Props) => {
  return (
    <div className="bg-white h-full w-full pb-[300px]">
      <div className=" max-w-[1400px] mx-auto ">
        <div className="flex justify-between w-full pt-10">
          <div className="flex flex-col justify-start gap-y-2 items-start">
            <p className="text-base text-black font-normal ">
              Making a difference
            </p>
            <h3 className="text-4xl font-extrabold inline-flex justify-center gap-y-1 mt-2 mb-4 items-center flex-col text-black">
              Our Mission
            </h3>

            <p className="text-base font-medium max-w-2xl w-full">
              Traveling the world is easy when you have all you need to do so at
              your disposal. Our mission is to provide everything you need in
              one place. We have built a solution that simplifies every step of
              the journey and guarantees a hitch-free travel experience. From
              booking flights, hotels, and activities to creating personalized
              travel plans for yourself and family, to getting expert and timely
              advice, GoPaddi takes care of all of that and more. On GoPaddi,
              through GoPal, you can connect with other travelers and share
              experiences—it’s social media, but for travelers.
            </p>
          </div>
          <div className="max-w-[600px] w-full text-center">
            <img
              src="/assets/landing/ay.jpg"
              className="h-[450px] object-cover  w-full rounded-sm"
              alt=""
            />

            <h4 className="text-black text-2xl font-semibold mt-2">
              Ayo Alaba Idowu
            </h4>

            <p className="text-primary600 text-lg font-medium">
              CEO / CO-FOUNDER
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyMission;
