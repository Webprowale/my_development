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
import { signUpSchema } from "@/schema/auth";
import { motion } from "framer-motion";
import { register, sendOtp } from "@/axios/endpoints/auth.endpoint";
import axios from "axios";

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

const SignUpForm = ({ referral }: any) => {
  const [loading, setLoading] = useState(false);
  const [disableReferralField, setDisableReferralField] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [criteria, setCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
    hasMinLength: false,
  });

  console.log(referral);
  const router = useRouter();
  const theReferral = useSearchParams().get("account")?.split("=")[1] || null;

  useEffect(() => {
    if (theReferral || referral) {
      setDisableReferralField(true);
    }
  }, [theReferral, referral]);

  // console.log(theReferral);
  const form = useForm<any>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      passconf: "",
      referral: referral || theReferral,
    },
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Update criteria state based on password input
    setCriteria({
      hasUppercase: /[A-Z]/.test(value),
      hasLowercase: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSymbol: /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]/.test(value),
      hasMinLength: value.length >= 8,
    });
  };

  const { isDirty } = form.getFieldState("password");
  const account = useSearchParams().get("account");

  const onSubmit = async (data: any) => {
    const loadingId = toast.loading("Creating account");
    try {
      setLoading(true);

      const response = (await register(data)) as any;

      const { code, errors, userId, success } = response;

      console.log(response);

      localStorage.setItem("userid", userId);

      localStorage.setItem("email", data.email);

      if (success) {
        toast.success("Account created successfully", {
          id: loadingId,
          description:
            "We have sent an OTP to your email address to verify your account",
          duration: 5000,
        });

        setTimeout(() => {
          router.push(`/auth/verify-otp?account=${account?.toLowerCase()}`);
        }, 3000);
      }

      if (code === "303" && errors[0]?.email) {
        toast.error("Email already exists.", {
          id: loadingId,
          duration: 3000,
        });
      } else if (code === "303" && errors[0]?.phone) {
        toast.error("Phone number already exists.", {
          id: loadingId,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating account:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="flex gap-7 w-full mb-5">
          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FormInput
                    label="First name"
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

          <FormField
            control={form.control}
            name="lname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FormInput
                    label="Last Name"
                    field={field}
                    type="text"
                    placeholder="Enter last name"
                    className="h-12 border-gray-400 focus-visible:bg-none   focus-visible:outline-primary600 rounded-sm   outline-none  focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary600"
                  />
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />
        </div>
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
                      inputClassName="w-full border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm   outline-none  focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                    />
                  </Motion>
                </FormControl>
                <FormMessage className="md:text-base text-sm mt-6" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-7 w-full mb-6">
          <div className="w-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Motion className="w-full">
                      <FormInput
                        label="Password"
                        field={field}
                        type="password"
                        onChange={(e: any) => {
                          handlePasswordChange(e);
                          field.onChange(e);
                        }}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        placeholder="At least eight characters"
                        className="h-12  border-gray-400 focus-visible:bg-none focus-visible:border-primary600 rounded-sm   outline-none  focus-visible:outline-none focus-visible:ring-0"
                      />
                    </Motion>
                  </FormControl>
                  <FormMessage className="md:text-sm text-xs mt-6" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="passconf"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Motion className="w-full">
                      <FormInput
                        label="Confirm Password"
                        type="password"
                        field={field}
                        placeholder="Re-enter Password"
                        className="h-12  border-gray-400 focus-visible:bg-none focus-visible:border-primary600  rounded-sm   outline-none  focus-visible:outline-none focus-visible:ring-0 "
                      />
                    </Motion>
                  </FormControl>
                  <FormMessage className="md:text-sm text-xs mt-6" />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Password strength checks */}
        <Motion>
          {isPasswordFocused ? (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2 text-sm"
            >
              <li className="flex items-center">
                {!isDirty ? (
                  <DotsThreeCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-gray-500"
                  />
                ) : criteria.hasUppercase ? (
                  <CheckCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-green-600"
                  />
                ) : (
                  <XCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-red-500"
                  />
                )}
                <p>At least one uppercase letter (A-Z)</p>
              </li>
              <li className="flex items-center">
                {!isDirty ? (
                  <DotsThreeCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-gray-500"
                  />
                ) : criteria.hasLowercase ? (
                  <CheckCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-green-500"
                  />
                ) : (
                  <XCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-red-500"
                  />
                )}
                <p>At least one lowercase letter (a-z)</p>
              </li>
              <li className="flex items-center">
                {!isDirty ? (
                  <DotsThreeCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-gray-500"
                  />
                ) : criteria.hasNumber ? (
                  <CheckCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-green-500"
                  />
                ) : (
                  <XCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-red-500"
                  />
                )}
                <p>At least one number (0-9)</p>
              </li>
              <li className="flex items-center">
                {!isDirty ? (
                  <DotsThreeCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-gray-500"
                  />
                ) : criteria.hasSymbol ? (
                  <CheckCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-green-500"
                  />
                ) : (
                  <XCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-red-500"
                  />
                )}
                <p>Symbols {`(!@#$%^&*()_-+={[}]|:;"'<,>.?/)`} </p>
              </li>
              <li className="flex items-center">
                {!isDirty ? (
                  <DotsThreeCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-gray-500"
                  />
                ) : criteria.hasMinLength ? (
                  <CheckCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-green-500"
                  />
                ) : (
                  <XCircle
                    weight="fill"
                    className="w-5 h-5 mr-2 text-red-500"
                  />
                )}
                <p>Minimum of eight characters</p>
              </li>
            </motion.ul>
          ) : null}
        </Motion>
        <div className="flex gap-7 w-full mb-5">
          <FormField
            disabled={disableReferralField}
            control={form.control}
            name="referral"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FormInput
                    required={false}
                    field={field}
                    label="Referral Code"
                    type="text"
                    placeholder="Enter a referral code"
                    className="h-12 border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />
          <div className="w-full"></div>
        </div>
        <Motion>
          <GoAuthButton
            type="submit"
            className="w-full py-3 md:text-sm mt-8 font-medium transition-all"
            loading={loading}
          >
            Sign Up
          </GoAuthButton>
        </Motion>
      </form>
    </Form>
  );
};

export default SignUpForm;

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
        {required ? (
          <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
            *
          </span>
        ) : (
          ""
        )}
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
