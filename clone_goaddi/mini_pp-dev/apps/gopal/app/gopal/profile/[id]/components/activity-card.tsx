import CardLayout from "./card-layout";

function ActivityCard() {
  return (
    <CardLayout>
      <div className="w-full flex items-center p-4">
        <div className="hidden md:block relative">
          <img
            src="/assets/caretcircleright.svg"
            alt="caret circle icon"
            className="absolute left-2 top-1/2 -translate-y-1/2"
          />
          <img
            src="/assets/caretcircleright-1.svg"
            alt="caret circle icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          />
          <img
            src="/assets/rectangle-3437@2x.png"
            alt="hotel image"
            width={230}
            height={224}
          />
        </div>

        <div className="w-full h-full flex flex-col justify-between px-2 py-1 gap-2 divide-neutral-400 divide-y">
          <div className="flex md:flex-row flex-col justify-between items-start">
            <div className="md:w-[55%] space-y-1.5">
              <p className="text-lg 2xl:text-xl font-semibold">
                The Museum of Modern Art
              </p>
              <p className="font-medium text-text-black-primary">
                Works from Van Gogh to Warhol & beyond plus a sculpture garden,
                2 cafes & The modern restaurant
              </p>
              <div className="flex gap-1.5">
                <img src="/assets/mappin.svg" alt="map pin icon" />
                <span className="text-primary-600 font-medium">Directions</span>

                <img src="/assets/star.svg" alt="star icon" />
                <span className="text-text-black-secondary1">4.5 (436)</span>

                <img src="/assets/clock.svg" alt="bed icon" />
                <span className="text-text-black-secondary1">1 Hour</span>
              </div>
            </div>
            <div className="text-text-black-primary flex flex-col justify-center items-end">
              <p className="font-semibold text-2xl">&#8358; 123, 450.00</p>
              <p className="font-medium">10:30 AM on Mar 19</p>
            </div>
          </div>

          <div className="text-text-black-secondary1 flex md:flex-row flex-col justify-between items-start pt-2">
            <div className="flex md:flex-row flex-col w-full gap-2">
              <span>What&#39;s Included:&nbsp;</span>

              <span>Admission to the Empire State Building&nbsp;</span>

              <a href="#" className="text-primary-600">
                See more
              </a>
            </div>

            <div className="flex md:flex-row flex-col justify-end items-center w-1/4 gap-2">
              <button className="bg-midnightblue text-white py-1 px-2 h-fit rounded">
                Day 1
              </button>
              <div className="md:grid flex gap-2">
                <img
                  src="/assets/caretcircleup.svg"
                  alt="caret circle up icon"
                />
                <img
                  src="/assets/caretcircledown.svg"
                  alt="caret circle down icon"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 font-medium">
            <div className="flex gap-6">
              <button className="text-primary-600">Activity details</button>
              <button className="text-primary-600">Price Details</button>
            </div>

            <button className="text-primary-600">Edit details</button>
          </div>
        </div>
      </div>
    </CardLayout>
  );
}

export default ActivityCard;
