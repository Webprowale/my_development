"use client";
import { MedicalCardType } from "@/interfaces";
import { CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MedicalCard = ({ id, name, subtitle, image }: MedicalCardType) => {
  return (
    <article className="medical-card">
      <figure className="relative z-[5] h-[250px]">
        <Image
          src={image}
          width={300}
          height={250}
          alt=""
          quality={100}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="bg-primary100 relative z-10 ">
        <Link
          href={`/gopal/medical/${name?.replaceAll(" ", "-").toLowerCase()}`}
          className="name bg-white w-[90%] h-[112px] mx-auto rounded px-4 flex items-center justify-between z-10 absolute left-[50%] translate-x-[-50%] -top-[56px]"
        >
          <h3 className="text-xl font-semibold">{name}</h3>
          <span className="w-[42px] h-[42px] rounded-full bg-primary600 grid place-items-center text-white">
            <CaretRight size={20} weight="bold" />
          </span>
        </Link>
        <p className="text-center text-sm px-4 text-[#676E7E] pt-16 pb-5">
          {subtitle}
        </p>
      </div>
    </article>
  );
};

export default MedicalCard;
