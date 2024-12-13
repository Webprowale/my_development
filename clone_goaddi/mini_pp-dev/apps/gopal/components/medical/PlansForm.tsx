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

const formSchema = z.object({
  service: z.string({
    required_error: "Please select a service.",
  }),
});

const PlansForm = () => {
  const router = useRouter();
  const currentPath = usePathname();

  // form instance
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
    },
  });

  //   Handle form submission
  const onSubmit = (data: any) => {
    console.log(data);
    router.push(`${currentPath}/?step=plan&success=true`);
  };

  return (
    <div className="info-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 space-y-0 mb-5">
                <FormLabel className="font-normal">
                  Have you made any hospital arrangement in Canada?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[50px] rounded border border-[#98A2B3]">
                      <SelectValue placeholder="Have you made any hospital arrangement?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PlansForm;
