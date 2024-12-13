import GoButton from "@/components/goui/button";
import React from "react";
import ContactForm from "./form";

type Props = {};

const ContactHero = (props: Props) => {
  return (
    <div className="pt-32">
      <div className="relative text-black bg-primary100 pt-16 pb-20 rounded-md h-full w-full mx-auto max-w-[1470px]">
        <div className="flex flex-col max-w-4xl mx-auto w-full justify-center items-center">
          <p className="text-sm text-black">Contact Us</p>
          <h2 className="text-3xl text-center font-extrabold text-black my-6 mb-20">
            We're here for you! Feel free to reach out with any questions you
            may have. We'd like to hear from you
          </h2>
        </div>
        <img
          src="/mail.svg"
          alt=""
          className="w-40 h-fit  z-[1] absolute bottom-0 left-10"
        />
      </div>

      <div className="max-w-[700px] shadow-sm  mx-auto p-7 border border-gray-200 -translate-y-20 bg-white rounded-md">
        <h3 className="text-black text-2xl font-semibold mb-10">Email Us</h3>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactHero;
