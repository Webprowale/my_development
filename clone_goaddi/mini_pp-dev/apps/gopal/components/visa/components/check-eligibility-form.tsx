"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as yup from "yup";
import { GoAuthButton } from "@/components/goui/button";
import "react-international-phone/style.css";
import Motion from "@/animations/motion";
import { getCheckEligibility, visaSubmit } from "@/axios/endpoints/visa.endpoint";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Eligibility from "./svg/eligibility.svg"

const schema = yup.object({
  option1: yup.string().required("This field is required"),
  option2: yup.string().required("This field is required"),
  option3: yup.string().required("This field is required"),
  option4: yup.string().required("This field is required"),
});

type SchemaTypes = yup.InferType<typeof schema>;

const EligibilityForm = () => {
  const [loading, setLoading] = useState(false);
  const [eligibilities, setEligibities] = useState<any>([]);
  const searchParams = useSearchParams();
  const visaTypeId = searchParams.get("visa-type");
  const destinationId = searchParams.get("destination");
  const router = useRouter();

  useEffect(() => {
    const data = {
      visaTypeId,
      destinationId,
    };
    const fetchCheckEligibility = async () => {
      try {
        const result = await getCheckEligibility(data);
        setEligibities(result?.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCheckEligibility();
  }, []);

  const form = useForm<SchemaTypes>({
    resolver: yupResolver(schema),
    defaultValues: {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },
  });

  async function onSubmit(values: SchemaTypes) {
    const qutn1 = values.option1.split(",");
    const qutn2 = values.option2.split(",");
    const qutn3 = values.option3.split(",");
    const qutn4 = values.option4.split(",");
    const question = [qutn1[2], qutn2[2], qutn3[2], qutn4[2]];

    // don't break the string in the array else you alter the answer data keep it horizontal
    const answer = [
      `"${qutn1[0]},${qutn1[1]}","${qutn2[0]},${qutn2[1]}","${qutn3[0]},${qutn3[1]}","${qutn4[0]},${qutn4[1]}"`,
    ];

    const data = {
      logId: eligibilities[0]?.logId,
      question,
      answer,
    };

    const result = await visaSubmit(data);

    if(result && result.message.includes("successfully")){
      router.push(
        `/gopal/visa/0?visa-type=${visaTypeId}&destination=${destinationId}&status=eligibility-pass-successfully`,
      );
    }

    if(result && result.message.includes("not")){
      router.push(
        `/gopal/visa/0?visa-type=${visaTypeId}&destination=${destinationId}&status=eligibility-failed`,
      );
    }
  }

  return (
    <div className="bg-white">
      <div className="relative">
        <Image src={Eligibility} alt="check alt" className="absolute" />
        <img src="/assets/modal-lines.svg" alt="Horizontal Line Icon" />
      </div>

      <div className="">
        <p className="font-bold text-lg">Check Your Eligibility</p>
        <p className="text-gray-400 text-sm font-thin">
          Fill in your details below to find out if you are qualified for Canada
          Study Visa
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full mt-3"
        >
          {Array.isArray(eligibilities[0]?.questionnaires) && eligibilities ? (
            <>
              {eligibilities[0]?.questionnaires.map(
                (value: any, index: number) => {
                  const optionName = `option${index + 1}` as keyof SchemaTypes;

                  return (
                    <FormField
                      key={index}
                      control={form.control}
                      name={optionName}
                      render={({ field }) => (
                        <FormItem id={optionName}>
                          <FormLabel>{value?.question}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {value.options
                                ? value.options.map(
                                    (option: any, index: number) => (
                                      <SelectItem
                                        key={index}
                                        value={`${option.option},${option.point},${value.id}`}
                                      >
                                        {option.option}
                                      </SelectItem>
                                    ),
                                  )
                                : null}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                },
              )}
            </>
          ) : (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}

          <Motion>
            <GoAuthButton
              type="submit"
              className="w-full py-2 md:text-sm font-medium transition-all mt-1"
              loading={loading}
            >
              Submit
            </GoAuthButton>
          </Motion>
        </form>
      </Form>
    </div>
  );
};

export default EligibilityForm;


