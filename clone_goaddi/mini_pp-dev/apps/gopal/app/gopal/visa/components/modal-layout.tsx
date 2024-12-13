"use client";

import { SetStateAction, useEffect } from "react";
import Modal from "@/components/goui/modal";
import { useRouter } from "next/navigation";

const ModalLayout = ({
  isOpen,
  setIsOpen,
  children,
  closeModalRoute,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  closeModalRoute: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  // useEffect(() => {
  //   if (!isOpen) {
  //     router.push(closeModalRoute);
  //   }
  // }, [isOpen]);

  return (
    <>
      <Modal
        className="w-[80%] md:w-[520px] overscroll-y-none overflow-auto max-h-[500px] no-scrollbar bg-white flex flex-col gap-2"
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
