import { Button } from "@/components/ui/button";
import { LinkBreak, X } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";

const Unlink = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="w-full md:w-[72%] p-6 flex flex-col md:flex-row items-start gap-10">
        <div className="flex flex-col gap-1 w-full md:w-[70%]">
          <h2 className="font-bold text-2xl text=[#1D2433] mb-1">
            Unlink from This Business?
          </h2>
          <p className="text-[#676E7E] text-sm">
            If you unlink yourself from Nova Astral Space Alliance, you’ll lose
            access to all information and services associated with this
            business. And you will be open to receive an invite from another
            business on GoPaddi.
          </p>
          <Button
            variant="default"
            className="text-red-600 hover:text-red-600 bg-red-100 hover:bg-red-200 rounded flex items-center gap-1 text-sm w-full md:w-max px-6 mt-8"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <LinkBreak size={15} />
            <span>Unlink</span>
          </Button>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={"/assets/gobusiness/unlink-img.svg"}
            width={332}
            height={300}
            alt="unlink image"
          />
        </div>
      </section>

      {isModalOpen && <UnlinkModal close={setIsModalOpen} />}
    </>
  );
};

const UnlinkModal = ({ close }: { close: (data: boolean) => void }) => {
  return (
    <div className="request grid place-items-end md:place-items-center fixed inset-0 w-full h-screen bg-[#00000089] backdrop-blur-sm z-[99]">
      <div className="request-container bg-white w-full md:w-[30%] p-6 rounded animate-scaleUp">
        <header className="relative z-10 mb-8">
          <Image
            src={`/assets/gobusiness/modal-unlink.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Unlink?</h3>
          <p className="text-sm text-[#647995] w-full md:w-[80%] leading-normal">
            Heads up! You are about to unlink yourself from this business.
          </p>
          <X
            size={24}
            weight="bold"
            className="absolute right-0 top-[10px] cursor-pointer"
            onClick={() => {
              close(false);
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            className="bg-primary100 text-primary600 rounded w-full py-5 hover:bg-primary200"
            onClick={() => {
              close(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-600 text-white rounded w-full py-5 hover:bg-red-700"
            variant="default"
          >
            Unlink
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unlink;
