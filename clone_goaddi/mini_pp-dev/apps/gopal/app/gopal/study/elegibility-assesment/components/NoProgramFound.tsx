import { Cancel } from "@/app/gopal/wallet/assets/svg/cancel";

const NoProgramFound = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="bg-white">
      <div className="relative">
        <div className="absolute flex items-center justify-center h-[80px] mt w-[78px] bg-[#FEF4E6]">
          <Cancel />
        </div>
        <img
          className="absolute top-0 w-full"
          src="/assets/modal-lines.svg"
          alt="modal-lines"
        />
      </div>

      <div className="mt-24">
        <p className="font-bold text-lg">Oops!</p>
        <p className="text-gray-400 text-sm w-full font-thin">
          We couldn't find any academic programs for you.
        </p>
      </div>

      <div className="flex space-x-3 mt-10">
        <button
          onClick={closeModal}
          className="text-white text-xs bg-primary600 px-6 py-2 rounded"
        >
          Retake Assessment
        </button>
        <button className="text-xs text-primary600 bg-primary100 px-6 py-2 rounded">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default NoProgramFound;
