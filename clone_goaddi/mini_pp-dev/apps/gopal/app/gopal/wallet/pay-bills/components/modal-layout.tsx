import { SetStateAction, useEffect } from "react";
import Modal from "@/components/goui/modal";
import MobileAirtime from "../mobile-airtime";

const ModalLayout = ({
  isOpen,
  setIsOpen,
  children,
  dir,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  dir: string;
}) => {
  useEffect(() => {
    if (!isOpen) {
      window.location.href = `/gopal/wallet/pay-bills/${dir}`;
    }
  }, [isOpen, dir]);

  return (
    <>
      {/* <MobileAirtime /> */}
      <Modal
        className="w-[600px] max-h-[640px] bg-white overflow-y-scroll flex flex-col gap-2"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={<p></p>}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalLayout;
