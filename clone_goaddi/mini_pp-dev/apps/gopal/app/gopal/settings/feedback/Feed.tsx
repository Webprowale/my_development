import FeedBackRadio from "@/components/settings/FeedbackRadio";
import FeedbackTextarea from "@/components/settings/FeedbackTextarea";
import { Button } from "@/components/ui/button";
import { Radical } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

const Feed = () => {
  const [disable, setDisable] = useState(true);
  const [active, setActive] = useState("");

  return (
    <>
      <section className="grid grid-cols-[2fr_1fr]">
        <div className="pb-20 flex flex-col p-5 border-r border-r-[#E4E7EC]">
          <p className=" mt-[16px] font-[500] text-[16px] leading-[24px]">
            Rate your experience
          </p>
          <div className="flex gap-[32px] my-[32px]">
            {radioContents.map((content) => {
              const { id, icon, text } = content;

              return (
                <FeedBackRadio
                  onClick={(e: any) => {
                    const target = e.target as HTMLButtonElement;
                    setActive(target.name);
                    setDisable((disable) =>
                      text === target.name || disable === true
                        ? false
                        : text !== target.name
                          ? false
                          : true,
                    );
                  }}
                  key={id}
                  icon={icon}
                  text={text}
                  className={
                    active === text
                      ? "bg-[#E7F0FF] border-[#0D6EFD] border-[1px]"
                      : "bg-[#F9FAFB] border-[#D0D5DD] border-[1px]"
                  }
                />
              );
            })}
          </div>
          <FeedbackTextarea
            className="h-[217px] rounded-[4px] border-[#98A2B3] border-[1px] placeholder:text-sm focus:border-[#98A2B3] focus:border-[1px] mb-[28px] p-3 resize-none focus-visible:outline-primary600"
            label="Brief description"
            id="recommend"
            name="recommend"
            placeholder="Tell us more (optional)"
          />
          <Button
            variant={"default"}
            className="bg-primary text-white self-end text-xs font-normal py-2 px-5 hover:bg-primary700"
          >
            Submit your feedback
          </Button>
        </div>
        <div className="border-l-[1px] border-[#E4E7EC] flex-shrink-0"></div>
      </section>
    </>
  );
};

const radioContents = [
  {
    id: 1,
    icon: "/assets/emoji/laugh.svg",
    text: "Laugh",
  },
  {
    id: 2,
    icon: "/assets/emoji/flight.svg",
    text: "Flight",
  },
  {
    id: 3,
    icon: "/assets/emoji/love.svg",
    text: "Love",
  },
  {
    id: 4,
    icon: "/assets/emoji/hot.svg",
    text: "Hot",
  },
  {
    id: 5,
    icon: "/assets/emoji/like.svg",
    text: "Like",
  },
  {
    id: 6,
    icon: "/assets/emoji/wow.svg",
    text: "Wow",
  },
];
export default Feed;
