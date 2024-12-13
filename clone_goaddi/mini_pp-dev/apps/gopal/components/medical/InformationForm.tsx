//@ts-nocheck
"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useMedicalProgram, useMedicalServices } from "@/store/useMedical";
import { useEffect, useState } from "react";

const formSchema = z.object({
  serviceId: z.string({
    required_error: "Please select a service.",
  }),
  program: z.string({
    required_error: "Please select a progam.",
  }),
  status: z.string({
    required_error: "Please select a marital status.",
  }),
});

const InformationForm = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const [isServicesAvailable, setIsServicesAvailable] =
    useState<boolean>(false);
  const [serviceID, setServiceID] = useState<string>("");
  // form instance
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: "",
      program: "",
      status: "",
    },
  });

  // console.log(serviceID);
  const {
    loading,
    success,
    data: medicalData,
    getMedicalServices,
  } = useMedicalServices();

  const { data: medicalProgram, getMedicalProgram } = useMedicalProgram();

  useEffect(() => {
    const countryID = localStorage.getItem("countryId");
    getMedicalServices();
    getMedicalProgram({
      serviceId: "4",
      countryId: countryID,
    });
    // console.log(serviceID);
  }, [getMedicalServices, getMedicalProgram, serviceID]);

  // console.log(medicalData);
  // console.log(medicalProgram);

  //   Handle form submission
  const onSubmit = (data: any) => {
    // console.log(data);
    router.push(`${currentPath}/?step=plan`);
  };

  return (
    <div className="info-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 space-y-0 mb-5">
                <FormLabel className="font-normal">
                  Which Medical Service Are You Interested In?
                </FormLabel>
                <Select
                  onValueChange={(e: any) => {
                    field.onChange;
                    setServiceID(e);
                    setIsServicesAvailable(true);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[50px] rounded border border-[#98A2B3]">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {medicalData[0]?.service?.map(
                      (content: any, index: any) => {
                        return (
                          <SelectItem key={index} value={content?.serviceId}>
                            {content?.service}
                          </SelectItem>
                        );
                      },
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {isServicesAvailable ? (
            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 space-y-0 mb-5">
                  <FormLabel className="font-normal">
                    Which Program Best Describes Your Need?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-[50px] rounded border border-[#98A2B3]">
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {medicalProgram[0]?.program?.map(
                        (content: any, index: any) => {
                          return (
                            <SelectItem key={index} value={content?.programId}>
                              {content?.title}
                            </SelectItem>
                          );
                        },
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 space-y-0 mb-5">
                <FormLabel className="font-normal">Marital Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[50px] rounded border border-[#98A2B3]">
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="py-6 bg-primary600 text-white hover:bg-primary700 rounded w-full"
          >
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InformationForm;
