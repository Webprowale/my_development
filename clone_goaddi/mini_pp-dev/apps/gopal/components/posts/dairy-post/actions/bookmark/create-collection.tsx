"use client";

import { SetStateAction, useEffect } from "react";
import Modal from "@/components/goui/modal";
import { useRouter } from "next/navigation";

const CreateCollectionModal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
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
        className="bg-white flex flex-col gap-2"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={<p></p>}
      >
        {children}
      </Modal>
    </>
  );
};

export default CreateCollectionModal;
