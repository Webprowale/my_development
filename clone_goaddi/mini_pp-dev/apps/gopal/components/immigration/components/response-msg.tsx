import Image from "next/image";
import { useRouter } from "next/navigation";

const ResponseMsg = ({
  title,
  text,
  icon,
  spanText,
}: {
  text: string;
  icon: any;
  title: string;
  spanText: string;
}) => {
  const router = useRouter();

  return (
    <div className="bg-white">
      <div className="relative">
        <Image src={icon} alt="check alt" className="absolute" />
        <img src="/assets/modal-lines.svg" alt="Horizontal Line Icon" />
      </div>

      <div className="">
        <p className="font-bold text-lg">{title}</p>
        <div className="mt-1 space-y-5 text-gray-600">
          <div className="font-thin text-sm">
            <p>
              You are <span className="text-black">{spanText}</span> to apply
              for the Canada Study Visa.
            </p>
            <p>{`${text} within 1 - 2 business days.`}</p>
          </div>

          <p className="text-sm font-thin">
            You can track the status of your inquiry on{" "}
            <span className="text-primary600 cursor-pointer">
              My Application
            </span>{" "}
            page
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-2 mt-12">
        <button className="h-12 bg-primary600 rounded text-white font-thin text-sm w-full md:w-[45%] place-content-center">
          Track Inquiry Status
        </button>
        <button
          onClick={() => router.push("/gopal/immigration")}
          className="bg-primary200 h-12 text-primary600 font-thin text-sm rounded w-full"
        >
          Explore Other Immigration Packages
        </button>
      </div>
    </div>
  );
};

export default ResponseMsg;
