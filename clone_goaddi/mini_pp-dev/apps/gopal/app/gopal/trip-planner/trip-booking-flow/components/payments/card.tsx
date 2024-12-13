import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoAuthButton } from "@/components/goui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { naira } from "@/utils/money";
import { toast } from "sonner";
import { Question } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

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

const CardPayment = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<any>({
    // resolver: zodResolver(),
    defaultValues: {
      title: "",
      cardNum: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      passconf: "",
    },
  });

  const onSubmit = async (data: any) => {
    const loadingId = toast.loading("Creating account");
    try {
      setLoading(true);

      toast.success(JSON.stringify(data));
    } catch (error) {
      console.error("Error creating account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="max-w-2xl flex items-center gap-x-4">
        <div className="max-w-[300px] w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
              <div className="flex gap-7 items-center w-full mb-5">
                <FormField
                  control={form.control}
                  name="cardNum"
                  render={({ field }) => (
                    <FormItem className="w-[100%]">
                      <FormControl>
                        <FormInput
                          label="Card number"
                          placeholder="**** **** **** ****"
                          field={field}
                          type="text"
                          className="h-10 border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0"
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
                  name="idType"
                  render={({ field }) => (
                    <FormItem className="space-y-0 w-[25%]">
                      <FormLabel className="text-sm font-normal relative">
                        <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                          *
                        </span>
                        ID type{" "}
                      </FormLabel>
                      <div className="field relative">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full  h-12 focus:border-primary600  border-gray-400 focus-visible:bg-none focus-visible:border-primary600  rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0">
                              <SelectValue
                                placeholder="Enter Nationality"
                                className="text-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent  focus:outline-none outline-none"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="md:text-xs text-xs mt-2" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem className="w-[35%]">
                      <FormControl>
                        <FormInput
                          label="ID Number"
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
            </form>
          </Form>
        </div>
        <div className="rounded-sm max-w-[380px] w-full bg-warning100 text-warning900 p-3">
          <div className="flex justify-between items-center font-semibold">
            <div className="flex gap-2 items-center  text-warning900">
              <Question size={16} weight="fill" className="text-warning900" />
              <div className="text-sm">Oops!</div>
            </div>
          </div>
          <p className="text-sm py-1 my-2">
            Your current balance{" "}
            <span className="font-semibold text-warning900">
              NGN 123,563.00
            </span>{" "}
            won't cover this trip{" "}
            <span className="text-warning900 font-semibold">
              NGN 234,245.00
            </span>
            Top up your wallet to proceed.
          </p>
          <button className="text-xs mt-2 py-1.5 px-7 rounded-sm text-white bg-warning900">
            Top Up
          </button>
        </div>
      </div>
      <hr className="bg-gray-100 h-[1px] w-full my-5" />
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex flex-col items-center gap-1">
          <div className="text-sm text-black">Total Price</div>
          <div className="text-black font-semibold text-xl">
            {naira("234245")}
          </div>
        </div>
        <div className="">
          <GoAuthButton
            type="submit"
            // loading={loading}
            className="w-full py-2 md:text-sm mt-4"
          >
            Complete Booking
          </GoAuthButton>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;

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
  const [showCardDetails, setShowCardDetails] = useState(false);

  const togglePasswordVisibility = () => {
    setShowCardDetails(!showCardDetails);
  };
  return (
    <div className="w-full relative ">
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
            type={showCardDetails ? "text" : type ?? "text"}
            className={cn(
              "border focus:border-2 focus:border-primary600 rounded-sm text-sm mt-px w-full",
              className,
            )}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={label === "First Name" ? true : false}
          />
        </>
      ) : (
        <>
          <Input
            id={label}
            {...field}
            type={showCardDetails ? "text" : type ?? "text"}
            className={cn(
              "border focus:border-2 focus:border-primary600 rounded-sm text-sm mt-px w-full",
              className,
            )}
            placeholder={placeholder}
            autoFocus={label === "First Name" ? true : false}
          />
        </>
      )}
    </div>
  );
};
