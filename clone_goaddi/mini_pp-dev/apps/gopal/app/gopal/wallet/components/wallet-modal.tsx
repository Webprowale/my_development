const WalletModal = ({
  icon,
  title,
  text,
  children,
}: {
  icon: React.JSX.Element;
  title: string;
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white overflow-y-auto">
      <div className="relative">
        <div className="absolute flex items-center justify-center h-[80px]  w-[78px] bg-[#E7F0FF]">
          {icon}
        </div>
        <img
          className="absolute top-0 w-full"
          src="/assets/modal-lines.svg"
          alt="modal-lines"
        />
        <div className="mt-8">
          {/* <p className="font-bold text-lg">{title}</p> */}
          <p className="text-gray-600 text-sm font-thin w-[250px]">{text}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default WalletModal;
