import CardLayout from "./card-layout";

function HotelCard() {
  return (
    <CardLayout>
      <div className="w-full flex p-4">
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
            src="/assets/hotelscard.png"
            alt="hotel image"
            width={230}
            height={224}
          />
        </div>

        <div className="w-full h-full flex flex-col justify-between px-2 py-1 gap-2 divide-y divide-neutral-400">
          <div className="flex md:flex-row flex-col justify-between items-start">
            <div className="space-y-2 md:w-2/4">
              <p className="text-lg 2xl:text-xl font-semibold">
                Riviera Resort, Lekki
              </p>
              <p className="font-medium text-text-black-primary">
                18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way,
                Lekki Phase1
              </p>
              <div className="flex gap-1.5">
                <img src="/assets/mappin.svg" alt="map pin icon" />
                <span className="text-primary-600">Show in map</span>

                <img src="/assets/star.svg" alt="star icon" />
                <span className="text-text-black-secondary1">8.5 (436)</span>

                <img src="/assets/bed.svg" alt="bed icon" />
                <span>King size room</span>
              </div>
            </div>

            <div className="flex flex-col justify-end items-end gap-1 text-text-black-primary">
              <p className="font-semibold text-2xl">
                <span className="font-normal">&#8358;</span> 123, 450.00
              </p>
              <p className="font-medium">Total Price: NGN 560,000</p>
              <p className="font-medium">1 room &times; 10nights incl. taxes</p>
            </div>
          </div>

          <div className="text-text-black-secondary1 md:flex hidden justify-between pt-2">
            <div className="flex w-full gap-2">
              <span>Facilities:&nbsp;</span>

              <img src="/assets/swimmingpool.svg" alt="swimming pool icon" />
              <span>Pool&nbsp;</span>

              <img src="/assets/wine.svg" alt="wine icon" />
              <span>Bar</span>
            </div>

            <div className="flex justify-end items-end w-full gap-2">
              <img src="/assets/calendarblank-1.svg" alt="calendar icon" />
              <span>Check In: 20-04-2024&nbsp;</span>

              <img src="/assets/calendarblank-1.svg" alt="calendar icon" />
              <span>Check In: 20-04-2024</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 font-medium">
            <div className="flex gap-6">
              <button className="text-primary-600">Hotel details</button>
              <button className="text-primary-600">Price Details</button>
            </div>

            <button className="text-primary-600">Edit details</button>
          </div>
        </div>
      </div>
    </CardLayout>
  );
}

export default HotelCard;
