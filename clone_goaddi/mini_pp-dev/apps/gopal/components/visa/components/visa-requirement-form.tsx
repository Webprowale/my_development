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
import { Spinner } from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";

const schema = yup.object({
  destination: yup.string().required("Destination is required"),
  visaType: yup.string().required("Visa type is required"),
});

type SchemaTypes = yup.InferType<typeof schema>;

export default function VisaRequirementForm({
  setFetchVisas,
  setIsFetching,
  setVisaTypeId,
  setDestinationId,
}: {
  setFetchVisas: React.Dispatch<SetStateAction<any>>;
  setDestinationId: React.Dispatch<SetStateAction<string>>;
  setVisaTypeId: React.Dispatch<SetStateAction<string>>;
  setIsFetching: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [visaTypes, setVisaTypes] = useState([]);
  const form = useForm<SchemaTypes>({
    resolver: yupResolver(schema),
    defaultValues: {
      destination: "",
      visaType: "",
    },
  });

  const { data: countries, isLoading: isCountriesDataLoading } = useQuery({
    queryKey: ["getVisaRequirement"],
    queryFn: () => getVisaCountry(),
  });

  const { mutateAsync, isPending: isVisaLoading } = useMutation({
    mutationFn: getVisaSearch,
  });

  const {
    mutateAsync: searchVisaTypesMutateAsync,
    isPending: isVisaTypePending,
  } = useMutation({
    mutationFn: getVisaRequirement,
  });

  const handleSearchVisa = async (countryId: string) => {
    mutateAsync({ countryId }).then((res: any) => {
      setVisaTypes(res?.data || []);
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
      setVisaTypeId(values.visaType);
      setIsFetching(isVisaTypePending);
      setDestinationId(values.destination);
    });
  }

  return (
    <Form {...form}>
      <form
        onClick={form.handleSubmit(onSubmit)}
        className="visa_hero-searchbar relative w-full min-h-20 p-8 bg-primary1100/40 rounded grid grid-cols-3 gap-3"
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
                      {/* <SelectLabel>Countries</SelectLabel> */}
                      {isCountriesDataLoading ? (
                        <p className="text-sm font-semibold">
                          Countries Loading...
                        </p>
                      ) : (
                        <>
                          {countries?.data?.map(
                            (country: any, index: number) => (
                              <SelectItem key={index} value={country.id}>
                                {country.title}
                              </SelectItem>
                            ),
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
                          {visaTypes.length !== 0 ? (
                            visaTypes?.map((type: any, index: number) => (
                              <SelectItem key={index} value={type.visaTypeId}>
                                {type.visaType}
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

        <Button className="w-full h-full" type="submit">
          {isVisaTypePending ? (
            <Spinner height={25} width={25} color="default" />
          ) : (
            "See Requirements"
          )}
        </Button>
      </form>
    </Form>
  );
}
