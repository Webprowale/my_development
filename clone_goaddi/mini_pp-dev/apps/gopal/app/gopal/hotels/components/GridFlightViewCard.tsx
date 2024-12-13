import GoButton from "@/components/goui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/post-carousel";
import Link from "next/link";

type Props = {
  hotelId: string;
  name: string;
  rating: string;
  image: string;
  location: string;
  productId: string;
  price: string | number;
  session: string;
  token: string;
  searchId: string | number;
  nights: string | number;
  rooms: string | number;
};

const GridFlightViewCard = ({
  hotelId,
  rating,
  image,
  location,
  productId,
  name,
  price,
  session,
  token,
  nights,
  rooms,
  searchId,
}: Props) => {
  const detailUrl = `/gopal/hotels/details/${hotelId}?sid=${searchId}&sessionId=${session}&rooms=${rooms}&nights=${nights}&token=${token}&pid=${productId}&hid=${hotelId}`;
  return (
    <div className="w-full">
      <div className="bg-white hotel-gallery relative self-center ">
        <Carousel className="w-full h-full ">
          <CarouselContent className="h-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <img
                  src={image || "/assets/hotel.png"}
                  alt=""
                  className="min-h-[250px] h-full max-h-[250px] w-full object-cover object-center aspect-square"
                  loading="lazy"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex absolute bottom-5 left-0 right-0 justify-center ">
            <div className="flex md:gap-8 gap-8 bg-white/20 backdrop-blur-md px-2 py-px rounded-sm">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </Carousel>
        <div className="border-b-[1px] border-[#E4E7EC]  p-[.8rem]">
          <div className="">
            <h2 className="text-lg font-bold capitalize">
              {name || "Riviera Resort, Lekki"}
            </h2>
            <p className="text-[.8rem] font-[500] text-[#676E7E]">
              18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki
              Phase1
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center p-[.5rem]">
          <p>
            <span className="flex gap-[0.338rem]">
              <img
                src="/assets/Star.svg"
                alt=""
              ></img>
              <span className="">{rating || "4.0"}</span>
            </span>
          </p>
          <Link
            href={detailUrl}
            className="py-[0.5rem] px-[2rem] bg-primary600 hover:bg-primary700 text-sm rounded text-white"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GridFlightViewCard;
