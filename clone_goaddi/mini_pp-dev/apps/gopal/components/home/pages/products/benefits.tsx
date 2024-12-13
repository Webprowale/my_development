import React from "react";

type Props = {};

const ProductBenefit = (props: Props) => {
  return (
    <div className="w-full pt-14">
      <div className="flex flex-col justify-center gap-y-3 py-12 items-center">
        <p className="text-sm text-gray-600 font-medium ">Benefits</p>
        <h3 className="text-4xl font-extrabold inline-flex justify-center gap-y-1 items-center flex-col text-gray-950">
          Why use GoPal
        </h3>
      </div>

      <div className="grid grid-cols-2 space-x-8 gap-y-10 w-full max-w-[1470px] mx-auto">
        {benefits.map((benefit, index) => {
          const { title, desc, image } = benefit;
          return (
            <div
              key={index}
              className="flex flex-col justify-between  min-h-[600px] h-full  bg-[#F7F9FC] rounded-sm px-8 pt-10"
            >
              <div className="">
                <h2 className="text-3xl font-bold text-black">{title}</h2>
                <p className="text-gray-700 text-base mt-3 mb-6 py-2">{desc}</p>
              </div>
              <div className="flex justify-center items-center w-full h-full">
                <img
                  src={`/assets/landing/gopal/benefits/${image}.svg`}
                  className="w-fit "
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductBenefit;

const benefits = [
  {
    title: "Your Story, Your Way, Your Community",
    desc: `Connect with fellow adventurers, share travel stories and photos,
            and find inspiration for your next trip. GoPaddi fosters a vibrant
            online community where you can learn from others and create lasting
            travel memories.`,
    image: "1",
  },

  {
    title: "Be Your Own Travel Agent",
    desc: `Take control of your travels - plan, book, and personalize your experiences from the comfort of your home.`,
    image: "2",
  },
  {
    title: "Wallet and More",
    desc: `Store, manage, and use your funds effortlessly. Enjoy convenience, security, and peace of mind on the go with your GoWallet.`,
    image: "3",
  },
  {
    title: "Earn Commissions for Life",
    desc: `Invite others, earn GoPoints, enjoy lifelong commissions on your purchases and those of your referrals. With GoPaddi, your journey never ends.`,
    image: "4",
  },
  {
    title: "Trip Planner",
    desc: `Craft your dream itinerary, research destinations, find flights & hotels, build a day-by-day schedule, visualize your entire trip, and easily adjust plans. Collaborate with friends, share itinerary, and split payments - all within GoPaddi!`,
    image: "5",
  },
  {
    title: "Paddi AI",
    desc: `GoPaddi helps travelers with AI and human support. AI answers travel questions and a concierge helps plan trips, book, and solve problems.`,
    image: "6",
  },
];
