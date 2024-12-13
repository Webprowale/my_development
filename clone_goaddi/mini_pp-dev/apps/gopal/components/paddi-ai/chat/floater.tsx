"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import useItems from "./useItems";
import "./style.css";
import Popup from "./Popup";
import { storeQuestionsAndAnswers, useSendMessage } from "./chat.hook";
import axios from "axios";
import {
  sendPaddiLocation,
  sendPaddiMessage,
} from "@/axios/endpoints/paddiai.endpoint";

function Floater() {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { itemCount, addItem } = useItems();

  const handlepopup = () => {
    setShow((prev) => !prev);
    setIsHovered(false);
  };

  const [chat, setChat] = useState(false);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  function getSessionId() {
    return JSON.stringify(Date.now().toString());
  }

  const sendMessageHook = useSendMessage();

  function handleSubmit(question: string) {
    sendMessageHook.mutate(question, "paddi", (resp) => onSubmitSuccess(resp));
  }

  function onSubmitSuccess(resp: string): void {}

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.latitude);

        if (position.coords.latitude && position.coords.latitude) {
          try {
            const response = await axios.post(
              "https://vgtechdemo.com/gopaddiberlin/gopaddiberlinbkend/web/travelhistory/get_location_info",
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
            console.log("we now have our location");
            console.log(response.data);

            let text = `my locations is ${response.data.city},latitude=${position.coords.latitude}, longitude=${position.coords.longitude}`;

            console.log("text", text);

            handleSubmit(text);
            console.log("your locations is alread sent");

            // const previousMessage = localStorage.getItem("previousMessage");
            // localStorage.setItem("previousMessage", text);
          } catch (error) {
            console.error("Error fetching our location:", error);
          }
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      },
    );
  }, []);

  return (
    <>
      {chat ? (
        <Popup show={chat} onClose={() => setChat(false)} />
      ) : (
        <div className="fixed bottom-10 right-6 ">
          <div className="relative">
            {show && (
              <div className="absolute z-[9999999999] -left-[22rem] bottom-0 pr-20">
                <div className="grid gap-6">
                  <div
                    className="floater-popup relative !bg-white w-auto shadow-md rounded-2xl  p-1"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span className="floater-popup-right-top absolute -top-10 -right-20 w-52 h-52 rounded-full"></span>
                    <span className="floater-popup-left-bottom absolute -bottom-10 -left-20 w-40 h-40 rounded-full"></span>
                    {isHovered && (
                      <span
                        className="rounded-full text-lg px-2 text-blue-600 bg-white absolute -top-2 right-1 z-10 cursor-pointer"
                        onClick={handlepopup}
                      >
                        &times;
                      </span>
                    )}

                    <div className="p-6 w-auto text-left overflow-hidden">
                      <p className="floater-text-gradient font-bold text-3xl my-2">
                        Howdy Tommy,
                      </p>
                      <p className="font-bold text-2xl mb-4">
                        I&apos;m your Paddi
                      </p>
                      <p className="text-[16px] font-[500] w-full">
                        I can plan your next trip ✈️
                      </p>
                      <p className="text-[16px] font-[500] w-full">
                        Answer visa-related queries 🎫
                      </p>
                      <p className="text-[16px] font-[500] text-nowrap mb-2 ">
                        Give college recommendations 🎓
                      </p>
                      <p className=" text-[1rem] text-gray-500">
                        And much more!
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end mr-5">
                    {itemCount > 0 ? (
                      <div className=" w-fit px-6 py-4 text-white font-semibold rounded-2xl bg-gradient-to-l from-[#F8B15A] to-[#E086EE] ">
                        You have 2 unread messages 🔔
                      </div>
                    ) : (
                      <div
                        onClick={() => setChat(true)}
                        className="widget-floater-description w-fit px-6 cursor-pointer py-4 text-white font-semibold rounded-2xl"
                      >
                        Ask me anything..💡
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Image
              src="/assets/gopaddi/chat-icon.png"
              alt="chat icon"
              width={50}
              height={50}
              quality={100}
              onClick={handlepopup}
              onMouseEnter={handlepopup}
              className=" z-20"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Floater;
