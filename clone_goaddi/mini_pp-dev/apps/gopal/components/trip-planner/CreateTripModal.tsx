"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTripStore } from "@/store/useTripStore";
import { useAuthStore } from "@/store/useAuthStore";
import ClipLoader from "react-spinners/ClipLoader";
import { createUserTrip } from "@/axios/endpoints/trip.endpoint";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2),
  style: z.string().min(2),
  desc: z.string(),
});

const CreateTripModal = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const {
    createTripDetails,
    setCreateTripDetails,
    createTrip,
    isLoading,
    setIsLoading,
  } = useTripStore();
  const { user } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      style: "",
      desc: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      setCreateTripDetails({
        accountId: user?.userId,
        name: data?.name,
        style: data?.style,
        description: data?.desc,
      });

      createTrip(close);
    } catch (error) {
      //   setIsLoading(false);
      //   console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-screen max-h-screen bg-[#00000079] grid place-items-center z-50 backdrop-blur-sm">
      <div className="bg-white w-full md:w-[38%] h-auto  max-h-[95vh] p-6 rounded overflow-auto scrollbar-thin">
        <header className="relative z-10 mb-8">
          <Image
            src={`/assets/modal-create-trip.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Create a Trip</h3>
          <p className="text-sm text-[#647995] w-full md:w-[68%]">
            Let's Go! Build Your Next Adventure
          </p>
          <X
            size={24}
            weight="bold"
            className="absolute right-0 top-[10px] cursor-pointer"
            onClick={() => {
              close();
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        {/* Create trip form */}
        <div className="form w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0 mb-5">
                    <FormLabel className="text-[#1D2433] font-normal">
                      Trip Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the trip name"
                        className="w-full border border-[#98A2B3]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0 mb-5">
                    <FormLabel className="text-[#1D2433] font-normal">
                      Trip Style
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border border-[#98A2B3] focus:border-primary600">
                          <SelectValue placeholder="Select your travel style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="solo"
                          className="hover:bg-primary300"
                        >
                          Solo
                        </SelectItem>
                        <SelectItem value="couple">Couple</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                        <SelectItem value="group">Group</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0 mb-5">
                    <FormLabel className="text-[#1D2433] font-normal">
                      Trip Description
                    </FormLabel>
                    <FormControl className="">
                      <Textarea
                        placeholder="Tell us more about the trip"
                        className="border border-[#98A2B3] rounded text-sm resize-none h-[131px] focus-visible:border-primary600 focus:border-primary600 focus-visible:outline-transparent focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />

              <Button
                variant={"default"}
                className="mt-4 w-full py-5 rounded hover:bg-primary700"
                type="submit"
                // onClick={() => {
                //   router.push("/gopal/trip-planner/trip/5");
                // }}
              >
                {isLoading && (
                  <ClipLoader
                    color="#fff"
                    size={25}
                  />
                )}
                {!isLoading && <span>Create</span>}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateTripModal;
