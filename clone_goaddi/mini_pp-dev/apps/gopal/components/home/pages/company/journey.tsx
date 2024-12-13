import React from "react";

type Props = {};

const CompanyJourney = (props: Props) => {
  return (
    <div className="relative bg-primary700 h-full">
      <img
        src="/assets/landing/road.svg"
        alt=""
        className="w-screen h-fit absolute top-[-4px]"
      />

      <div className="bg-primary700 p-4 pt-[290px] pb-[200px]">
        {/* <p className="text-center text-sm text-white">Company History</p> */}
        <h2 className="text-4xl text-center text-white font-bold mb-12">
          Our journey so far
        </h2>
        <div className="flex flex-col grid-cols-9 p-2 mx-auto md:grid">
          <div className="flex md:contents">
            <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
              <div className="flex items-center justify-center w-6 h-full">
                <div className="w-1 h-full bg-indigo-300"></div>
              </div>
              <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
            </div>
            <div className="relative p-4  text-white col-start-6 col-end-10 mr-auto">
              <p className="mt-2 leading-6 max-w-md w-full">
                The idea for GoPaddi was conceived in 2020 by a team of travel
                enthusiasts who had grown bored of the characteristic tedium of
                travel processing. We envisioned a world where travel would be
                simpler, more accessible, and seamless. At the time, GoPaddi had
                been initially named MyExplore.
              </p>
            </div>
          </div>

          <div className="flex md:contents flex-row-reverse">
            <div className="relative p-4 my-6 col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto">
              <p className="mt-2 text-white leading-6 max-w-md w-full">
                We kickstarted the first stage of development that same year,
                very quickly expanding our team to get more skilled hands on
                board. GoPaddi has, since then, undergone dizzying changes in
                the hands of these fantastic individuals, its entire feel,
                design, and scope revamped. It was during this time that the
                solution was first divided along three lines: GoBusiness, GoPal,
                and GoFamily.
              </p>
            </div>
            <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
              <div className="flex items-center justify-center w-6 h-full">
                <div className="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300"></div>
              </div>
              <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
            </div>
          </div>

          <div className="flex md:contents">
            <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
              <div className="flex items-center justify-center w-6 h-full">
                <div className="w-1 h-full bg-indigo-300"></div>
              </div>
              <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
            </div>
            <div className="relative rounded-xl col-start-6 col-end-10 mr-auto">
              <p className="text-white max-w-md w-full mt-2 mb-14 leading-6 pb-6">
                In 2023, the vision expanded with the introduction of GoAgent,
                which essentially transformed the solution into an ecosystem
                where travel agencies from all over can sell. The chief aim of
                this was to level the playing ground for smaller agencies and
                break the monopoly of big players, ultimately making traveling
                easier for people by giving them options to choose from.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2 leading-6 max-w-md mx-auto text-center text-white w-full">
          GoPaddi is constantly being built, with new features scheduled for
          launch as time goes on. We have our eyes set on the world: our
          ultimate goal is to see the whole world using what we have built, not
          just a particular region. We want every traveler to see GoPaddi as
          their go-to app for beautiful, lasting travel memories.
        </p>
      </div>
    </div>
  );
};

export default CompanyJourney;
