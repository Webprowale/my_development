//@ts-nocheck
import React, { ReactElement, ReactNode, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import StaggerChildren from "@/animations/staggerChildren";
import Motion from "./motion";
import { Button } from "@/components/ui/button";
import GoogleAuth, { OnTapGoogle } from "./google";
import CategoryModal from "./category";

type Props = {
  form: any;
  right?: any;
  google?: boolean;
  googleText?: string;
  question?: string;
  answer?: string;
  answerLink?: string;
  title?: string;
  subTitle?: string;
  description: string;
};

const AuthLayout = ({
  form,
  right,
  question,
  answer,
  answerLink,
  title,
  subTitle,
  description,
  google,
  googleText,
}: Props) => {
  // Get Current Year
  const year = new Date().getFullYear();
  return (
    <div className="h-full bg-white w-full min-h-screen">
      <Suspense>
        <CategoryModal />
      </Suspense>
      <OnTapGoogle />
      <div className="flex  w-full min-h-screen relative">
        <div className="max-w-xl min-h-screen w-[90%] md:w-[45%] mx-auto flex flex-col mt-8 mx-16">
          {/* Logo & SignUp Description */}
          <div className="flex justify-between items-center  w-full">
            <Logo />
            <p className="text-sm font-medium text-gray-600">
              {question}{" "}
              {answer ? (
                <span className="text-primary600">
                  <Link href={answerLink ?? ""}>{answer}</Link>
                </span>
              ) : null}
            </p>
          </div>
          {/* Title & Description */}
          <div className=" my-20 flex flex-col">
            <StaggerChildren>
              <Motion className="mb-10">
                {title ? (
                  <h2 className="text-3xl font-semibold">{title}</h2>
                ) : null}
                {subTitle ? (
                  <h2 className="text-3xl font-semibold">{subTitle}</h2>
                ) : null}

                {description ? (
                  <p className="text-sm mt-2 text-gray-600 font-medium">
                    {description}
                  </p>
                ) : null}
              </Motion>
              {google ? (
                <>
                  <GoogleAuth googleText={googleText ?? ""} />
                  <Motion className="mt-4 mb-4">
                    <div className="relative mt-2">
                      <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-[1px]  bg-gray-300 border-0 dark:bg-gray-700" />
                        <span className="absolute px-3 text-sm text-nowrap font-medium text-gray-600 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                          or continue with email
                        </span>
                      </div>
                    </div>
                  </Motion>
                </>
              ) : null}
              {form ? form : null}
            </StaggerChildren>
          </div>
          {/* Footer */}
          <footer className="text-gray-600 text-sm mt-auto font-medium mb-10">
            &copy; {year}{" "}
            <span className="underline cursor-pointer">Gopaddi</span>. All
            rights reserved.
          </footer>
        </div>
        {/* Right */}
        <div className="hidden md:block md:w-[55%]">{right}</div>
      </div>
    </div>
  );
};

export default AuthLayout;

const Logo = () => {
  return (
    <Link
      href="/gopal"
      className="w-fit h-fit relative py-1.5 px-2 bg-primary600 rounded-sm"
    >
      <Image
        src="/assets/logo-white.png"
        alt="GoPaddi Logo"
        width={80}
        height={80}
        className="w-8 h-8"
      />
    </Link>
  );
};
