"use client";
import Motion from "@/app/auth/components/motion";
import form from "@/components/create/form";
import { GoAuthButton } from "@/components/goui/button";
import loading from "@/components/posts/dairy-post/loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CalendarBlank, Eye, EyeSlash, Trash } from "@phosphor-icons/react";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

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

type Traveler = {
  id: number;
  traveller: string;
  travellerNum: number;
};

export const TravellerInformation = ({
  key,
  travellerDetails,
}: {
  key: number;
  travellerDetails: Traveler;
}) => {
  const [loading, setLoading] = useState(false);
  const { traveller, travellerNum } = travellerDetails;

  const router = useRouter();
  const form = useForm<any>({
    // resolver: zodResolver(),
    defaultValues: {
      title: "",
      fname: "",
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
    <div
      key={key}
      className="w-full mt-4 mb-5 p-3 border border-slate-200 rounded-sm"
    >
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <h3 className="text-base font-semibold">Traveller</h3>
          <div className="text-xs capitalize bg-secondary100 text-secondary800 p-1.5">
            {/* {traveller} ({travellerNum}) */}
          Primary Contact - Adult ({travellerNum})
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Trash weight="bold" size={20} className="text-primary600" />
          <div className="text-sm text-primary600">Clear Details</div>
        </div>
      </div>
      <p className="my-4 text-sm px-3.5 py-4 font-medium text-information900 bg-information100 rounded-md">
        Enter your information exactly as it appears on your ID to avoid booking
        issues
      </p>
      <div className="my-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
            <div className="flex gap-7 items-center w-full mb-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-0 w-[20%]">
                    <FormLabel className="text-sm font-normal relative">
                      <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                        *
                      </span>
                      Title
                    </FormLabel>
                    <div className="field relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full  h-12 focus:border-primary600  border-gray-400 focus-visible:bg-none focus-visible:border-primary600  rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0">
                            <SelectValue
                              placeholder="Enter Title"
                              className="text-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent  focus:outline-none outline-none"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mr">Mr</SelectItem>
                            <SelectItem value="mrs">Mrs</SelectItem>
                            <SelectItem value="mrs">Miss</SelectItem>

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
                name="fname"
                render={({ field }) => (
                  <FormItem className="w-[40%]">
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
                  <FormItem className="w-[40%]">
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

            <div className="flex gap-7 items-center w-full mb-5">
              {/* <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-0 w-[30%]">
                    <FormLabel className="text-sm font-normal relative">
                      <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                        *
                      </span>
                      Gender
                    </FormLabel>
                    <div className="field relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full  h-12 focus:border-primary600  border-gray-400 focus-visible:bg-none focus-visible:border-primary600  rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0">
                            <SelectValue
                              placeholder="Enter Gender"
                              className="text-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent  focus:outline-none outline-none"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="mrs">Bobrisky</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="md:text-xs text-xs mt-2" />
                    </div>
                  </FormItem>
                )}
              /> */}
                 <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-[40%]">
                    <FormControl>
                      <FormInput
                        label="Email addresse"
                        field={field}
                        type="email"
                        placeholder="Enter email addresse"
                        className="h-12 border-gray-400 focus-visible:bg-none   focus-visible:outline-primary600 rounded-sm   outline-none  focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary600"
                      />
                    </FormControl>
                    <FormMessage className="md:text-sm text-xs mt-6" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem className="space-y-0 w-[30%]">
                    <FormLabel className="text-sm font-normal relative">
                      <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                        *
                      </span>
                      Nationality{" "}
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
              {/* <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col z-10 w-[40%]">
                    <FormLabel className="text-sm font-normal">
                      Date of birth
                    </FormLabel>
                    <Popover>
                      <div className="field relative">
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full text-center min-h-[50px] items-center justify-start  font-normal hover:bg-transparent opacity-100 border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Enter your date of birth</span>
                              )}
                              <CalendarBlank
                                size={15}
                                className="icon absolute top-[50%] right-3 translate-y-[-50%]"
                              />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 z-10"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            fromYear={1800}
                            toYear={2024}
                            selected={field.value}
                            onSelect={field.onChange}
                            className="bg-[#fff] w-full shadow-md shadow-gray-300 rounded-sm "
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </div>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
            <div className="flex gap-7 w-full mb-5">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="mt-px space-y-0 w-[40%]">
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
              {/* <FormField
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
              /> */}
              {/* <FormField
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
              /> */}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TravellerInformation;

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
            type={showPassword ? "text" : type ?? "text"}
            className={cn(
              "border focus:border-2 focus:border-primary600 rounded-sm text-sm mt-px w-full",
              className,
            )}
            placeholder={placeholder}
            autoFocus={label === "First Name" ? true : false}
          />
        </>
      )}
    </Motion>
  );
};
