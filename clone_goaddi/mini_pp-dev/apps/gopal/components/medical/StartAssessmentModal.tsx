//@ts-nocheck
"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";
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
import { useMedicalCountries } from "@/store/useMedical";
import { useEffect } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  countryId: z.string({
    required_error: "Please select a designated country.",
  }),
});

const StartAssessmentModal = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const currentPath = usePathname();

  const { message, success, data, loading, getMedicalCountries } =
    useMedicalCountries();

  useEffect(() => {
    getMedicalCountries();
  }, [getMedicalCountries]);

  // console.log(data);

  // form instance
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryId: "",
    },
  });

  //   Handle form submission
  const onSubmit = (data: any) => {
    // if the country has not been selected
    // it would display an error
    if (data?.countryId === "") {
      toast.error("Select a country to proceed");
      return;
    }

    localStorage.setItem("countryId", data?.countryId);
    localStorage.setItem("country", data?.name?.lowercase());

    router.push(`${currentPath}/eligibility?step=info`);
  };

  return (
    <div className="fixed inset-0 w-full h-screen max-h-screen bg-[#00000079] grid place-items-center z-50 backdrop-blur-sm">
      <div className="bg-white w-full md:w-[38%] h-auto  max-h-[95vh] p-6 rounded overflow-auto scrollbar-thin">
        <header className="relative z-10 mb-8">
          <Image
            src={`/assets/modal-globe.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">
            Select Destination Country to Proceed
          </h3>

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

        {/* main section */}
        <section className="start">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0 mb-5">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select destination country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data[0]?.countries?.map((content: any, index: any) => {
                          return (
                            <SelectItem
                              className="capitalize"
                              id={index}
                              value={content?.id}
                            >
                              {content?.name?.toLowerCase()}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="py-3 bg-primary600 text-white hover:bg-primary700 rounded w-full">
                Start Assessment
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default StartAssessmentModal;
