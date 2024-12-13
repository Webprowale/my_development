//@ts-nocheck
"use client";

import { referralCode } from "@/axios/endpoints/referral.endpoint";
import { useReferralStore } from "@/store/useReferralStore";
import { handleCopyClick } from "@/utils";
import { Copy } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const Page = () => {
  const { response, loading, fetchReferralCode } = useReferralStore();

  useEffect(() => {
    fetchReferralCode();
  }, [fetchReferralCode]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#0d6efd" />
      </div>
    );

  return (
    <main className="flex flex-col gap-3 md:mb-5">
      {/* Hero section */}
      <section className="commission-hero bg-[url('/assets/commission-hero.png')] bg-cover bg-no-repeat min-h-[80vh] h-auto md:pt-10 md:pr-10 md:pl-10 pt-5 pr-5 pl-5 pb-0 md:pb-0 flex md:items-end flex-col md:flex-row items-center gap-8">
        <div className="text w-full md:w-[50%] mb-10">
          <h1 className="font-black text-2xl md:text-[40px] leading-snug text-white">
            Refer Your Friends & Earn Commissions for Life!
          </h1>
          <p className="text-white mb-7">
            Invite your friends and family to GoPaddi and earn points when they
            signup and subscribe with your referral code.
          </p>

          {/* referral code section */}
          <div className="code bg-white p-4 md:p-8 rounded">
            {/* referral code */}
            <div className="mb-6">
              <h2 className="text-[#647995] text-sm mb-2">
                Your Referral Code
              </h2>
              <p className="bg-primary100 border-2 border-primary600 border-dashed flex items-center justify-between rounded p-2 px-4 ">
                <span className="text-2xl font-bold text-primary900">
                  {/* GPDREF342BN  */}
                  {response?.data[0]?.referralCode}
                </span>

                <button
                  className="text-sm flex items-center gap-1 text-primary600 cursor-pointer"
                  onClick={() =>
                    handleCopyClick(response?.data[0]?.referralCode)
                  }
                >
                  <Copy
                    size={15}
                    weight="bold"
                  />
                  Copy
                </button>
              </p>
            </div>
            {/* referral link */}
            <div className="">
              <h2 className="text-[#647995] text-sm mb-2">
                Or Share Your Personal Referral Link
              </h2>
              <div className="grid grid-cols-1 gap-4 md:gap-2 md:grid-cols-[70%_30%] ">
                <div className="link flex items-center w-full gap-2">
                  <h3 className="p-3 bg-[#F0F2F5] text-[#676E7E] font-medium rounded truncate w-full md:w-[80%]">
                    `https://vgtechdemo.org/auth/sign-up?referralcode=$
                    {response?.data[0]?.referralCode}`
                  </h3>
                  <span
                    className="text-primary600 bg-primary100 p-3 cursor-pointer px-4 font-medium rounded"
                    onClick={() =>
                      handleCopyClick(
                        `https://vgtechdemo.org/auth/sign-up?referralcode=${response?.data[0]?.referralCode}`,
                      )
                    }
                  >
                    Copy
                  </span>
                </div>
                <div className="social flex items-center w-auto gap-2 flex-shrink-0">
                  <a
                    href="#"
                    target="_blank"
                  >
                    <Image
                      src={"/assets/facebook.svg"}
                      width={40}
                      height={40}
                      alt="Facebook logo"
                    />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                  >
                    <Image
                      src={"/assets/x_icon.svg"}
                      width={40}
                      height={40}
                      alt="X logo"
                    />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                  >
                    <Image
                      src={"/assets/whatsapp_icon.svg"}
                      width={40}
                      height={40}
                      alt="Whatsapp logo"
                    />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                  >
                    <Image
                      src={"/assets/telegram.svg"}
                      width={40}
                      height={40}
                      alt="Telegram logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commission hero image */}
        <div className="w-full md:w-[50%] ">
          <Image
            src={"/assets/commission-hero-image.svg"}
            width={400}
            height={400}
            className="w-full"
            alt=""
          />
        </div>
      </section>

      {/* Inivite and earn */}
      <section
        id="earn"
        className="w-full px-5 md:px-10 py-16 bg-white rounded"
      >
        <h2 className="text-4xl text-[#1D2433] font-bold text-center mb-5">
          Invite & Earn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* invite friends */}
          <div className="step bg-primary100 rounded flex flex-col justify-between">
            <div className="p-6 px-8">
              <h3 className="font-bold text-lg text-[#1D2433]">
                Invite Friends
              </h3>
              <p className="text-sm">
                Share your referral code with friends through email, text or
                social media.
              </p>
            </div>
            <div className="image bg-primary300 ml-auto h-[214px] grid place-items-center w-[90%] p-5">
              <img
                src={"/assets/invite.svg"}
                width={200}
                height={150}
                alt=""
                className="w-full min-h-0 h-full object-contain"
              />
            </div>
          </div>

          {/* Extra cash */}
          <div className="step bg-primary100 rounded flex flex-col justify-between">
            <div className="p-6 px-8">
              <h3 className="font-bold text-lg text-[#1D2433]">
                Earn Extra Cash
              </h3>
              <p className="text-sm">
                Get points after your friends sign up and subscribe with your
                code.
              </p>
            </div>
            <div className="image bg-primary900 ml-auto h-[214px] grid place-items-center w-full p-5">
              <img
                src={"/assets/extra-cash.svg"}
                width={200}
                height={150}
                alt=""
                className="w-full min-h-0 h-full object-contain"
              />
            </div>
          </div>

          {/* Repeat */}
          <div className="step bg-primary100 rounded flex flex-col justify-between">
            <div className="p-6 px-8">
              <h3 className="font-bold text-lg text-[#1D2433]">Repeat</h3>
              <p className="text-sm">
                Keep referring friends! The more you share, the more you earn.
              </p>
            </div>
            <div className="image bg-primary700 mr-auto h-[214px] flex items-stretch w-[90%] p-5 relative overflow-hidden">
              <img
                src={"/assets/repeat.svg"}
                alt=""
                className="w-full h-full object-contain absolute -bottom-2 left-0 right-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 px-5 md:px-0">
        <div className="bg-primary300 text-primary900 rounded pl-10 pt-10 pr-10 flex flex-col justify-between gap-10">
          <div className="">
            <h3 className="uppercase text-sm font-medium mb-2">
              REFERRAL PURCHASE
            </h3>
            <p className="text-2xl md:text-4xl font-bold">
              Get up to 50 GoPoints every time your referred friends make a
              purchase.
            </p>
          </div>
          <img
            src="/assets/refer-purchase.svg"
            alt="you purchase"
            className="w-full h-auto"
          />
        </div>
        <div className="bg-primary900 text-white rounded pl-10 pt-10 pr-10 flex flex-col justify-between gap-10">
          <div className="">
            <h3 className="uppercase text-sm font-medium mb-2">
              YOUR PURCHASE
            </h3>
            <p className="text-2xl md:text-4xl font-bold">
              Earn up to 5% cash back every time you complete a purchase.
            </p>
          </div>
          <img
            src="/assets/your-purchase.svg"
            alt="you purchase"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* see your earnings */}
      <section
        id="earning"
        className="bg-[#F58A07] bg-[url('/assets/see-earnings.svg')] bg-cover bg-bottom bg-no-repeat h-[280px] rounded flex flex-col items-center justify-center gap-4 text-white text-center p-4 mx-5 md:mx-0"
      >
        <h2 className="font-bold text-3xl">See Your Earnings</h2>
        <p>
          Discover the number of points you've accrued and learn how to redeem
          your GoPoints.
        </p>
        <Link
          href={"/gopal/wallet?tab=wallet"}
          className="bg-white/50 py-3 px-6 rounded text-white border border-white"
        >
          Go to wallet
        </Link>
      </section>
    </main>
  );
};

export default Page;
