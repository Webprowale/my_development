"use client";
import React, { useEffect, useState } from "react";
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
import { newPasswordSchema, signUpSchema } from "@/schema/auth";
import { motion } from "framer-motion";
import { register, resetPassword } from "@/axios/endpoints/auth.endpoint";

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

const NewPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [criteria, setCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
    hasMinLength: false,
  });

  const router = useRouter();
  const form = useForm<any>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      passconf: "",
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

  useEffect(() => {
    const forgot = localStorage.getItem("forgot");

    if (forgot !== "true") {
      router.push("/auth/forgot-password");
    }
  }, []);

  const onSubmit = async (data: any) => {
    const loadingId = toast.loading("Creating account");
    try {
      // console.log("Register Data,", data);

      setLoading(true);

      const otp = localStorage.getItem("otp");

      if (!otp) {
        setLoading(false);

        toast.info("Account created successfully", {
          id: loadingId,
          description:
            "You need to verify your email address before you can reset your password.",
          duration: 5000,
        });
      }

      const response = (await resetPassword({
        userToken: otp,
        ...data,
      })) as any;

      const { code, errors } = response;

      console.log(response);

      if (code === "202") {
        localStorage.setItem("email", data.email), setLoading(false);
        toast.success("Account created successfully", {
          id: loadingId,
          description:
            "We have sent an OTP to your email address to verify your account",
          duration: 5000,
        });

        setTimeout(() => {
          router.push("/auth/verify-otp");
        }, 3000);
      }

      if (code === "303" && errors[0]?.email) {
        setLoading(false);
        toast.error("Email already exists.", {
          id: loadingId,
          duration: 3000,
        });
      } else if (code === "303" && errors[0]?.phone) {
        setLoading(false);
        toast.error("Phone number already exists.", {
          id: loadingId,
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        id: loadingId,
      });
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
        <div className="w-full mb-5">
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
                      className="h-12  border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm   outline-none  focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                    />
                  </Motion>
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full mb-4">
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
                      className="h-12  border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm   outline-none  focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                    />
                  </Motion>
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />
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

export default NewPasswordForm;

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
