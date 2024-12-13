"use client";

import { Button } from "@/components/ui/button";
import React, { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import * as yup from "yup";
import {
  getVisaCountry,
  getVisaRequirement,
  getVisaSearch,
} from "@/axios/endpoints/visa.endpoint";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Spinner } from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import B3 from "@/components/ui/typography/b3";
import { Flex } from "@/components/ui/flex";

const schema = yup.object({
  destination: yup.string().required("Destination is required"),
  visaType: yup.string().required("Visa type is required"),
});

type SchemaTypes = yup.InferType<typeof schema>;

export default function VisaRequirementForm({
  setFetchVisas,
  setIsFetching,
}: {
  setFetchVisas: React.Dispatch<SetStateAction<any>>;
  setIsFetching: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [visaTypes, setVisaTypes] = useState([]);
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const router = useRouter();
  const form = useForm<SchemaTypes>({
    resolver: yupResolver(schema),
    defaultValues: {
      destination: "",
      visaType: "",
    },
  });

  const { data: countries, isLoading: isCountriesDataLoading } = useQuery({
    queryKey: ["getVisaCountry"],
    queryFn: () => getVisaCountry(),
  });

  const { mutateAsync, isPending: isVisaLoading } = useMutation({
    mutationFn: getVisaSearch,
  });

  const {
    mutateAsync: searchVisaTypesMutateAsync,
    isPending: isVisaTypePending,
  } = useMutation({
    mutationFn: getVisaSearch,
  });

  const handleSearchVisa = async (countryId: string) => {
    mutateAsync({ countryId }).then((res: any) => {
      setVisaTypes(res?.data);
    });
  };

  const handleDestinationChange = (value: any) => {
    form.setValue("destination", value);
    handleSearchVisa(value);
  };

  async function onSubmit(values: SchemaTypes) {
    const data = {
      countryId: values.destination,
      visaTypeId: values.visaType,
    };

    searchVisaTypesMutateAsync(data).then((res: any) => {
      setFetchVisas(res?.data || []);
      setIsFetching(isVisaTypePending);
    });
  }

  return (
    <div
      className={`${deviceType === "mobile" ? " w-full min-h-20 p-4 bg-primary1100/40 rounded" : ""}`}
    >
      <Form {...form}>
        <form
          onClick={form.handleSubmit(onSubmit)}
          className={`${
            deviceType === "tablet" || deviceType === "desktop"
              ? "w-full min-h-20 p-8 bg-primary1100/40 rounded visa_hero-searchbar relative grid grid-cols-1 md:grid-cols-3 gap-3"
              : "visa_hero-searchbar relative grid grid-cols-1 md:grid-cols-3 gap-3"
          }`}
        >
          <FormField
            control={form.control}
            name="destination"
            render={({ field, fieldState }) => (
              <FormItem id="destination">
                <FormControl>
                  <Select
                    onValueChange={(value) => handleDestinationChange(value)}
                  >
                    <SelectTrigger
                      className={`w-full ${fieldState.invalid ? "border-red-500 border" : ""}`}
                    >
                      <SelectValue placeholder="Destination Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {isCountriesDataLoading ? (
                          <p className="text-sm font-semibold">
                            Countries Loading...
                          </p>
                        ) : (
                          <>
                            {countries?.data?.map(
                              (country: any, index: number) => {
                                return (
                                  <SelectItem key={index} value={country?.id}>
                                    {country?.title}
                                  </SelectItem>
                                );
                              },
                            )}
                          </>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visaType"
            render={({ field, fieldState }) => (
              <FormItem id="visaType">
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger
                      className={`w-full ${fieldState.invalid ? "border-red-500 border" : ""}`}
                    >
                      <SelectValue placeholder="Visa Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {isVisaLoading ? (
                          <SelectItem value="Visas Loading..">
                            Visas Loading..
                          </SelectItem>
                        ) : (
                          <>
                            {visaTypes.length > 0 ? (
                              visaTypes?.map((type: any, index: number) => (
                                <SelectItem
                                  key={index}
                                  value={type?.visaTypeId}
                                >
                                  {type?.title}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="No visa found">
                                No visa found
                              </SelectItem>
                            )}
                          </>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            onClick={() => router.push("/gopal/visa?search=search-values")}
            className="w-full h-full"
            type="submit"
          >
            {isVisaTypePending ? (
              <Spinner height={25} width={25} color="default" />
            ) : (
              "See Requirements"
            )}
          </Button>
        </form>
      </Form>

      {deviceType === "mobile" ? (
        <div className="mt-[20px] flex flex-col gap-8">
          <div className="block space-y-3 md:space-y-0 md:gap-2 self-start md:flex md:items-center md:justify-center md:self-center">
            {[
              "Real Time Status Updates",
              "Dedicated Expert Help",
              "Complete Transparency",
            ].map((item, i) => (
              <Flex className="gap-3" key={i} gap={2}>
                <CheckCircle className="w-[16px] h-[16px] md:w-[28px] md:h-[28px] text-white/75" />
                <B3 className="font-bold text-sm text-white">{item}</B3>
              </Flex>
            ))}
          </div>

          <Flex gap={2} className="text-white place-content-center">
            <p className="font-normal text-sm">Provided by</p>
            <img
              className="w-[23.81px] h-[23.81px]"
              src="/assets/visa/Birdview.svg"
              alt="birdview logo"
            />
            <p className="font-bold text-sm">Birdview Travels</p>
          </Flex>
        </div>
      ) : null}
    </div>
  );
}
