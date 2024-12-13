"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  FormLabel,
} from "@/components/ui/form";
import OtpInput from "react-otp-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createPin } from "@/axios/endpoints/wallet.endpoint";
import ClipLoader from "react-spinners/ClipLoader";
import { useWalletStore } from "@/store/useWalletStore";

const CreatePinModal = ({ close }: { close?: (data: boolean) => void }) => {
  return (
    <div className="grid place-items-end md:place-items-center fixed inset-0 w-full h-screen bg-[#00000089] backdrop-blur-sm z-[99]">
      <div className="request-container bg-white w-full md:w-[30%] p-6 rounded">
        <header className="relative z-10 mb-8">
          <Image
            src={`/assets/modal-vault.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Create Wallet Pin</h3>
          <p className="text-sm text-[#647995] w-full md:w-[80%] leading-normal">
            Securing your wallet funds is important, create a pin to get
            started!
          </p>
          {/* <X
            size={24}
            weight="bold"
            className="absolute right-0 top-[10px] cursor-pointer"
            onClick={() => {
              close(false);
            }}
          /> */}
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        {/* OTP inputs */}
        <PinForm />
      </div>
    </div>
  );
};

const PinForm = () => {
  const optSchema = z.object({
    newPin: z.string().min(4, { message: "OTP must be 4 characters" }),
    confirmPin: z.string().min(4, { message: "OTP must be 4 characters" }),
  });

  const { pinStatus, setPinStatus } = useWalletStore();
  const [visible, setVisible] = useState<"tel" | "password">("password");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   form instance
  const form = useForm<any>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      newPin: "",
      confirmPin: "",
    },
  });

  // Handle pin form submission
  const onSubmit = async (data: any) => {
    // If the pins do not match each other
    if (data?.newPin !== data?.confirmPin) {
      toast.error("Pin does not match");
    }

    setIsLoading(true);
    try {
      const response = await createPin(data);

      // if response is true
      if (response.success) {
        setPinStatus(true);
        toast.success(response.message);
        setIsLoading(false);
      }else{
        if(response.message){
          toast.error(response.message);
        }else{
          toast.error("An error occurred")
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="newPin"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <FormLabel className="font-normal text-left text-sm">
                  Enter Wallet Pin
                </FormLabel>
                <FormControl>
                  <OtpInput
                    {...field}
                    numInputs={4}
                    inputStyle={{
                      width: "3.4em",
                      textAlign: "center",
                      border: "1px solid #ced4da", // Add border style if needed
                    }}
                    inputType={visible}
                    shouldAutoFocus={true}
                    containerStyle="w-full justify-between mb-5 space-x-3"
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="h-20 rounded-sm text-xl focus-within:outline-primary600 focus-visible:outline-primary600"
                        autoComplete="off"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPin"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <FormLabel className="font-normal text-left text-sm">
                  Confirm Wallet Pin
                </FormLabel>
                <FormControl>
                  <OtpInput
                    {...field}
                    numInputs={4}
                    inputStyle={{
                      width: "3.4em",
                      textAlign: "center",
                      border: "1px solid #ced4da", // Add border style if needed
                    }}
                    inputType={visible}
                    shouldAutoFocus={false}
                    containerStyle="justify-between w-full mb-5 space-x-3"
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="h-20 rounded-sm text-xl focus-within:outline-primary600 focus-visible:outline-primary600"
                        autoComplete="off"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />

          <Button
            variant="default"
            type="submit"
            className="bg-primary600 text-white w-full py-6 rounded hover:bg-primary700 mt-5 flex items-center justify-center"
          >
            {isLoading ? (
              <ClipLoader
                size={16}
                color="#fff"
                speedMultiplier={1}
              />
            ) : (
              <span>Create Pin</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePinModal;
