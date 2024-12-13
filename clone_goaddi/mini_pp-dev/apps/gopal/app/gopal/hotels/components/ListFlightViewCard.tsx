import GoButton from "@/components/goui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/post-carousel";
import { IoIosArrowForward } from "react-icons/io";
import { TiHeartOutline } from "react-icons/ti";
import { RiMapPinLine } from "react-icons/ri";

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

const ListFlightView = ({
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
  return (
    <div
      className="flex items-start w-[100%] bg-white py-[1.5rem] pl-[1.5rem] rounded-[4px]"
      // style={{'border':'1px solid red'}}
    >
      <Carousel className="w-[233px] h-full ">
        <CarouselContent className="h-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <img
                src={"/assets/hotel.png"}
                alt=""
                className=" h-full max-h-full w-full"
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

      <div>
        {/* first row contianing heanding and show map */}
        <div className="flex items-start justify-between px-[1rem] mb-[1.5rem]">
          <div className="w-[60%]">
            <h2 className="text-[1.25rem] font-[700] ">
              Riviera Resort, Lekki
            </h2>
            <p className="text-[.9rem] font-[500] ">
              18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki
              Phase1
            </p>
          </div>
          <div className="w-[35%] flex flex-wrap items-center gap-[.5rem] self-center	">
            <p className="justify-right text-primary600 font-[600] text-[1rem] flex items-center gap-[0.5rem]">
              <RiMapPinLine />
              <span>show in map</span>
            </p>
            <p>
              <span className="flex gap-[0.338rem]">
                <img
                  src="/assets/Star.svg"
                  alt=""
                />
                <span className="">4.0</span>
              </span>
            </p>
          </div>
        </div>

        <div className="flex border-t-[1px] border-b-[1px] border-[#E4E7EC] py-[1rem] px-[1rem]">
          <p className="mr-[1rem] text-[#647995] font-[500] text-[1rem]">
            Facilities:
          </p>
          <p className="mr-[1rem] text-[#647995] font-[500] text-[1rem]">
            Pool
          </p>
          <p className="mr-[1rem] text-[#647995] font-[500] text-[1rem]">Bar</p>
        </div>
        <div>
          <GoButton className="py-[0.5rem] w-[165px] block ml-auto mt-[1rem] mr-[1.5rem]">
            View
          </GoButton>
        </div>
      </div>
    </div>
  );
};

export default ListFlightView;
