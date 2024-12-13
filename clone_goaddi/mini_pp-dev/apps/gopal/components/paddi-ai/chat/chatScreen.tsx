import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  CopySimple,
  Question,
  ShareNetwork,
  SpeakerHigh,
  ThumbsDown,
  ThumbsUp,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChatScreenProps } from "./chat.interface";
import Chatinput from "./chatinput";
import styles from "./SpinningImage.module.css";
import { useSendMessage } from "./chat.hook";
// import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, handleCopyClick } from "@/utils";
import { toast } from "sonner";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { getProfileAPi } from "@/axios/endpoints/user.endpoint";
import Carddchat from "./carddchat";
import FormFill from "./form";
import TextWithNewlines from "./TextWithNewlines";  

function ChatScreen(props: ChatScreenProps) {
  const [question, setQuestion] = useState("");
  const sendMessageHook = useSendMessage();

  function handleSubmit(question: string) {
    props.sendMessageHook.mutate(question, "chat", (resp) =>
      onSubmitSuccess(resp),
    );
  }

  function onSubmitSuccess(resp: string): void {
    props.setChat([...props.chat, { question, answer: resp }]);
    setQuestion("");
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const { user } = useAuthStore((state: any) => ({ ...state }));

  const { data } = useQuery({
    queryKey: ["getProfileAPi"],
    queryFn: () => getProfileAPi({ userId: user.userId }),
    enabled: typeof user.userId == "string",
    refetchOnWindowFocus: false,
  });

  const alwaysShowRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const buttonsArr = props.suggestion;

  useEffect(() => {
    if (props.sendMessageHook.isLoading && alwaysShowRef.current) {
      alwaysShowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.sendMessageHook.isLoading]);

  return (
    <div className="bg-white w-full h-full flex flex-col justify-between">
      <div className="chat flex flex-col  mb-1 py-4  h-[28rem] -mt-[2rem] overflow-y-auto">
        {props.chat.map((QandAnswer, id) => (
          <React.Fragment key={id}>
            {QandAnswer.question !== "" ? (
              <div className="one flex justify-end py-3 px-5 mb-[10px] ">
                <div className="flex items-start justify-start gap-2">
                  <p className="grid  gap-1">
                    {QandAnswer.question}
                    <span className="cursor-pointer">
                      <CopySimple
                        size={20}
                        color="#676E7E"
                        weight="bold"
                        onClick={() => {
                          handleCopyClick(QandAnswer.question);
                        }}
                      />
                    </span>
                  </p>

                  <Avatar className="md:w-9 md:h-9 w-8 h-8">
                    <AvatarImage src={data?.profilePicture} />
                    <AvatarFallback className="bg-primary200 font-medium uppercase">
                      {getInitials(data?.firstName + " " + data?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            ) : (
              ""
            )}

            {QandAnswer.type == "form" ? (
              <FormFill form={QandAnswer.answer} />
            ) : (
              <>
                {QandAnswer.type == "carousel" ? (
                  <div className="bg-[#F7F9FC] py-3">
                    <div className=" flex items-start flex-col gap-[3px] justify-start px-5">
                      {/* carousel start  */}
                      <div className="w-full overflow-x-auto py-4 whitespace-nowrap scroll-smooth mt-1">
                        <div className="flex justify-center items-center gap-7">
                          {Array.isArray(QandAnswer.answer) &&
                            QandAnswer.answer.map((carousel, id) => (
                              <React.Fragment key={id}>
                                {id === 0 ? (
                                  <div className="opacity-0 w-auto ml-[40rem] cursor-none">
                                    <Carddchat
                                      title={carousel.title}
                                      description={carousel.subtitle}
                                      body={carousel.body}
                                      imageSrc={carousel.image.url}
                                      imageAlt={carousel.image.alt}
                                    />
                                  </div>
                                ) : (
                                  <Carddchat
                                    title={carousel.title}
                                    description={carousel.subtitle}
                                    body={carousel.body}
                                    imageSrc={carousel.image.url}
                                    imageAlt={carousel.image.alt}
                                  />
                                )}
                              </React.Fragment>
                            ))}
                        </div>
                      </div>
                      {/* carousel end */}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#F7F9FC] py-3">
                    <div className=" flex items-start flex-col gap-[3px] justify-start px-5">
                      <div className="flex items-start gap-[12px] justify-start">
                        <Image
                          src="/assets/gopaddi/chat-icon.png"
                          alt="icon"
                          width={25}
                          height={25}
                        />

                        <div className="flex flex-col">
                          <p>
                            <TextWithNewlines text={QandAnswer.answer} />
                          </p>
                          <div>
                            {/* <Button variant="link" size="icon">
                      <ThumbsUp size={14} color="#0D6EFD" />
                    </Button>
                    <Button variant="link" size="icon">
                      <ThumbsDown size={14} />
                    </Button> */}
                            <Button
                              variant="link"
                              size="icon"
                              className="cursor-pointer"
                            >
                              <CopySimple
                                size={20}
                                onClick={() => {
                                  handleCopyClick(QandAnswer.answer);
                                }}
                              />
                            </Button>
                            {/* <Button variant="link" size="icon">
                      <ShareNetwork size={14} />
                    </Button>
                    <Button variant="link" size="icon">
                      <SpeakerHigh size={14} />
                    </Button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </React.Fragment>
        ))}

        {props.sendMessageHook.isLoading && (
          <div
            className="bg-[#F7F9FC] py-3 mt-4"
            ref={alwaysShowRef}
            id="always_show"
          >
            <div className="one flex justify-end py-3 px-5 mb-[10px] ">
              <div className="flex items-start justify-start gap-2">
                <p className="grid  gap-1">
                  {question}
                  <span className="cursor-pointer">
                    <CopySimple
                      size={20}
                      color="#676E7E"
                      weight="bold"
                      onClick={() => {
                        handleCopyClick("this is question");
                      }}
                    />
                  </span>
                </p>

                <Avatar className="md:w-9 md:h-9 w-8 h-8">
                  <AvatarImage src={data?.profilePicture} />
                  <AvatarFallback className="bg-primary200 font-medium uppercase">
                    {getInitials(data?.firstName + " " + data?.lastName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className=" flex items-start flex-col gap-[3px] justify-start px-5">
              <div className="flex items-start gap-[12px] justify-start">
                <div className={styles.spinning}>
                  <Image
                    src="/assets/gopaddi/chat-icon.png"
                    alt="icon"
                    width={25}
                    height={25}
                  />
                </div>
                <div className="flex flex-col">
                  <p>On it! Please give me a moment...</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t">
        {buttonsArr.length > 0 ? (
          <div className=" bottom-10 left-0 right-0 bg-white shadow-md p-2 flex items-center space-x-2">
            {/* <Question size={20} color="#0D6EFD" /> */}
            <Carousel className="w-full max-w-xs">
              <CarouselContent className="ml-1 flex items-center justify-evenly gap-1">
                {buttonsArr.map((button, id) => (
                  <CarouselItem
                    key={id}
                    className="pl-1 md:basis-1/2 lg:basis-1/3 min-w-min"
                  >
                    <div className="space-x-1">
                      <Button
                        style={{ background: "white" }}
                        className="border rounded-none px-2 py-1 text-blue-500 text-xs"
                        onClick={() => handleSubmit(button.text)}
                      >
                        {button.text}
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
            </Carousel>
          </div>
        ) : (
          ""
        )}

        <Chatinput
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onSubmitSuccess={(resp) => {
            props.setChat([...props.chat, { question, answer: resp }]);
            setQuestion("");
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
          }}
          sendMessageHook={props.sendMessageHook}
        />
      </div>
    </div>
  );
}

export default ChatScreen;
