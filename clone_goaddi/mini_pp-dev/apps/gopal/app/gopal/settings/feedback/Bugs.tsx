import FeedbackButton from "@/components/settings/FeedbackButton";
import FeedbackSelect from "@/components/settings/FeedbackSelect";
import FeedbackTextarea from "@/components/settings/FeedbackTextarea";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CloudArrowUp } from "@phosphor-icons/react";
import { useState } from "react";

const Bugs = () => {
  return (
    <>
      <section className="grid grid-cols-[2fr_1fr]">
        <div className="p-5 pb-20 border-r border-r-[#E4E7EC] flex flex-col">
          <p className=" mt-2 text-sm leading-[24px]">Report a bug</p>
          <div className=" my-[32px]">
            <label
              htmlFor="email"
              className="block mb-2 text-sm"
            >
              Email
            </label>
            <Input
              type="text"
              disabled={true}
              className="w-[100%] bg-[#E4E7EC] border-[1px] border-[#98A2B3] rounded-[4px] p-[14px] font-normal min-h-[50px] text-[16px] leading-[24px] text-[#98A2B3]"
              value="janedoe@gmail.com"
            />
          </div>
          <FeedbackTextarea
            className="h-[217px] rounded-[4px] border-[#98A2B3] border-[1px] placeholder:text-sm focus:border-[#98A2B3] focus:border-[1px] mb-[28px] p-3 resize-none"
            label="Brief description"
            id="recommend"
            name="recommend"
            placeholder="What functionality would improve your experience?"
          />
          <div className="flex gap-[24px] mb-[28px]">
            <FeedbackSelect
              className="p-[14px] border-[#98A2B3] border-[1px] rounded-[4px] focus:outline-primary600 focus-visible:outline-primary600 focus-within:outline-primary600"
              content={["ahahhah", "jahjjahjha"]}
              label="Category"
            />
            <FeedbackSelect
              className="p-[14px] border-[#98A2B3] border-[1px] rounded-[4px] focus:outline-primary600 focus-visible:outline-primary600 focus-within:outline-primary600"
              content={["ahahhah", "jahjjahjha"]}
              label="Priority"
            />
          </div>
          <FeedbackButton
            disabled={false}
            className="self-end bg-[#0D6EFD] disabled:bg-[#E7F0FF] px-8 mt-5 py-2 rounded-[4px] text-[#FFFFFF] disabled:text-[#98A2B3] font-[400] text-[14px] leading-[22px]"
            text="Submit"
          />
        </div>
        <div className="border-[#E4E7EC] p-5">
          <div className="flex flex-col gap-[16px]">
            <label
              className="font-[400] text-sm leading-[24px]"
              htmlFor="Upload Media"
            >
              Upload Media
            </label>
            <div className="border-[#D0D5DD] border-[1.5px] border-dashed rounded-[4px] w-[318px] h-[350px] flex flex-col gap-[16px] items-center justify-center">
              <span className="w-[64px] h-[64px] bg-primary100 rounded-full grid place-items-center">
                <CloudArrowUp
                  size={32}
                  weight="fill"
                  className="text-primary600"
                />
              </span>
              <div className="flex flex-col items-center justify-center">
                <p className=" font-[500] text-[14px] leading-[22px] text-[#676E7E]">
                  Drag and drop files
                </p>
                <p className="font-[400] text-[12px] leading-[22px] text-[#98A2B3]">
                  JPG, PNG (max. 800x400px)
                </p>
              </div>
              <div className="flex items-center justify-center">
                <hr className="h-[1px] w-[130px] bg-[#676E7E] text-[#676E7E] mr-[8px]" />
                <p className="font-[500] text-[12px] leading-[22px] text-[#676E7E]">
                  or
                </p>
                <hr className="h-[1px] w-[130px] bg-[#676E7E] text-[#676E7E] ml-[8px]" />
              </div>
              <label className="bg-[#0D6EFD] cursor-pointer disabled:bg-[#E7F0FF] px-[24px] py-[8px] rounded-[4px] text-[#FFFFFF] disabled:text-[#98A2B3] font-[400] text-[14px] leading-[22px]">
                Browse Files{" "}
                <Input
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bugs;
