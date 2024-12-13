"use client";

import PricingPlanCard from "@/components/pricing-plan/PricingPlanCard";
import SettingsHeader from "@/components/settings/SettingsHeader";
import BillingTable from "@/components/settings/table/BillingTable";
import { Button } from "@/components/ui/button";
import {
  Article,
  CreditCard,
  Eye,
  EyeSlash,
  Stack,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import tableData from "@/app/gopal/settings/subscribe/mockdata.json";
import { TableColumns } from "@/components/settings/table/Columns";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OTPInput from "react-otp-input";
import { optSchema } from "@/schema/auth";
import { Motion } from "@/app/auth/components/otp-form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Parent Component
const Subscribe = () => {
  const mode = useSearchParams();
  return (
    <main className="pb-10">
      <SettingsHeader
        heading="Settings"
        subheading="Subscribe"
        tabLink={links}
      />

      {mode.get("tab") === "plans" && <Plans />}
      {mode.get("tab") === "billings" && <Billings />}
    </main>
  );
};

const Plans = () => {
  const active = `bg-primary600 text-white hover:bg-primary600`;
  const [activeTab, selectActiveTab] = useState(1);

  return (
    <section className="general px-6 ">
      <h2 className="py-7 text-sm text-[#1D2433]">
        Control who can find you on Gopaddi
      </h2>

      <header>
        <div className="date-toggle grid w-full md:w-[30%] text-[14px] bg-[#F9FAFB] p-1 grid-cols-2 gap-1 border border-[#d0d5dd] rounded">
          {billing.map((bill, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                selectActiveTab(bill.id);
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
          id="1"
          planName="Basic Plan"
          planPrice={"0.00"}
          planDuration="year"
          planSubtitle="Try out our features for free"
          benefits={features.basic}
          ctaText="Get Started Now"
          makePayment={function (price: number): void {
            throw new Error("Function not implemented.");
          }}
        />
        <PricingPlanCard
          id="2"
          planName="Premium"
          planPrice={"20.00"}
          planDuration="year"
          planSubtitle="Access exclusive deals"
          benefits={features.premium}
          ctaText="Get Premium Now"
          variant="dark"
          recommended={true}
          makePayment={function (price: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      </section>
    </section>
  );
};

const Billings = () => {
  const [newCardModal, setNewCardModal] = useState(false);
  const [updateCardModal, setUpdateCardModal] = useState(false);
  const [billingInfo, setBillingInfo] = useState(false);

  // close the new card modal
  const closeNewCardModal = () => {
    setNewCardModal(false);
  };

  const closeUpdateCardModal = () => {
    setUpdateCardModal(false);
  };

  const closeBillingInfo = () => {
    setBillingInfo(false);
  };

  return (
    <>
      <section className="px-6">
        <h2 className="py-7 text-sm text-[#1D2433]">
          See information regarding your current plan
        </h2>

        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[342px]">
          {/* current plan card */}
          <div className="relative plan-card flex flex-col row-start-1 row-end-3 p-4">
            <Stack size={32} className="inline-block text-white" />
            <p className="text-white text-sm my-2">Current subscription plan</p>
            <h3 className="text-white font-bold text-3xl">BASIC</h3>

            <div className="extra mt-auto">
              <p className="text-sm mb-2 text-white">Need extra features?</p>
              <Link
                href={"/gopal"}
                className="inline-block py-2 px-5 bg-primary100 text-primary700 hover:bg-primary200 ease-linear duration-150 rounded text-sm"
              >
                Upgrade plan
              </Link>
            </div>
            <Image
              src={"/assets/rocket-up.svg"}
              alt=""
              width={200}
              height={120}
              className="absolute bottom-0 right-0"
            />
          </div>

          {/* payment method */}
          <div className="payment-method bg-[#F9FAFB] border boder-[#E4E7EC] row-start-1 row-end-3 p-4">
            <header className="flex items-center justify-between mb-5">
              <div className="text-xs">
                <h3 className="font-bold text-sm">Payment method</h3>
                <p>Your payment method here</p>
              </div>
              <Button
                variant={"default"}
                className="rounded bg-primary600 text-white text-xs font-normal hover:bg-primary700"
                onClick={() => {
                  setNewCardModal(true);
                }}
              >
                Add new card
              </Button>
            </header>

            <div className="card-list flex flex-col gap-3">
              <div className="card border boder-[#E4E7EC] flex items-center p-2 rounded">
                <Image
                  src={"/assets/mastercard.svg"}
                  width={50}
                  height={40}
                  alt="mastercard logo"
                />
                <div className="">
                  <p className="text-sm">123 **** **** **86</p>
                  <p className="text-xs text-[#676E7E]">Exp Date: 06/2024</p>
                </div>
                <Button
                  variant={"default"}
                  className="bg-primary100 text-primary600 text-xs hover:bg-primary200 ml-auto"
                  onClick={() => {
                    setUpdateCardModal(true);
                  }}
                >
                  Update
                </Button>
              </div>
              <div className="card border boder-[#E4E7EC] flex items-center p-2 rounded">
                <Image
                  src={"/assets/mastercard.svg"}
                  width={50}
                  height={40}
                  alt="mastercard logo"
                />
                <div className="">
                  <p className="text-sm">123 **** **** **86</p>
                  <p className="text-xs text-[#676E7E]">Exp Date: 06/2024</p>
                </div>
                <Button
                  variant={"default"}
                  className="bg-primary100 text-primary600 text-xs hover:bg-primary200 ml-auto"
                  onClick={() => {
                    setUpdateCardModal(true);
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>

          {/* next payment */}
          <div className="next-payment bg-[#F9FAFB] border boder-[#E4E7EC] grid grid-cols-2 col-start-3 col-end-4 row-start-1 row-end-2 p-4 gap-y-4">
            <div className=" justify-self-start">
              <h3 className="text-[#676E7E] text-sm font-medium mb-1">
                Next payment on
              </h3>
              <p className="font-bold">02 Feb 2024</p>
            </div>
            <div className="cta justify-self-end">
              <Button className="text-[#9E0A05] bg-[#FBEAE9] text-xs hover:bg-[#ffd7d5] ">
                Cancel Renewal
              </Button>
            </div>
            <div className="monthly-payment justify-self-start">
              <h3 className="text-[#676E7E] text-sm font-medium mb-1">
                Monthly payment
              </h3>
              <p className="font-medium">$100</p>
            </div>
            <div className="users justify-self-end">
              <h3 className="text-[#676E7E] text-sm text-right font-medium mb-1">
                Users
              </h3>
              <p className="font-medium">1 user</p>
            </div>
          </div>

          {/* billing information */}
          <div className="billing bg-[#F9FAFB] border boder-[#E4E7EC] col-start-3 col-end-4 row-start-2 row-end-3 p-4 flex flex-col justify-between">
            <Article
              className="text-primary600 inline-block mb-4"
              width={26}
              height={22}
            />
            <div className="flex items-center justify-between text-xs text-[#676E7E]">
              <div className="billing-details">
                <p>Janedoe@voyatekgroup.com</p>
                <p>Jane Doe group</p>
              </div>
              <Button
                variant={"default"}
                className="bg-primary100 text-primary600 inline-block text-[10px] hover:bg-primary200"
                onClick={() => {
                  setBillingInfo(true);
                }}
              >
                Update billing info
              </Button>
            </div>
          </div>
        </div>

        {/* Billing table */}
        <section id="billing-table">
          <BillingTable data={tableData} columns={TableColumns} />
        </section>
      </section>
      {/* // Modals  */}
      {/* Add a new car modal */}
      {newCardModal && <NewCard close={closeNewCardModal} />}

      {/* Update card modal */}
      {updateCardModal && <UpdateCard close={closeUpdateCardModal} />}

      {/* billing info modal */}
      {billingInfo && <BillingInfo close={closeBillingInfo} />}
    </>
  );
};

const NewCard = ({ close }: { close: () => void }) => {
  // close modal
  const closeModal = () => {
    close();
  };

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<"tel" | "password">("password");

  const form = useForm<any>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      otp: "",
      membership: "gopal",
    },
  });

  const watchOTP = form.watch("otp");

  //   Submit
  const onSubmit = async (code: any) => {
    console.log(code);
  };

  return (
    <div className="grid place-items-center fixed inset-0 w-full h-screen backdrop-blur-sm bg-[#00000089] z-50">
      <div className="text-message__modal bg-white w-full md:w-[35%] p-6 rounded animate-scaleUp">
        <header className="relative z-10 mb-8">
          <Image
            src={`/assets/modal-money.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Add new card </h3>
          <p className="text-sm text-[#647995] w-full md:w-[68%]">
            Link a new credit/debit card
          </p>
          <X
            size={24}
            weight="bold"
            className="absolute right-[20px] top-[10px] cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className="w-full mb-2">
                    <FormLabel className="font-normal text-left text-sm">
                      Card number
                    </FormLabel>
                    <FormControl className="flex items-start justify-center">
                      <div className="relative">
                        <Input
                          placeholder="**** **** **** ****"
                          className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                          {...field}
                        ></Input>
                        <CreditCard
                          size={22}
                          className="absolute right-3 top-50% translate-y-[50%] text-[#98A2B3]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="md:text-sm text-xs self-start" />
                  </FormItem>
                )}
              ></FormField>

              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        Expiry date
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            placeholder="mm/dd"
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        CVC/CVV
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            placeholder="***"
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full mb-2">
                    <FormLabel className="font-normal text-left text-sm">
                      Card name
                    </FormLabel>
                    <FormControl className="flex items-start justify-center">
                      <div className="relative">
                        <Input
                          placeholder="Jane doe"
                          className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                          {...field}
                        ></Input>
                      </div>
                    </FormControl>
                    <FormMessage className="md:text-sm text-xs self-start" />
                  </FormItem>
                )}
              ></FormField>

              <div className="flex items-center justify-end mb-2">
                <Button
                  variant={"default"}
                  className="ml-auto px-16 py-6 bg-primary600 text-white font-normal  hover:bg-primary700 mt-2 rounded text-sm"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

//
const UpdateCard = ({ close }: { close: () => void }) => {
  // close modal
  const closeModal = () => {
    close();
  };

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<"text" | "password">("password");
  const [isVerified, setIsVerified] = useState(false);

  const form = useForm<any>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      otp: "",
      membership: "gopal",
    },
  });

  const watchOTP = form.watch("otp");

  //   Submit
  const onSubmit = async (code: any) => {
    console.log(code);
  };

  return (
    <div className="grid place-items-center fixed inset-0 w-full h-screen backdrop-blur-sm bg-[#00000089] z-50">
      <div className="text-message__modal bg-white w-full md:w-[35%] p-6 rounded animate-scaleUp">
        <header className="relative z-10 mb-8">
          <Image
            src={`/assets/modal-money.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Update Card Details </h3>
          <p className="text-sm text-[#647995] w-full md:w-[68%]">
            Update details on your credit/debit card
          </p>
          <X
            size={24}
            weight="bold"
            className="absolute right-0 top-[10px] cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        {/* The update card details field and normal field here */}
        {isVerified ? (
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        Card number
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            placeholder="**** **** **** ****"
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                          <CreditCard
                            size={22}
                            className="absolute right-3 top-50% translate-y-[50%] text-[#98A2B3]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>

                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                      <FormItem className="w-full mb-2">
                        <FormLabel className="font-normal text-left text-sm">
                          Expiry date
                        </FormLabel>
                        <FormControl className="flex items-start justify-center">
                          <div className="relative">
                            <Input
                              placeholder="mm/dd"
                              className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                              {...field}
                            ></Input>
                          </div>
                        </FormControl>
                        <FormMessage className="md:text-sm text-xs self-start" />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem className="w-full mb-2">
                        <FormLabel className="font-normal text-left text-sm">
                          CVC/CVV
                        </FormLabel>
                        <FormControl className="flex items-start justify-center">
                          <div className="relative">
                            <Input
                              placeholder="***"
                              className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                              {...field}
                            ></Input>
                          </div>
                        </FormControl>
                        <FormMessage className="md:text-sm text-xs self-start" />
                      </FormItem>
                    )}
                  ></FormField>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        Card name
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            placeholder="Jane doe"
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>

                <div className="flex items-center justify-end mb-8">
                  <Button
                    variant={"default"}
                    className="ml-auto px-16 py-6 bg-primary600 text-white font-normal  hover:bg-primary700 mt-5 rounded text-sm"
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        Password
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            placeholder="Enter your password"
                            type={visible}
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                          {visible === "password" ? (
                            <Eye
                              size={22}
                              className="absolute right-3 top-[52%] translate-y-[-52%] text-[#98A2B3] cursor-pointer"
                              onClick={() => {
                                setVisible("text");
                              }}
                            />
                          ) : (
                            <EyeSlash
                              size={22}
                              className="absolute right-3 top-[52%] translate-y-[-52%] text-[#98A2B3] cursor-pointer"
                              onClick={() => {
                                setVisible("password");
                              }}
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>

                <div className="flex items-center justify-end mb-2">
                  <Button
                    variant={"default"}
                    className="ml-auto px-16 py-4 bg-primary600 text-white font-normal  hover:bg-primary700 mt-5 rounded text-sm"
                    type="submit"
                    onClick={() => {
                      setIsVerified(true);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

// Billing info
const BillingInfo = ({ close }: { close: () => void }) => {
  // close modal
  const closeModal = () => {
    close();
  };

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<"text" | "password">("password");
  const [isVerified, setIsVerified] = useState(false);

  const form = useForm<any>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      otp: "",
      membership: "gopal",
    },
  });

  const watchOTP = form.watch("otp");

  //   Submit
  const onSubmit = async (code: any) => {
    console.log(code);
  };

  return (
    <div className="grid place-items-center fixed inset-0 w-full h-screen backdrop-blur-sm bg-[#00000089] z-50">
      <div className="text-message__modal bg-white w-full md:w-[35%] p-6 rounded animate-scaleUp">
        <header className="relative z-10 mb-8">
          <Image
            src={`/assets/modal-money.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Billing information </h3>
          <p className="text-sm text-[#647995] w-full md:w-[68%]">
            Update details on your billing
          </p>
          <X
            size={24}
            weight="bold"
            className="absolute right-0 top-[10px] cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        {/* The update card details field and normal field here */}

        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full flex flex-col gap-2"
            >
              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        Company Name
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            placeholder=""
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        Email
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            placeholder=""
                            type="email"
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor=""
                      className="font-normal text-left text-sm"
                    >
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry="ng"
                        {...field}
                        className="phoneInput w-full"
                        inputClassName="w-full !border-gray-400 !focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm   outline-none  focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                      />
                    </FormControl>
                    <FormMessage className="md:text-base text-sm mt-6" />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className="w-full mb-2">
                    <FormLabel className="font-normal text-left text-sm">
                      Street Address
                    </FormLabel>
                    <FormControl className="flex items-start justify-center">
                      <div className="relative">
                        <Input
                          placeholder=""
                          className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                          {...field}
                        ></Input>
                      </div>
                    </FormControl>
                    <FormMessage className="md:text-sm text-xs self-start" />
                  </FormItem>
                )}
              ></FormField>

              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        State
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            placeholder=""
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="Country"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        Country
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder=""
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        Zip/Postal Code
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            placeholder=""
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="tax"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2">
                      <FormLabel className="font-normal text-left text-sm">
                        Tax ID
                      </FormLabel>
                      <FormControl className="flex items-start justify-center">
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder=""
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...field}
                          ></Input>
                        </div>
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <div className="flex items-center justify-end mb-1">
                <Button
                  variant={"default"}
                  className="ml-auto px-16 py-3 bg-primary600 text-white font-normal  hover:bg-primary700  rounded text-xs"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

const billing = [
  { id: 1, name: "Annual Billing", active: true },
  { id: 2, name: "Monthly Billing", active: false },
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

const links = [
  {
    id: 1,
    name: "Plans",
    tabName: "plans",
    isActive: false,
  },
  {
    id: 2,
    name: "Billings",
    tabName: "billings",
    isActive: true,
  },
];

export default Subscribe;
