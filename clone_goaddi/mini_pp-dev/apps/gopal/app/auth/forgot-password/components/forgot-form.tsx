"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import Motion from "../../components/motion";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  CheckCircle,
  DotsThreeCircle,
  Eye,
  EyeSlash,
  XCircle,
} from "@phosphor-icons/react";
import { forgotPasswordSchema, signUpSchema } from "@/schema/auth";
import { motion } from "framer-motion";
import { register, resetOTP } from "@/axios/endpoints/auth.endpoint";

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

const ForgotForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<any>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isDirty } = form.getFieldState("password");

  const onSubmit = async (data: any) => {
    const loadingId = toast.loading("Sending OTP");
    try {
      setLoading(true);

      const { code, message } = await resetOTP({ email: data?.email });

      if (code === "200") {
        localStorage.setItem("email", data.email), setLoading(false);
        setTimeout(() => {
          toast.success("OTP sent successfully", {
            id: loadingId,
            description:
              "We have sent an OTP to your email address to verify your account",
            duration: 5000,
          });
          setLoading(false);
          router.push("/auth/reset-otp");
        }, 1000);
      }

      if (
        code === "404" &&
        message === "Your account has already been verified"
      ) {
        setTimeout(() => {
          toast.info("Your account has already been verified", {
            id: loadingId,
            // description:
            //   "We have sent an OTP to your email address to verify your account",
            duration: 5000,
          });
          setLoading(false);
        }, 1000);
      }

      if (code === "404" && message === "Invalid email address") {
        setTimeout(() => {
          toast.warning("Your account does not exist.", {
            id: loadingId,
            description:
              "You could try creating a new account using this email",
            duration: 5000,
          });
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        id: loadingId,
      });
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="flex gap-7 w-full mb-5">
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

        <Motion>
          <GoAuthButton
            type="submit"
            className="w-full py-3 md:text-sm mt-5 font-medium transition-all"
            loading={loading}
          >
            Submit
          </GoAuthButton>
        </Motion>
      </form>
    </Form>
  );
};

export default ForgotForm;

export const FormInput = ({
  label,
  type,
  placeholder,
  className,
  field,
  onChange,
  onFocus,
  onBlur,
  required,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Motion className="w-full relative ">
      <label htmlFor={label} className="text-sm w-full relative">
        {label}
        <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
          *
        </span>
      </label>
      {onChange ? (
        <>
          <Input
            id={label}
            {...field}
            onChange={onChange}
            type={showPassword ? "text" : type ?? "text"}
            className={cn("border rounded-sm text-sm mt-px w-full", className)}
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
            className={cn("border rounded-sm text-sm mt-px w-full", className)}
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
