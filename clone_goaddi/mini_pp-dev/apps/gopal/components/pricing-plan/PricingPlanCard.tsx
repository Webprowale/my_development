"use client";

import { CheckCircle, CurrencyNgn, ShootingStar } from "@phosphor-icons/react";
import Link from "next/link";
import { IPricing } from "@/interfaces";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useEffect } from "react";
import {
  makePaymentForSubscriptionPlan,
  confirmPaymentStatus,
} from "@/axios/endpoints/subscription.endpoint";
import { toast } from "sonner";

const PricingPlanCard = ({
  id,
  planName = "Basic",
  planSubtitle,
  planPrice,
  planDuration = "monthly",
  ctaText,
  variant = "light",
  benefits,
  makePayment,
  recommended = false,
  membership,
  isCurrentPlan,
}: IPricing) => {
  const {
    subcribeToPlan,
    confirmSubscriptionPaymentStatus,
    billingType,
    checkSubscriptionStatus,
    isUserSubscribed,
  } = useSubscriptionStore();
  let config: any;
  let paymentData: any;

  useEffect(() => {
    checkSubscriptionStatus({ membership: "gopal" });
  }, []);

  // making payment for the subscription
  const Subscribe = async () => {
    const response = await makePaymentForSubscriptionPlan({
      membership: membership,
      planId: id,
    });

    // when the subscription is false
    if (response.success == false) {
      toast.error("You're already subscribed");
      return;
    }

    // when the subscribe API is successful
    if (response.success) {
      paymentData = response?.data[0]?.paymentData[0];

      //  setting up the config that will be used
      // by the flutterwave SDK
      config = {
        public_key: process.env.NEXT_PUBLIC_FLUTTER_KEY,
        tx_ref: paymentData?.referenceNo,
        amount: paymentData?.amount,
        currency: "NGN",
        payment_options: "card, banktransfer, ussd",
        meta: {
          source: "docs-inline-test",
          consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
          email: paymentData?.userData[0]?.email,
          phone_number: paymentData[0]?.userData[0]?.phonenumber,
          name: paymentData[0]?.userData[0]?.name,
        },
        customizations: {
          title: "Gopaddi",
          description: "Subscription",
          logo: "https://vgtechdemo.org/_next/image?url=%2Fassets%2Flogo-white.png&w=64&q=75",
        },
      };
    }

    // init flutter wave SDK
    const handleFlutterPayment = useFlutterwave(config);

    handleFlutterPayment({
      callback: (response) => {
        // The flutterwave response
        console.log(response);
        // update the status on the database
        confirmSubscriptionPaymentStatus({
          referenceNo: response?.tx_ref,
          transactionId: response?.transaction_id,
          paymentStatus: response?.status,
          billingType: billingType,
        });

        // This will close the SDK after payment was successful
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {
        console.log("Flutterwave is closed");
      },
    });
  };

  return (
    <div
      className={`pricing-card relative ${
        variant == "dark" ? "bg-primary500 text-white" : "bg-[#F0F2F5]"
      } p-8 rounded`}
    >
      <div
        className={`bar block w-[49px] mb-2 h-[10px] rounded-full ${
          variant == "light" ? "bg-primary600" : "bg-white"
        }`}
      ></div>
      <div className="plan-details mb-6">
        <h3 className="text-2xl font-semibold">{planName}</h3>
        <p className={`${variant == "dark" ? "text-white" : "text-[#647995]"}`}>
          {planSubtitle}
        </p>
      </div>
      <div className="pricing flex flex-col md:flex-col items-start justify-between mb-5">
        <div className="money flex flex-row md:flex-col">
          <p className="text-2xl flex items-center">
            <CurrencyNgn size={28} />

            <span className="text text-5xl font-extrabold">{planPrice}</span>
          </p>

          <p
            className={`mt-1 ${variant == "dark" ? "text-white" : "text-[#647995]"}`}
          >
            / {planDuration}
          </p>
        </div>
        <div className="cta my-6 md:my-6">
          {isCurrentPlan ? (
            <div className="text-xs absolute cursor-not-allowed">
              Current plan
            </div>
          ) : (
            <button
              onClick={() => Subscribe()}
              className={`block md:w-max md:inline-block py-3 px-12 font-semibold ${
                variant === "light"
                  ? "bg-primary600 text-white hover:bg-primary700"
                  : "bg-white text-primary1100 hover:bg-primary200"
              }  rounded text-sm  ease-in duration-150`}
            >
              {ctaText}
            </button>
          )}
        </div>

        {recommended && (
          <div className="recommended absolute top-8 rounded text-sm right-8 bg-[#F9FAFB33] flex items-center gap-2 py-3 px-5">
            <ShootingStar
              size={20}
              weight="fill"
            />

            <span>Recommended</span>
          </div>
        )}
      </div>

      <ul className="benefits flex flex-col gap-y-3">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm"
          >
            <CheckCircle
              size={20}
              weight="fill"
              className={`${
                variant === "light" ? "text-green-600" : "text-white"
              }`}
            />
            <span>{benefit}</span>
          </li>
        ))}
        <div className="empty-space col-start-2 col-end-3 row-start-3 row-end-10"></div>
      </ul>
    </div>
  );
};

export default PricingPlanCard;
