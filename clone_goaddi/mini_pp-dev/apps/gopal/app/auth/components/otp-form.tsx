"use client";
import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GoAuthButton } from "@/components/goui/button";
import { motion } from "framer-motion";
import { childVariants } from "@/animations/staggerChildren";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { optSchema } from "@/schema/auth";
import { Eye, EyeClosed, EyeSlash } from "@phosphor-icons/react";
import OtpInput from "react-otp-input";
import { useOtpStore } from "@/store/useAuthStore";
import { verifyOtp } from "@/axios/endpoints/auth.endpoint";

type Props = {
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  className?: string;
  field: any;
  onChange?: any;
};

const OtpForm = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<"tel" | "password">("password");

  const { resendCountdown, isResending, onResend } = useOtpStore();

  const account = useSearchParams().get("account");

  const router = useRouter();

  const form = useForm<any>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      otp: "",
      membership: account,
    },
  });

  const watchOTP = form.watch("otp");
  console.log(watchOTP);

  //   Submit
  const onSubmit = async (userData: any) => {
    setLoading(true);

    const loadingId = toast.loading("Verifying account");

    const email = localStorage.getItem("email");

    if (!email) {
      toast.error("No email found");
    }

    const otp = userData[0] + userData[1] + userData[2] + userData[3];

    try {
      const userId = localStorage.getItem("userid");
      const response = (await verifyOtp({
        email,
        otp,
        membership: account,
      })) as any;

      console.log(response);

      console.log({ email, otp, membership: account });

      const { code, error } = response;

      if (code === "200") {
        toast.success("Email Verified Successfully", {
          id: loadingId,
          description:
            "Your email has been successfully verified. You are now signed up and ready to go!",
          duration: 3000,
        });

        const postToken = await axios.post("/api/auth", {
          userId,
        });
        console.log(postToken);

        setTimeout(() => {
          router.push(`/onboarding/${account}?step=profile`);
        }, 5000);

        setLoading(false);
      }

      if (code === "404") {
        toast.error("Invalid OTP code", {
          id: loadingId,
          description:
            "The OTP code you provided is invalid. Please check your email for the correct verification code.",
          duration: 3000,
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    const otp = form.getValues("otp");
    console.log(otp);
    if (otp.length === 4) {
      onSubmit(otp);
    }
  }, [watchOTP]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full"
      >
        <Motion className="flex justify-between">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
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
                    containerStyle="max-w-sm w-full mb-5 space-x-3"
                    renderSeparator={<span></span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="h-20 rounded-sm text-xl"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />
        </Motion>

        <Motion className="flex justify-between mt-8">
          {!isResending ? (
            <div className="flex items-center space-x-2">
              <div className="font-medium text-sm text-gray-600">
                Did&apos;nt get a code?{" "}
                <span
                  onClick={onResend}
                  className="underline text-primary600 cursor-pointer"
                >
                  Click to resend
                </span>
              </div>
            </div>
          ) : null}
          <div className="ml-auto">
            {visible === "tel" ? (
              <div
                onClick={() => setVisible("password")}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer"
              >
                <Eye size={24} />
                <span>Hide password</span>
              </div>
            ) : (
              <div
                onClick={() => setVisible("tel")}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer"
              >
                <EyeClosed size={24} />
                <span>See password</span>
              </div>
            )}
          </div>
        </Motion>
        <Motion>
          <GoAuthButton
            type="submit"
            loading={loading}
            className="w-full py-3 md:text-sm mt-8 font-medium"
          >
            Submit
          </GoAuthButton>
        </Motion>
        <Motion>
          {isResending && resendCountdown !== 0 ? (
            <p className="text-center mt-4 text-gray-600 text-sm font-medium">
              Resending OTP. You can try again in{" "}
              <span className="text-primary600">{resendCountdown} seconds</span>
            </p>
          ) : null}
        </Motion>
      </form>
    </Form>
  );
};

export default OtpForm;

export const FormInput = ({
  label,
  type,
  placeholder,
  className,
  field,
  onChange,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Motion className="w-full relative ">
      <label
        htmlFor={label}
        className="text-sm w-full relative"
      >
        {label}
      </label>
      {onChange ? (
        <Input
          id={label}
          {...field}
          onChange={onChange}
          type={type ?? "text"}
          className={cn("border rounded-sm text-sm mt-px w-full", className)}
          placeholder={placeholder}
          autoFocus={label === "First Name" ? true : false}
        />
      ) : (
        <>
          <Input
            id={label}
            {...field}
            // onChange={onChange}
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

export const Motion = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      variants={childVariants}
    >
      {children}
    </motion.div>
  );
};
