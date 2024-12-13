import { ReactElement } from "react";

export const WalletButton = ({
  onClick,
  icon,
  text,
}: {
  onClick: () => void;
  icon: ReactElement;
  text: string;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center space-x-1 border h-[38px] text-primary600 text-xs w-full py-1 font-bold rounded border-primary600"
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};
