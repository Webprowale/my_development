import { Transfer } from "../../assets/svg/transfer";

const WalletModal = ({ title, text, children }: { title: string; text: string; children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="relative">
        <div className="absolute flex items-center justify-center h-[80px] mt w-[78px] bg-[#E7F0FF]">
          <Transfer />
        </div>
        <img src="/assets/modal-lines.svg" alt="Horizontal Line Icon" />

        <img
          className="absolute top-0 w-full h-fit z-[-1]"
          src="/assets/modal-lines.svg"
          alt="modal-lines"
        />
      </div>

      <div className="mt-5">
        <p className="font-bold text-lg">{title}</p>
        <p className="text-gray-400 text-sm w-[250px] font-thin">{text}</p>
        {children}
      </div>
    </div>
  );
};

export default WalletModal;
