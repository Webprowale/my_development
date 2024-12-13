import Image from "next/image";
import React, { useEffect, useState } from "react";
import Chatinput from "./chatinput";
import ChatScreen from "./chatScreen";
import Form from "./form";
import Tumini from "./tumini";
import Reps from "./reps";
import History from "./history";

import Typewriter from "./TypeWriter";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BellSlash,
  CaretDown,
  ClockCounterClockwise,
  Info,
  PencilLine,
  PlusSquare,
  SquaresFour,
  Trash,
  XCircle,
  X,
  Briefcase,
  EnvelopeSimpleOpen,
  PhoneCall,
} from "@phosphor-icons/react";
import {
  clearChatInLocalStorage,
  clearSuggestionsInLocalStorage,
  loadQuestionsFromLocalStorage,
  loadSuggestionsFromLocalStorage,
  questionsArray,
  suggestionArray,
  useSendMessage,
} from "./chat.hook";
import Link from "next/link";

const Popup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [managescreen, setSecreen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<string>("paddi");
  const [submenus, setMenus] = useState<string>("Your Paddi");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState(questionsArray);
  const [allSugestion, setAllSuggestion] = useState(suggestionArray);
  type ActiveSRelationship = "none" | "profile" | "relationship";
  const [activeState, setActiveState] = useState<ActiveSRelationship>("none");
  const [isother, setOther] = useState<boolean>(false);

  function reloadChat() {
    setChat(questionsArray);
    setAllSuggestion(suggestionArray);
  }

  const sendMessageHook = useSendMessage();

  const handlescreen = () => {
    setSecreen(true);
  };

  function clearChat() {
    clearChatInLocalStorage();
    clearSuggestionsInLocalStorage();

    setChat([]);
    setAllSuggestion([]);

    console.log(chat);
    console.log(allSugestion);
  }

  useEffect(() => {
    if (currentComponent === "tumini") {
      setMenus("Your Relationship manager");
    } else if (currentComponent === "reps") {
      setMenus("GoPaddi Rep");
    } else if (currentComponent === "history") {
      setMenus("");
    } else {
      setMenus("Your Paddi");
    }
  }, [currentComponent]);

  const renderComponent = () => {
    switch (currentComponent) {
      case "paddi":
        return (
          <ChatScreen
            c_question={question}
            chat={chat}
            suggestion={allSugestion}
            setChat={() => reloadChat()}
            sendMessageHook={sendMessageHook}
            onSubmitSuccess={function (resp: string): void {}}
          />
        );
      case "form":
        return <Form form={undefined} />;
      case "tumini":
        return <Tumini />;
      case "reps":
        return <Reps />;
      case "history":
        return <History />;
      default:
        return (
          <ChatScreen
            c_question={question}
            chat={chat}
            suggestion={suggestionArray}
            setChat={() => reloadChat()}
            sendMessageHook={sendMessageHook}
            onSubmitSuccess={function (resp: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        );
    }
  };
  if (!show) return null;
  const handleCompontent = (component: string) => {
    setSecreen(true);
    setCurrentComponent(component);
  };

  const words = ["Check your Canada eligibility", "I can plan your next trip"];

  useEffect(() => {
    setChat(loadQuestionsFromLocalStorage());
    setAllSuggestion(loadSuggestionsFromLocalStorage());
    console.log("Chat state updated:", chat);
    console.log("Suggestions state updated:", allSugestion);
  }, [sendMessageHook.isLoading]);

  return (
    <div className="fixed inset-0 w-full h-screen bg-black/60 z-[80]">
      <div className="fixed right-0 bottom-0 h-full bg-[#E7F0FF]  w-screen md:w-[30%] flex flex-col justify-start items-start overflow-x-hidden">
        <div className="w-full h-[60px] flex justify-between text-white mb-[-35px] items-center ">
          <div
            className="w-[68px] pt-6 h-[26px] flex text-[10px] ml-[12px] justify-start items-center cursor-pointer"
            onClick={onClose}
          >
            <span className="text-black text-[0.9rem]">X</span>
            <span className="text-black ml-1 text-[0.9rem]">Close</span>
          </div>

          <div className="mr-5 flex flex-col relative gap-[2.6px] justify-start items-end group pt-6 z-[2000]">
            <span className="w-[24px] h-[2.45px] rounded-[7px] bg-[blue] cursor-pointer" />
            <span className="w-[18px] h-[2.45px] rounded-[7px] bg-[blue] cursor-pointer" />
            <div className="absolute top-[12px] right-[-100vw]  transition-all ease-in-out duration-300 group-hover:right-[4px] rounded-[4px] p-[12px] bg-white w-[276px] h-auto">
              <ul>
                <li
                  className="flex my-3 mx-3 p-3 items-center   text-[#0D6EFD] bg-[#F3F7FF] cursor-pointer"
                  onClick={() => handleCompontent("history")}
                >
                  <ClockCounterClockwise
                    size={25}
                    color="#0D6EFD"
                    className="me-2"
                  />
                  See chat history
                </li>
                <li className="flex my-3 mx-3 p-3  items-center text-black hover:text-[#0D6EFD] hover:bg-[#F3F7FF] cursor-pointer">
                  <Info size={25} className="me-2" />
                  What is Paddi?
                </li>
                <li className="flex my-3 mx-3 p-3    items-center text-black hover:text-[#0D6EFD] hover:bg-[#F3F7FF] cursor-pointer">
                  <BellSlash size={25} className="me-2" />
                  Turn off sound
                </li>
              </ul>
            </div>
          </div>
        </div>
        {managescreen ? (
          <>
            <div className="tab w-full grid grid-cols-10 mx-3 mt-10 gap-5 pt-[20px] relative z-[50]">
              <button
                className={`col-span-3 flex items-center p-1 cursor-pointer ${currentComponent === "paddi" ? "bg-white" : ""} pl-2 py-2 rounded-t-sm justify-start`}
                onClick={() => handleCompontent("paddi")}
              >
                <Image
                  src="/assets/gopaddi/chat-icon.png"
                  alt="icon"
                  width={20}
                  height={10}
                />
                <p className="font-bold text-[11.5px]  ms-2 mb-1">Paddi</p>
              </button>
              <div
                className={`col-span-3 flex ${currentComponent === "tumini" ? "bg-white" : ""} items-center pl-2 py-2 cursor-pointer rounded-t-sm hover:bg-white justify-start`}
                onClick={() => handleCompontent("tumini")}
              >
                <Image
                  src="/assets/gopaddi/c_icon.png"
                  alt="icon"
                  width={20}
                  height={10}
                />
                <p className="font-bold text-[11.5px]  ms-2 mb-1">Tumini</p>
              </div>
              <div
                className={`col-span-4 flex items-start ${currentComponent === "reps" ? "bg-white" : ""} pl-2 py-2 w-5/6 cursor-pointer rounded-t-sm hover:bg-white justify-start`}
                onClick={() => handleCompontent("reps")}
              >
                <Image
                  src="/assets/gopaddi/need_icon.png"
                  alt="icon"
                  width={30}
                  height={10}
                />
                <p className="font-bold text-[11.5px] ms-1">GoPaddiReps</p>
              </div>
            </div>

            <div className="bg-white  w-full pb-5">
              <div className="flex justify-between mx-5 my-5">
                <div className="flex items-center group">
                  {submenus !== "" ? (
                    <>
                      <p className="font-semibold text-[12px] mr-2">
                        {submenus}
                      </p>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <CaretDown
                            size={14}
                            color="#0D6EFD"
                            weight="bold"
                            className="cursor-pointer"
                          />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56 p-3 z-[100]">
                          {submenus == "Your Relationship manager" ? (
                            <>
                              <DropdownMenuLabel
                                className="flex align-left items-start text-[#647995] hover:text-[#0D6EFD] hover:bg-[#F3F7FF]  gap-2 cursor-pointer"
                                onClick={() => setActiveState("profile")}
                              >
                                <Info size={24} weight="thin" />
                                See your profile
                              </DropdownMenuLabel>

                              <DropdownMenuLabel
                                className="flex align-left items-start text-[#647995] hover:text-[#0D6EFD] hover:bg-[#F3F7FF] gap-2 cursor-pointer"
                                onClick={() => setActiveState("relationship")}
                              >
                                <PencilLine size={24} weight="thin" />
                                Change Relationship Manager
                              </DropdownMenuLabel>

                              <DropdownMenuLabel className="flex align-left items-start text-[#c03535] hover:bg-[#F3F7FF] gap-2 cursor-pointer">
                                <XCircle size={24} weight="thin" />
                                End Chat
                              </DropdownMenuLabel>
                            </>
                          ) : (
                            <>
                              <DropdownMenuLabel className="flex align-left items-start text-[#0D6EFD] hover:bg-[#F3F7FF]  gap-2 cursor-pointer">
                                <Link
                                  href="/gopal/profile/524"
                                  className="flex items-center gap-2"
                                >
                                  <Info size={24} weight="thin" />
                                  See Profile
                                </Link>
                              </DropdownMenuLabel>

                              <DropdownMenuLabel
                                onClick={() => clearChat()}
                                className="flex align-left items-start text-[#c03535] hover:bg-[#F3F7FF] gap-2 cursor-pointer"
                              >
                                <Trash size={24} weight="thin" />
                                Clear this chat
                              </DropdownMenuLabel>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  ) : (
                    ""
                  )}

                  {/* PROFILE */}
                  {activeState === "profile" ? (
                    <div className="fixed bottom-0 right-3 left-[71%] z-10">
                      <div className="bg-white rounded-t-lg  p-4 shadow w-full">
                        <div className="flex justify-end mb-8 cursor-pointer">
                          <X
                            size={23}
                            color="#000000"
                            onClick={() => setActiveState("none")}
                          />
                        </div>
                        <div className="flex flex-col space-y-2 px-4 ">
                          <Image
                            src="/assets/paddi_ai/grp_9.svg"
                            width={50}
                            height={50}
                            alt="icon"
                          />
                          <h3 className="text-[#1D2433] text-[22px] font-bold">
                            Tumini Marcel
                          </h3>
                          <div className="flex">
                            <Briefcase size={20} color="#0D6EFD" />
                            <p className="text-[#1D2433] text-[16px]">
                              Travel Consultant
                            </p>
                          </div>
                          <div className="flex">
                            <EnvelopeSimpleOpen size={20} color="#0D6EFD" />
                            <p className="text-[#1D2433] text-[16px]">
                              mtumini@gopal.com
                            </p>
                          </div>
                          <div className="flex">
                            <PhoneCall size={20} color="#0D6EFD" />
                            <p className="text-[#1D2433] text-[16px]">
                              +2345533377464
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {activeState === "relationship" ? (
                    <div className="fixed bottom-0 right-3 left-[71%] z-10">
                      <div className="bg-white rounded-t-lg  p-4 shadow w-full">
                        <div className="flex justify-end mb-8 cursor-pointer">
                          <X
                            size={23}
                            color="#000000"
                            onClick={() => setActiveState("none")}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-[22px] font-bold text-[#1D2433]">
                            Change Relationship Manager
                          </h3>
                          <p className="text-[16px] font-medium">
                            Could you tell us why you want to change your
                            relationship manger?
                          </p>
                          <form>
                            <div className="space-y-2 pb-5">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  className="form-checkbox"
                                  name="role"
                                />
                                <span className="ml-2">I’d rather not say</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  className="form-checkbox"
                                  name="role"
                                />
                                <span className="ml-2">
                                  Response time is slow
                                </span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  className="form-checkbox"
                                  name="role"
                                />
                                <span className="ml-2">
                                  I need someone more experienced
                                </span>
                              </label>
                              <label className="flex items-center mb-3">
                                <input
                                  type="radio"
                                  className="form-checkbox"
                                  name="role"
                                  checked={isother}
                                  onChange={() => setOther(true)}
                                />
                                <span className="ml-2">Other</span>
                              </label>
                              {isother && (
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                                  placeholder="Please specify"
                                />
                              )}
                              <button
                                className="bg-[#0D6EFD] text-white text-[14px] w-full p-2"
                                type="submit"
                              >
                                Submit Change Request
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="relative inline-block group cursor-pointer"
                    onClick={() => setSecreen(false)}
                  >
                    <span className="flex items-center gap-1 bg-[#E7F0FF] px-4 py-2">
                      <SquaresFour size={20} color="#0D6EFD" weight="fill" />
                      <span className="text-[#0D6EFD] hidden group-hover:inline">
                        Home
                      </span>
                    </span>
                  </div>

                  {submenus == "Your Paddi" ? (
                    <div
                      className="relative inline-block group cursor-pointer"
                      onClick={() => clearChat()}
                    >
                      <span className="flex items-center gap-1 px-4 py-2 bg-[#0D6EFD] text-[#F9FAFB]">
                        <PlusSquare size={20} color="#fff" weight="fill" />
                        <span className="hidden group-hover:inline">
                          New Chat
                        </span>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            {renderComponent()}
          </>
        ) : (
          <>
            <div className="relative w-full h-[20rem] bg-[white]">
              <Image
                src="/assets/gopaddi/topImage.png"
                className="w-full h-[7rem] object-cover top-0 left-0"
                alt="chat icon"
                width={99999}
                height={9999}
              />
            </div>
            <div className="bg-white pb-2 w-full">
              <Image
                src="/assets/gopaddi/Group.svg"
                className="w-1/2"
                alt="chat icon"
                width={99999}
                height={9999}
              />
            </div>

            <div className="w-full bg-[white] h-full flex flex-col">
              <div className="w-full flex gap-[3px] flex-col justify-center items-center topimage">
                <div className="w-full gap-[8px] flex bg-[white] justify-center items-center">
                  <Image
                    src="/assets/gopaddi/Frame 229168.svg"
                    alt="chat icon"
                    width={200}
                    height={20}
                  />
                </div>
              </div>
              <div className="mt-[20px] w-full flex flex-col justify-start items-center">
                <span className="font-[500] text-[25px] gradient-text">
                  Howdy Tommy,
                </span>
                <span className="font-[500] text-[20px] text-[#676E7E] text-center">
                  <Typewriter words={words} />
                </span>
              </div>
              <div className="border-[1px] border-[#98A2B3] p-0 md:mx-10 my-2">
                <Chatinput
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onSubmitSuccess={(resp) => {
                    setQuestion("");
                    setChat([...chat, { question, answer: resp }]);
                    handlescreen();
                  }}
                  sendMessageHook={sendMessageHook}
                />
              </div>
            </div>
            <div className="downimage w-full h-[100%] bg-white pt-[1rem]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                <div className="relative inline-block">
                  <Image
                    src="/assets/gopaddi/Frame 229163.svg"
                    alt="input-icon"
                    className="sm:mx-1"
                    width={349}
                    height={52}
                    onClick={handlescreen}
                  />
                  <button
                    onClick={handlescreen}
                    className="absolute top-4 right-2 bg-[#0D6EFD] border border-white text-white w-8 h-8 flex items-center justify-center rounded-full"
                  >
                    2
                  </button>
                </div>
                <Image
                  src="/assets/gopaddi/Frame 229164.svg"
                  alt="input-icon"
                  className="sm:mx-1"
                  width={349}
                  height={52}
                  onClick={() => handleCompontent("reps")}
                />
              </div>
              <div className="rounded-lg p-3 border mx-4 border-[#0D6EFD]  mb-1 cursor-pointer">
                <div
                  className="flex items-center cursor-point"
                  onClick={handlescreen}
                >
                  <Image
                    src="/assets/gopaddi/Frame 427318690.svg"
                    alt="info icon"
                    width={24}
                    height={24}
                  />
                  <p className="text-[16px] font-semibold ms-3">
                    See what your Paddi can do for you
                  </p>
                </div>
              </div>
              <div className="rounded-lg p-3 border mx-4 border-[#0D6EFD] my-4  mb-10 cursor-pointer">
                <div
                  className="flex items-center cursor-point"
                  onClick={() => {
                    handlescreen();
                    handleCompontent("history");
                  }}
                >
                  <Image
                    src="/assets/gopaddi/Frame 427318691.svg"
                    alt="info icon"
                    width={24}
                    height={24}
                  />
                  <p className="text-[16px] font-semibold ms-3">
                    See chat history
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
