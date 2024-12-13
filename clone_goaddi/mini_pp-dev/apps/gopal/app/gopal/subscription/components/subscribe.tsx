"use client";

import { useEffect } from "react";
import TopBar from "@/components/navigations/desktop/topbar";
import PricingPlanCard from "@/components/pricing-plan/PricingPlanCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef, useState } from "react";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useAuthStore } from "@/store/useAuthStore";
import PropagateLoader from "react-spinners/PropagateLoader";
import SubcriptionSuccessModal from "@/components/subscription/SubcriptionSuccessModal";

const Subscription = () => {
  const active = `bg-primary600 text-white hover:bg-primary600`;
  const [activeTab, selectActiveTab] = useState(1);
  const {
    subscriptionPlans,
    fetchSubscriptionPlans,
    setBillingType,
    billingType,
    isLoading,
    isSubscribe,
    checkSubscriptionStatus,
  } = useSubscriptionStore();
  const { user } = useAuthStore();

  useEffect(() => {
    checkSubscriptionStatus({ membership: user?.membership });
    fetchSubscriptionPlans({ membership: user?.membership });
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="relative bg-white min-h-[80vh] w-[97%] xl:max-w-[1410px] mx-auto grid place-items-center">
          <PropagateLoader color="#0D6EFD" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <main className="relative  bg-white w-[97%] xl:max-w-[1410px] mx-auto p-10">
          <header>
            <h1 className="font-semibold text-3xl leading-normal">
              Find the Perfect Plan for You
            </h1>
            <p className="text-[#647995] text-[14px] mt-2 mb-6">
              Choose the plan the fuels your adventures!
            </p>

            <div className="date-toggle grid w-full md:w-max text-[14px] bg-[#F9FAFB] p-1 grid-cols-2 gap-1 border border-[#d0d5dd] rounded">
              {billing.map((bill, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    selectActiveTab(bill.id);
                    setBillingType(bill.type);
                  }}
                  className={`p-3 ${activeTab === bill.id ? active : ""} rounded`}
                >
                  {bill.name}
                </button>
              ))}
            </div>
          </header>

          <section className="listing mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PricingPlanCard
              id={subscriptionPlans[0]?.id}
              planName={subscriptionPlans[0]?.title}
              planPrice={subscriptionPlans[0]?.price}
              planDuration={billingType}
              planSubtitle="Try out our features for free"
              benefits={features.basic}
              ctaText="Current Plan"
              membership={user?.membership}
              isCurrentPlan={true}
            />
            <PricingPlanCard
              id={subscriptionPlans[1]?.id}
              planName="Premium"
              planPrice={subscriptionPlans[1]?.price}
              planDuration={billingType}
              planSubtitle="Access exclusive deals"
              benefits={features.premium}
              ctaText="Get Premium Now"
              variant="dark"
              recommended={true}
              membership={user?.membership}
              isCurrentPlan={false}
            />
          </section>
        </main>

        {isSubscribe && <SubcriptionSuccessModal />}
      </>
    );
  }
};

const billing = [
  { id: 1, name: "Monthly Billing", active: true, type: "monthly" },
  { id: 2, name: "Annual Billing", active: false, type: "annual" },
];

const features = {
  basic: [
    "Commission for life",
    "Special deals on all travel products",
    "Loyalty point (GoPoint)",
    "Refer and earn",
    "Digital Wallet (GoWallet)",
    "Dedicated debit card for global transaction",
    "Convenient Utility Bill Payment",
    "Other discounted deals",
    "Social Networking Add-On (GoSocial)",
  ],
  premium: [
    "Everything in Basic Plan  plus",
    "Special deals on all travel products",
    "Loyalty point (GoPoint)",
    "Refer and earn",
    "Digital Wallet (GoWallet)",
    "Dedicated debit card for global transaction",
    "Convenient Utility Bill Payment",
  ],
};

export default Subscription;
