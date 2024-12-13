import React from "react";
import Chatinput from "./chatinput";

function Tumini() {
  return (
    <div className="bg-white overflow-y-auto  w-full h-full flex flex-col justify-between">
      <div className="flex flex-col pt-5">
        <div className="bg-[#F7F9FC] w-full p-5 mb-4">
          <div className="flex">
            <img
              src="/assets/gopaddi/c_icon.png"
              alt="icon"
              width={50}
              height={50}
            />
            <p className="ms-5">
              Hi Tommy, it’s Tumini. <br />
              How can I help?
            </p>
          </div>
        </div>
        <div className=" w-full p-5">
          <div className="flex items-center">
            <img
              src="/assets/gopaddi/avatar2.png"
              alt="icon"
              width={80}
              height={80}
            />
            <p className="ms-5">
              Hi Tumini, please I would like to change my email address. I lost
              access to the current one.
            </p>
          </div>
        </div>
      </div>
      <div className="" id="chat_input">
        <div className="border-t">
          <Chatinput
            value={""}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
            onSubmitSuccess={function (resp: string): void {
              throw new Error("Function not implemented.");
            }}
            sendMessageHook={undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default Tumini;
