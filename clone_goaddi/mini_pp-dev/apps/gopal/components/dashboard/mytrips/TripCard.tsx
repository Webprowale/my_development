import Link from "next/link";
import TripItem from "./TripItem";
import { ITripItemType } from "@/interfaces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tripDetails = [
  {
    image: "/assets/post-2.png",
    tripTitle: "Trip to Paris",
    location: "Paris, France",
    date: "February 15, 2024",
  },
  {
    image: "/assets/post-2.png",
    tripTitle: "Summer Vaction in Italy",
    location: "Paris, France",
    date: "February 15, 2024",
  },
  {
    image: "/assets/post-2.png",
    tripTitle: "Getaway to the montains",
    location: "Paris, France",
    date: "February 15, 2024",
  },
  {
    image: "/assets/post-2.png",
    tripTitle:
      "Getaway to the montains in the middle of the night with the people that I love",
    location: "Paris, France",
    date: "February 15, 2024",
  },
  {
    image: "/assets/post-2.png",
    tripTitle:
      "Getaway to the montains in the middle of the night with the people that I love",
    location: "Paris, France",
    date: "February 15, 2024",
  },
  {
    image: "/assets/post-2.png",
    tripTitle:
      "Getaway to the montains in the middle of the night with the people that I love",
    location: "Paris, France",
    date: "February 15, 2024",
  },
];

const TripCard = () => {
  return (
    <div className="trip-overview bg-white p-6 h-full rounded">
      <header className="flex items-center justify-between mb-6">
        <div className="left-header">
          <h2 className="font-medium">My Trips Overview</h2>
        </div>
        <div className="right-header hidden md:block">
          <Link
            href={"#"}
            className="inline-block text-[14px] rounded py-2 px-8 bg-primary600 hover:bg-primary700 ease duration-150 text-white"
          >
            See All
          </Link>
        </div>
      </header>

      {/* Trip list */}

      <div className="trip-overview__main">
        <Tabs
          defaultValue="account"
          className="w-[100%]"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="account">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="password">Saved Trips</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="trip-overview__list grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripDetails?.map((trip: ITripItemType, index: number) => (
                <TripItem
                  key={index}
                  image={trip.image}
                  tripTitle={trip.tripTitle}
                  location={trip.location}
                  date={trip.date}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="trip-overview__list grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripDetails?.map((trip: ITripItemType, index: number) => (
                <TripItem
                  key={index}
                  image={trip.image}
                  tripTitle={trip.tripTitle}
                  location={trip.location}
                  date={trip.date}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripCard;
