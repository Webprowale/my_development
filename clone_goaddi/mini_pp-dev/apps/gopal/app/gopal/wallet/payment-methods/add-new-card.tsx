"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  cardNo: z.string().length(16, {
    message: "card no must be at least 16 characters.",
  }),
  cardholderName: z.string().min(1, { message: "card must have a owner" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
    message: "Invalid expiry date format (MM/YY)",
  }),
  cvc: z.string().length(3, { message: "cvc must be three digits" }),
  country: z.string().min(2, { message: "select country" }),
  address: z.string().min(2, { message: "input a correct address" }),
  state: z.string().min(2, { message: "select state" }),
  city: z.string().min(2, { message: "select city" }),
  zip: z.string().min(6, { message: "input a correct zip" }),
  gender: z.string().min(2, { message: "select country" }),
});

// const form = useForm

const AddToCardForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cardNo: "",
      cardholderName: "",
      expiryDate: "",
      cvc: "",
      country: "",
      address: "",
      state: "",
      city: "",
      zip: "",
      gender: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div className="p-4">
      <p className="font-bold">Add New payment method</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 p-4 space-y-6 border"
        >
          <div className="flex flex-col space-y-5">
            <FormField
              control={form.control}
              name="cardNo"
              render={({ field }) => (
                <FormItem className="w-[80%]">
                  <FormLabel className="text-sm font-thin relative">
                    Card Number
                  </FormLabel>
                  <FormControl>
                    <FieldInput
                      field={field}
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      max={16}
                      className="h-12 border-gray-400 w-full px-3 border outline-offset-0 focus-visible:bg-none  focus-visible:border-primary600 rounded-sm  outline-none"
                    />
                  </FormControl>
                  <FormMessage className="md:text-xs text-xs mt-6 font-thin" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem className="w-[80%]">
                  <FormLabel className="text-sm font-thin relative">
                    Cardholder Name
                  </FormLabel>
                  <FormControl>
                    <FieldInput
                      field={field}
                      type="text"
                      placeholder="John Doe"
                      className="h-12 border-gray-400 w-full px-3 border outline-offset-0 focus-visible:bg-none  focus-visible:border-primary600 rounded-sm  outline-none"
                    />
                  </FormControl>
                  <FormMessage className="md:text-xs text-xs mt-6 font-thin" />
                </FormItem>
              )}
            />

            <div className="flex flex-row items-center space-x-3 w-[80%]">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem className="w-[80%]">
                    <FormLabel className="text-sm font-thin relative">
                      Expiry Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        className="h-12 border-gray-400 w-full px-3 border focus-visible:bg-none  focus-visible:border-primary600 rounded-sm  outline-none"
                      />
                    </FormControl>
                    <FormMessage className="md:text-sm text-xs mt-6 font-thin" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem className="w-[80%]">
                    <FormLabel className="text-sm font-thin relative">
                      CVC/CVV
                    </FormLabel>
                    <FormControl>
                      <FieldInput
                        field={field}
                        type="text"
                        max={3}
                        placeholder="3-digits"
                        className="h-12 border-gray-400 w-full px-3 border focus-visible:bg-none  focus-visible:border-primary600 rounded-sm  outline-none"
                      />
                    </FormControl>
                    <FormMessage className="md:text-sm text-xs mt-6 font-thin" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col">
              <p className="font-bold py-3">Billing Address</p>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className=" w-[80%]">
                    <FormLabel className="text-sm font-thin relative">
                      Country
                    </FormLabel>
                    <FormControl className="mt-2">
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
                          <SelectItem value="mr">Nigeria</SelectItem>
                          <SelectItem value="mrs">Ghana</SelectItem>

                          <SelectItem value="others">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="md:text-xs text-xs mt-2 font-thin" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-[80%]">
                  <FormLabel className="text-sm font-thin relative">
                    Address Line 1
                  </FormLabel>
                  <FormControl>
                    <FieldInput
                      field={field}
                      type="text"
                      placeholder="Billing address"
                      className="h-12 border-gray-400 w-full px-3 border outline-offset-0 focus-visible:bg-none  focus-visible:border-primary600 rounded-sm  outline-none"
                    />
                  </FormControl>
                  <FormMessage className="md:text-xs text-xs mt-6 font-thin" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-[80%]">
                  <FormLabel className="text-sm font-thin relative">
                    Address Line 2 (Optional)
                  </FormLabel>
                  <FormControl>
                    <FieldInput
                      field={field}
                      type="text"
                      placeholder=""
                      className="h-12 border-gray-400 w-full px-3 border outline-offset-0 focus-visible:bg-none  focus-visible:border-primary600 rounded-sm  outline-none"
                    />
                  </FormControl>
                  <FormMessage className="md:text-xs text-xs mt-6 font-thin" />
                </FormItem>
              )}
            />

            <div className="flex space-x-3 w-[80%]">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className=" w-[80%]">
                    <FormLabel className="text-sm font-thin relative">
                      State
                    </FormLabel>
                    <FormControl className="mt-2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full  h-12 focus:border-primary600  border-gray-400 focus-visible:bg-none focus-visible:border-primary600  rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0">
                          <SelectValue
                            placeholder="Choose State"
                            className="text-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent  focus:outline-none outline-none"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mr">Nigeria</SelectItem>
                          <SelectItem value="mrs">Canada</SelectItem>

                          <SelectItem value="others">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="md:text-xs text-xs mt-2 font-thin" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className=" w-[80%]">
                    <FormLabel className="text-sm font-thin relative">
                      City
                    </FormLabel>
                    <FormControl className="mt-2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full  h-12 focus:border-primary600  border-gray-400 focus-visible:bg-none focus-visible:border-primary600  rounded-sm  outline-none  focus-visible:outline-none focus-visible:ring-0">
                          <SelectValue
                            placeholder="Choose City"
                            className="text-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent  focus:outline-none outline-none"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mr">Nigeria</SelectItem>
                          <SelectItem value="mrs">Ghana</SelectItem>

                          <SelectItem value="others">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="md:text-xs text-xs mt-2 font-thin" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem className="w-[80%]">
                  <FormLabel className="text-sm font-thin relative">
                    Zip Code
                  </FormLabel>
                  <FormControl>
                    <FieldInput
                      field={field}
                      type="text"
                      placeholder="Enter Zip Code"
                      className="h-12 border-gray-400 w-full px-3 border outline-offset-0 focus-visible:bg-none  focus-visible:border-primary600 rounded-sm  outline-none"
                    />
                  </FormControl>
                  <FormMessage className="md:text-xs text-xs mt-6 font-thin" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-[80%]">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddToCardForm;

export const FieldInput = ({
  type,
  placeholder,
  className,
  field,
  max,
}: {
  field: any;
  type: string;
  className: string;
  placeholder: string;
  max?: number;
}) => {
  return (
    <div className="">
      <Input
        {...field}
        className={cn(
          "border focus:border-2 focus:border-primary600 rounded-sm text-sm mt-px w-full",
          className,
        )}
        placeholder={placeholder}
        type={type}
        maxLength={max}
      />
    </div>
  );
};
