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
            <span className="text-primary600 cursor-pointer">My Application</span> page
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-12">
        <button className="flex bg-primary600 py-2 px-4 rounded text-white font-thin text-sm">
          Track Inquiry Status
        </button>
        <button
          onClick={() => router.push("/gopal/visa")}
          className="bg-primary200 text-primary600 py-2 px-4 font-thin text-sm rounded"
        >
          Explore Other Visas
        </button>
      </div>
    </div>
  );
};

export default ResponseMsg;
