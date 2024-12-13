"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { GoAuthButton } from "@/components/goui/button";
import Motion from "@/app/auth/components/motion";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  CheckCircle,
  DotsThreeCircle,
  Eye,
  EyeSlash,
  XCircle,
} from "@phosphor-icons/react";
import { signUpSchema } from "@/schema/auth";
import { motion } from "framer-motion";
import { register, sendOtp } from "@/axios/endpoints/auth.endpoint";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  className?: string;
  field: any;
  onChange?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
};

const ContactForm = ({ referral }: any) => {
  const [loading, setLoading] = useState(false);

  // console.log(theReferral);
  const form = useForm<any>({
    // resolver: zodResolver(),
    defaultValues: {
      name: "",

      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: any) => {
    const loadingId = toast.loading("Submiting...");
    try {
      setLoading(true);

      toast.success("Account created successfully", {
        id: loadingId,
        description:
          "We have sent an OTP to your email address to verify your account",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error submiting :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[800px] mx-auto w-full"
      >
        <div className="w-full mb-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FormInput
                    label="Name"
                    field={field}
                    type="text"
                    placeholder="Enter first name"
                    className="h-12 border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full mb-7">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FormInput
                    label="Email"
                    field={field}
                    type="email"
                    placeholder="your@email.com"
                    className="h-12 border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm   outline-none  focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                  />
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />
        </div>
        <div className=" w-full mb-7">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full mt-px">
                <FormControl>
                  <Motion className="w-full">
                    <label
                      htmlFor="Phone number"
                      className="text-sm w-full relative"
                    >
                      Phone number
                      <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                        *
                      </span>
                    </label>
                    <PhoneInput
                      defaultCountry="ng"
                      {...field}
                      className="phoneInput w-full"
                      inputClassName="w-full border-gray-400 focus-visible:bg-none focus-visible:border-none focus-visible:outline-primary600 rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                    />
                  </Motion>
                </FormControl>
                <FormMessage className="md:text-base text-sm mt-6" />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full mb-7">
          <FormField
            control={form.control}
            name="Message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full relative">
                    <label
                      htmlFor="message"
                      className="text-sm w-full relative"
                    >
                      Message
                    </label>
                    <Textarea
                      // maxLength={120}
                      className=" border border-gray-400 focus-visible:bg-none focus-visible:border-primary600 ring-0 focus-visible:outline-primary600 outline-none  focus-visible:outline-none focus-visible:ring-0 focus:ring-0 focus:border-2 focus:border-primary600 rounded-sm text-sm mt-px min-h-60 h-full py-4 px-4 placeholder:text-sm placeholder:font-normal w-full"
                      placeholder="Type a message"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />
        </div>

        <Motion>
          <GoAuthButton
            type="submit"
            className="w-full py-3 md:text-sm mt-8 font-medium transition-all"
            loading={loading}
          >
            Submit
          </GoAuthButton>
        </Motion>
      </form>
    </Form>
  );
};

export default ContactForm;

export const FormInput = ({
  label,
  type,
  placeholder,
  className,
  field,
  onChange,
  onFocus,
  onBlur,
  required = true,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Motion className="w-full relative ">
      <label htmlFor={label} className="text-sm w-full relative">
        {label}
        {/* {required ? (
          <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
            *
          </span>
        ) : (
          ""
        )} */}
      </label>
      {onChange ? (
        <>
          <Input
            id={label}
            {...field}
            onChange={onChange}
            type={showPassword ? "text" : type ?? "text"}
            className={cn(
              "border focus:border-2 focus:border-primary600 rounded-sm text-sm mt-px w-full",
              className,
            )}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={label === "First Name" ? true : false}
          />

          {type === "password" && (
            <button
              type="button"
              className="absolute bottom-4  right-0 px-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          )}
        </>
      ) : (
        <>
          <Input
            id={label}
            {...field}
            type={showPassword ? "text" : type ?? "text"}
            className={cn(
              "border focus:border-2 focus:border-primary600 rounded-sm text-sm mt-px w-full",
              className,
            )}
            placeholder={placeholder}
            autoFocus={label === "First Name" ? true : false}
          />

          {type === "password" && (
            <button
              type="button"
              className="absolute bottom-4  right-0 px-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          )}
        </>
      )}
    </Motion>
  );
};
