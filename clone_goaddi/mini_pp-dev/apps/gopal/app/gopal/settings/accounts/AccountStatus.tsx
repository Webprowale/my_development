"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";

const AccountStatus = () => {
  const [isDeactivate, setIsDeactivate] = useState(true);

  const closeDeactivateModal = () => {
    setIsDeactivate(false);
  };
  return (
    <>
      <section className="flex flex-col gap-6 mb-5">
        <div className="">
          <div className="device border-b border-b-[#E4E7EC] px-6 py-10 last-of-type:border-none">
            <div className="device-container w-full md:w-[70%] flex items-center justify-between ">
              <div className="device-details md:w-[65%]">
                <h3 className="font-medium text-base mb-2">
                  Deactivate Account
                </h3>
                <p className="text-[#676E7E] text-sm flex items-center gap-2">
                  Deactivate your account to hide your profile from everyone on
                  GoPaddi.
                </p>
              </div>
              <Button
                variant={"secondary"}
                className={`w-[20%] bg-[#FBEAE9] text-[#9E0A05] hover:bg-[#ffdad8] font-medium text-xs px-10 py-2 rounded`}
                onClick={() => {
                  setIsDeactivate(true);
                }}
              >
                Deactivate
              </Button>
            </div>
          </div>
          <div className="device border-b border-b-[#E4E7EC] px-6 py-10 last-of-type:border-none">
            <div className="device-container w-full md:w-[70%] flex items-center justify-between ">
              <div className="device-details md:w-[60%]">
                <h3 className="font-medium text-base mb-2">
                  Delete Your Account
                </h3>
                <p className="text-[#676E7E] text-sm flex items-center gap-2">
                  This will permanently erase all your data and content.
                </p>
              </div>
              <Button
                variant={"secondary"}
                className={`w-[20%] bg-[#FBEAE9] text-[#9E0A05] hover:bg-[#ffdad8] hover font-medium text-xs px-10 py-2 rounded`}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </section>

      {isDeactivate && <DeactivateAccount close={closeDeactivateModal} />}
    </>
  );
};

// Deactivate account
const DeactivateAccount = ({ close }: { close: () => void }) => {
  // close modal
  const closeModal = () => {
    close();
  };

  return (
    <div className="grid place-items-center fixed inset-0 w-full h-screen backdrop-blur-sm bg-[#00000089] z-50">
      <div className="text-message__modal bg-white w-full md:w-[40%] p-6 rounded animate-scaleUp">
        <header className="relative z-10 mb-4">
          <Image
            src={`/assets/modal-deactivate.svg`}
            width={80}
            height={80}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Deactivate account</h3>
          <p className="text-sm text-[#647995] w-full md:w-[80%]">
            Deactivate your account to hide your profile from everyone on
            GoPaddi.
          </p>
          <X
            size={22}
            weight="bold"
            className="absolute right-0 top-[10px] cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        {/* name */}
        <div className="name flex items-center gap-2 mt-8 mb-6">
          <Avatar className="w-[64px] h-[64px]">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="">
            <h3 className="font-semibold">Jane Doe</h3>
            <p>@janedoe</p>
          </div>
        </div>

        {/* Note */}
        <div className="text-[#865503] text-xs bg-[#FEF6E7] p-4 rounded leading-relaxed">
          Deactivating your account means no one will see your profile. You will
          be immediately logged out. However, you can reactivate your account
          anytime on GoPaddi by simply logging in with{" "}
          <span className="font-bold underline">janedoe@gmail.com</span>
        </div>

        <div className="flex justify-end mt-12">
          <Button
            variant={"secondary"}
            className={`w-[20%] bg-[#FBEAE9] font-semibold text-[#9E0A05] hover:bg-[#ffdad8] hover  text-xs px-10 py-2 rounded`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const DeleteAccount = ({ close }: { close: () => void }) => {
  // close modal
  const closeModal = () => {
    close();
  };

  return (
    <div className="grid place-items-center fixed inset-0 w-full h-screen backdrop-blur-sm bg-[#00000089] z-50">
      <div className="text-message__modal bg-white w-full md:w-[40%] p-6 rounded animate-scaleUp">
        <header className="relative z-10 mb-4">
          <Image
            src={`/assets/modal-deactivate.svg`}
            width={80}
            height={80}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Deactivate account</h3>
          <p className="text-sm text-[#647995] w-full md:w-[80%]">
            Deactivate your account to hide your profile from everyone on
            GoPaddi.
          </p>
          <X
            size={22}
            weight="bold"
            className="absolute right-0 top-[10px] cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        {/* name */}
        <div className="name flex items-center gap-2 mt-8 mb-6">
          <Avatar className="w-[64px] h-[64px]">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="">
            <h3 className="font-semibold">Jane Doe</h3>
            <p>@janedoe</p>
          </div>
        </div>

        {/* Note */}
        <div className="text-[#865503] text-xs bg-[#FEF6E7] p-4 rounded leading-relaxed">
          Deactivating your account means no one will see your profile. You will
          be immediately logged out. However, you can reactivate your account
          anytime on GoPaddi by simply logging in with{" "}
          <span className="font-bold underline">janedoe@gmail.com</span>
        </div>

        <div className="flex justify-end mt-12">
          <Button
            variant={"secondary"}
            className={`w-[20%] bg-[#FBEAE9] font-semibold text-[#9E0A05] hover:bg-[#ffdad8] hover  text-xs px-10 py-2 rounded`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountStatus;
