"use client";
import { ArrowLeft } from "@phosphor-icons/react";
import React from "react";

type Props = {
  title?:string,
};

const BookTitle = ({title='Trip Booking'}: Props) => {
  return (
    <div className="flex gap-5 items-center">
      <ArrowLeft weight="bold" size={20} />
      <h2 className="font-semibold">{title}</h2>
    </div>
  );
};

export default BookTitle;
