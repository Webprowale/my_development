"use client";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GoAuthButton } from "@/components/goui/button";
import Link from "next/link";
import Motion from "../../components/motion";
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
import { signInSchema } from "@/schema/auth";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { login, sendOtp } from "@/axios/endpoints/auth.endpoint";
import { useAuthStore, useOtpStore } from "@/store/useAuthStore";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  className?: string;
  field: any;
  onChange?: any;
};

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore((state) => ({ ...state }));
  const { setEmail } = useOtpStore((state) => ({ ...state }));

  const router = useRouter();

  const form = useForm<any>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (submitData: any) => {
    const loadingId = toast.loading("Checking credentials");
    try {
      setLoading(true);

      const newData = { token: "testToken", ...submitData };
      const response = (await login(newData)) as any;

      const { code, errors, data, verify, success } = response;

      console.log(response);
      if (code === "200") {
        console.log(data[0]);
        setUser(data[0]);
        setLoading(false);

        //Post the token to cookies
        const postToken = await axios.post("/api/auth", {
          userId: data[0]?.userId,
        });

        console.log(postToken);

        toast.success("You have successfully logged in", {
          id: loadingId,
          description: "Welcome back to GoPaddi",
          duration: 5000,
        });

        setTimeout(() => {
          router.push("/gopal?mode=refresh");
        }, 3000);
      }

      if (code === "404") {
        toast.warning("This GoPaddi acoount does not exist.", {
          id: loadingId,
          description: "Do you want to get one?",
          action: {
            label: "Yes",
            onClick: () => router.push("/auth/sign-up"),
          },
          duration: 5000,
        });
        setLoading(false);
        return;
      }

      if (!success && !verify) {
        setLoading(false);

        setEmail(submitData.email);

        await sendOtp(data?.email);
        toast.success("We have sent an OTP to verify your account", {
          id: loadingId,
          description:
            "We have sent an OTP to your email address to verify your account",
          duration: 4000,
        });

        setTimeout(() => {
          router.push("/auth/verify-otp");
        }, 2000);
      } else if (code === "303" && errors[0]?.phone) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        id: loadingId,
      });
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full mb-5">
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full mb-5">
              <FormControl>
                <Motion className="w-full">
                  <FormInput
                    label="Password"
                    field={field}
                    type="password"
                    placeholder="At least eight characters"
                    className="h-12  border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:border-2  rounded-sm  focus-visible:outline-none focus-visible:ring-0"
                  />
                </Motion>
              </FormControl>
              <FormMessage className="md:text-sm text-xs mt-6" />
            </FormItem>
          )}
        />

        <Motion className="flex justify-between">
          <div className="flex items-center space-x-2 ">
            <Checkbox
              id="keep"
              className="w-5 h-5 border-2 border-primary600 rounded-sm "
            />
            <Label htmlFor="keep" className="font-normal">
              Keep me logged in
            </Label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="underline text-sm font-medium text-primary600"
          >
            Forgot Password?
          </Link>
        </Motion>
        <Motion>
          <GoAuthButton
            type="submit"
            loading={loading}
            className="w-full py-3 md:text-sm mt-8 font-medium"
          >
            Sign In
          </GoAuthButton>
        </Motion>
      </form>
    </Form>
  );
};

export default SignInForm;

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
      <label htmlFor={label} className="text-sm w-full relative">
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
