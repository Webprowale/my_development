import Modal from "@/components/goui/modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDown, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";

function History() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClicked, setClicked] = useState<boolean>(false);

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white w-full pt-3 pb-10">
      <div className="flex mx-2 flex-col">
        <div className="flex justify-between mb-2">
          <h3 className="text-[20px] font-[700]">Chat history</h3>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="!bg-white !text-primary500 flex gap-1 border border-primary600">
                  <Trash size={20} />
                  <span>Delete</span>
                  <CaretDown size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-[100] p-4">
                <DropdownMenuCheckboxItem
                  className="hover:bg-[#F3F7FF] hover:text-[#0D6EFD]"
                  onClick={() => {
                    setClicked(true);
                  }}
                >
                  Last Hour
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className="hover:bg-[#F3F7FF] hover:text-[#0D6EFD]"
                  onClick={() => {
                    setClicked(true);
                  }}
                >
                  Today
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className="hover:bg-[#F3F7FF] hover:text-[#0D6EFD]"
                  onClick={() => {
                    setClicked(true);
                  }}
                >
                  Yesterday
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className="hover:bg-[#F3F7FF] hover:text-[#0D6EFD]"
                  onClick={() => {
                    setClicked(true);
                  }}
                >
                  All Time
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="flex justify-between hover:bg-[#F3F7FF] hover:text-[#0D6EFD]">
                  <span>Custom Range</span>
                  <span>
                    <CaretDown size={16} color="#0D6EFD" />
                  </span>
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {isClicked && (
          <div className="absolute top-[55%] w-[85%] bg-white flex flex-col items-center justify-center rounded-md z-40 py-4 px-3 mx-8  shadow-lg">
            <div className="flex flex-col text-center justify-center px-12">
              <h5 className=" font-bold ">
                Confirm you would like to delete this chat from history.
              </h5>
              <p className="text-[14px]">
                You will not be able to undo this action
              </p>
              <div className="px-12 space-y-2 flex flex-col mt-4">
                <button className="bg-[#FBEAE9] border-none outline-none w-full text-[14px] p-3 text-[#9E0A05]">
                  Delete
                </button>
                <button
                  className="bg-[#E7F0FF] border-none outline-none  w-full text-[14px] p-3 text-[#0D6EFD]"
                  onClick={() => {
                    setClicked(false);
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <form className="flex items-center space-x-3 p-4 bg-[#F0F2F5]  shadow-md">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              name="search"
              id="search"
              className="w-full pl-10 pr-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </form>
        <div className="today flex flex-col mx-3">
          <h5 className="text-[16px] pb-2 border-b font-[500] mt-4 mb-3">
            Today
          </h5>
          <div className="col flex flex-col p-2">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/gopaddi/Layer_1.svg"
                  width={20}
                  height={20}
                  alt="icon"
                />
                <p>Paddi</p>
              </div>

              <Trash
                size={20}
                color="#98A2B3"
                onClick={() => {
                  setClicked(true);
                }}
              />
            </div>
            <p>
              <span className="text-gray-500">You prompted</span>: I need a
              round trip flight from Lagos to Paris on May 6th. I will be
              traveling alone.
            </p>
            <div className="flex space-x-2">
              <p className="text-gray-500">7:15AM</p>
              <span>|</span>
              <p className="text-[#0D6EFD]">Details</p>
            </div>
          </div>
          <div className="col flex flex-col p-2">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/gopaddi/Layer_1.svg"
                  width={20}
                  height={20}
                  alt="icon"
                />
                <p>Paddi</p>
              </div>
              <Trash
                size={20}
                color="#98A2B3"
                onClick={() => {
                  setClicked(true);
                }}
              />
            </div>
            <p>
              <span className="text-gray-500">You prompted</span>: I need a
              round trip flight from Lagos to Paris on May 6th. I will be
              traveling alone.
            </p>
            <div className="flex space-x-2">
              <p className="text-gray-500">7:15AM</p>
              <span>|</span>
              <p className="text-[#0D6EFD]">Details</p>
            </div>
          </div>
        </div>
        <div className="today flex flex-col mx-3">
          <h5 className="text-[16px] pb-2 border-b font-[500] mt-4 mb-3">
            Yesterday
          </h5>
          <div className="col flex flex-col p-2">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/gopaddi/Ellipse_777.svg"
                  width={20}
                  height={20}
                  alt="icon"
                />
                <p>Paddi</p>
              </div>
              <Trash
                size={20}
                color="#98A2B3"
                onClick={() => {
                  setClicked(true);
                }}
              />
            </div>
            <p>
              <span className="text-gray-500">You prompted</span>: I need a
              round trip flight from Lagos to Paris on May 6th. I will be
              traveling alone.
            </p>
            <div className="flex space-x-2">
              <p className="text-gray-500">7:15AM</p>
              <span>|</span>
              <p className="text-[#0D6EFD]">Details</p>
            </div>
          </div>
          <div className="col flex flex-col p-2">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/gopaddi/Layer_1.svg"
                  width={20}
                  height={20}
                  alt="icon"
                />
                <p>Paddi</p>
              </div>
              <Trash
                size={20}
                color="#98A2B3"
                onClick={() => {
                  setClicked(true);
                }}
              />
            </div>
            <p>
              <span className="text-gray-500">You prompted</span>: I need a
              round trip flight from Lagos to Paris on May 6th. I will be
              traveling alone.
            </p>
            <div className="flex space-x-2">
              <p className="text-gray-500">7:15AM</p>
              <span>|</span>
              <p className="text-[#0D6EFD]">Details</p>
            </div>
          </div>
        </div>
        <div className="today flex flex-col mx-3">
          <h5 className="text-[16px] pb-2 border-b font-[500] mt-4 mb-3">
            17 April 2024
          </h5>
          <div className="col flex flex-col p-2">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/gopaddi/Layer_1.svg"
                  width={20}
                  height={20}
                  alt="icon"
                />
                <p>Paddi</p>
              </div>
              <Trash size={20} color="#98A2B3" />
            </div>
            <p>
              <span className="text-gray-500">You prompted</span>: I need a
              round trip flight from Lagos to Paris on May 6th. I will be
              traveling alone.
            </p>
            <div className="flex space-x-2">
              <p className="text-gray-500">7:15AM</p>
              <span>|</span>
              <p className="text-[#0D6EFD]">Details</p>
            </div>
          </div>
          <div className="col flex flex-col p-2">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/gopaddi/Layer_1.svg"
                  width={20}
                  height={20}
                  alt="icon"
                />
                <p>Paddi</p>
              </div>
              <Trash
                size={20}
                color="#98A2B3"
                onClick={() => {
                  setClicked(true);
                }}
              />
            </div>
            <p>
              <span className="text-gray-500">You prompted</span>: I need a
              round trip flight from Lagos to Paris on May 6th. I will be
              traveling alone.
            </p>
            <div className="flex space-x-2">
              <p className="text-gray-500">7:15AM</p>
              <span>|</span>
              <p className="text-[#0D6EFD]">Details</p>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal
        isOpen={isModalOpen}
        onClose={onClose}
        trigger={<button></button>}
        className="my-modal sm:max-w-[600px]"
        left={false}
      >
        Hello Everyone
      </Modal> */}
    </div>
  );
}

export default History;
