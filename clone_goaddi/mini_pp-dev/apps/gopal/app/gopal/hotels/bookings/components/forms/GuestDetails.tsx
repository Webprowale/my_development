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
import {FormInput} from './traveller-information'


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

export   type Guest = {
    id: number;
    guest: string;
    guestNum: number;
  };
  
const GuestDetails =({
    key,
    guestDetails,
}:{
  key: number;
guestDetails:Guest
})=>{

    const [loading, setLoading] = useState(false);
    const {  guestNum } = guestDetails;
  
    const form = useForm<any>({
        // resolver: zodResolver(),
        defaultValues: {
          title: "",
          fname: "",
          lname: "",
          email: "",
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
            <h3 className="text-base font-semibold">Add Guest Details</h3>
            <div className="text-xs capitalize bg-secondary100 text-secondary800 p-1.5">
              {/* {traveller} ({travellerNum}) */}
              Optional
            {/* Primary Contact - Adult ({guestNum}) */}
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem 
                  className="mt-px space-y-0 w-[40%]"
                  >
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
              </div>
  
          
         
            </form>
          </Form>
        </div>
      </div>
    )
}

export default GuestDetails;