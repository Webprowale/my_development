"use client";
import React, { useEffect, useState, Suspense } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Modal from "@/components/goui/modal";
import { UserPlus } from "@phosphor-icons/react";
import { GoAuthButton } from "@/components/goui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export const profileSchema = z.object({
  traveller: z.string().min(1, {
    message: "Please enter a Traveller Type",
  }),
  travellerNum: z.string().min(1, {
    message: "Please enter a Number of Traveller",
  }),
});

const PassengerModal = ({
  isModalOpen,
  setIsModalOpen,
  handleAddTraveler,
}: any) => {
  const onClose = () => {
    setIsModalOpen(false);
  };

  if (!isModalOpen) {
    return null;
  }

  const form = useForm<any>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      traveller: "",
      travellerNum: "1",
    },
  });

  const onSubmit = async (values: any) => {
    handleAddTraveler(values.traveller, parseInt(values.travellerNum));
    onClose();
  };

  return (
    <Suspense>
      <Modal
        isOpen={isModalOpen}
        onClose={onClose}
        className="sm:max-w-[540px] w-full"
        trigger={<p></p>}
      >
        <img
          className="absolute top-0 w-full h-fit z-[-1]"
          src="/assets/modal-lines.svg"
          alt="modal-lines"
        />

        <div className="z-10 w-full">
          <div className="p-5 bg-primary100 w-fit rounded-[4px]">
            <UserPlus weight="bold" className="w-7 h-7 text-primary600" />
          </div>
          <div className="mt-5">
            <h3 className="text-2xl font-semibold">Select Passenger</h3>
            <p className="font-medium mt-1 text-gray-600 max-w-[450px]">
              To add a new traveller, select what kind of passenger{" "}
            </p>
          </div>
          <Form {...form}>
            <form className="" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex w-full gap-2 mt-6 mb-2">
                <FormField
                  control={form.control}
                  name="traveller"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm font-normal relative">
                        <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                          *
                        </span>
                        Traveller
                      </FormLabel>
                      <div className="field relative">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none">
                              <SelectValue
                                placeholder="Select traveller"
                                className="text-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                checkClass="focus:text-white"
                                className="text-base py-1 focus:bg-primary600 focus:text-white"
                                value="adult"
                              >
                                Adult
                              </SelectItem>
                              <SelectItem
                                className="text-base py-1 focus:bg-primary600 focus:text-white"
                                value="child"
                              >
                                Child
                              </SelectItem>
                              <SelectItem
                                className="text-base py-1 focus:bg-primary600 focus:text-white"
                                value="infant"
                              >
                                Infant
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="md:text-xs text-xs mt-2" />
                      </div>
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="travellerNum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal">
                        Number of Traveller
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Number"
                          className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent border focus:outline-none"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage className="md:text-xs text-xs mt-2" />
                    </FormItem>
                  )}
                />
              </div>
              <GoAuthButton
                type="submit"
                className="w-full py-3 md:text-sm mt-4 font-medium transition-all col-start-1 col-end-3"
              >
                Select
              </GoAuthButton>
            </form>
          </Form>
        </div>
      </Modal>
    </Suspense>
  );
};

export default PassengerModal;
