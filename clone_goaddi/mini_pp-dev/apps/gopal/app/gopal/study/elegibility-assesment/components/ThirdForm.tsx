"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  getStudyCheckEligibility,
  getStudyQuestionnairies,
} from "@/axios/endpoints/study.endpoint";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "@/components/goui/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import NoProgramFound from "./NoProgramFound";
import { useState } from "react";
import ModalLayout from "./ModalLayOut";

const schema = yup.object({
  option1: yup.string().required("This field is required"),
  option2: yup.string().required("This field is required"),
  option3: yup.string().required("This field is required"),
  option4: yup.string().required("This field is required"),
  option5: yup.string().required("This field is required"),
  option6: yup.string().required("This field is required"),
});

type SchemaTypes = yup.InferType<typeof schema>;

export function ThirdForm({ information }: { information: any }) {
  const [isOpen, setIsOpen] = useState(true);
  const searchParams = useSearchParams();
  const noPrograms = searchParams.get("not-found");
  const router = useRouter();
  const form = useForm<SchemaTypes>({
    resolver: yupResolver(schema),
    defaultValues: {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      option5: "",
      option6: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getStudyCheckEligibility"],
    queryFn: () =>
      getStudyCheckEligibility({
        degreeId: information?.degreeId,
        categoryId: information?.categoryId,
        countryId: information?.countryId,
        streamId: information?.streamId,
        programId: information?.programId,
        maritalStatus: information?.maritalStatus,
      }),
  });

  const { mutateAsync, isPending: isStudyQuestionnairiesPending } = useMutation(
    {
      mutationFn: getStudyQuestionnairies,
    },
  );

  async function onSubmit(values: SchemaTypes) {
    const logId = data.data[0]?.logId;
    const answers = [
      values.option1,
      values.option2,
      values.option3,
      values.option4,
      values.option5,
      values.option6,
    ];

    const result = {
      logId,
      answers,
    };

    mutateAsync(result).then((res: any) => {
      if (res.status === "200") {
        router.push(
          `/gopal/study/courses?logId=${logId}&qtn1=${values.option1}&qtn2=${values.option2}&qtn3=${values.option3}&qtn4=${values.option4}&qtn5=${values.option5}&qtn6=${values.option6}`,
        );
      }

      if (res.status === "404") {
        router.push(
          `/gopal/study/elegibility-assesment?tab=Post-graduate&not-found=no_program_found`,
        );
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-10"
      >
        {!isLoading ? (
          <>
            {data?.data[0]?.questionnaires?.map((value: any, index: number) => {
              const optionName = `option${index + 1}` as keyof SchemaTypes;

              return (
                <FormField
                  control={form.control}
                  name={optionName}
                  render={({ field }) => (
                    <FormItem
                      id={optionName}
                      className="flex items-center justify-between w-full space-x-4"
                    >
                      <FormLabel className="">{value?.question}</FormLabel>
                      <FormControl className="pl-2 justify-end space-x-2">
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex"
                        >
                          {value.options
                            ? value.options.map(
                                (option: any, index: number) => (
                                  <FormItem
                                    key={index}
                                    className="flex items-center space-x-3"
                                  >
                                    <FormControl>
                                      <RadioGroupItem
                                        value={`${option.option},${option.point}`}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option.option}
                                    </FormLabel>
                                  </FormItem>
                                ),
                              )
                            : null}
                        </RadioGroup>
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              );
            })}
          </>
        ) : (
          <div className="space-y-8">
            {[...Array(6)].map((item, index) => (
              <Skeleton key={index} className="h-5 w-full" />
            ))}
          </div>
        )}
        <button
          type="submit"
          className="py-2 w-full md:text-sm bg-primary600 text-white rounded"
        >
          {isStudyQuestionnairiesPending ? <Spinner /> : "Get Matched"}
        </button>
      </form>

      {noPrograms === "no_program_found" && (
        <ModalLayout
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModalRoute={
            "/gopal/study/elegibility-assesment?tab=eligibility-assessment"
          }
        >
          <NoProgramFound closeModal={() => setIsOpen(false)} />
        </ModalLayout>
      )}
    </Form>
  );
}
