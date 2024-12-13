"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { MapPin, PencilSimpleLine } from "@phosphor-icons/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const editProfileSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    title: z.string(),
    city: z.string(),
    dob: z.string(),
    gender: z.string(),
  })
  .required();
type editProfileType = z.infer<typeof editProfileSchema>;

const EditProfile = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[minmax(0,65%)_minmax(0,35%)] p-6 gap-10 items-start h-full">
      <ProfileForm />
      <ProfileImages />
    </section>
  );
};

// The form fields on the edit profile tabs
const ProfileForm = () => {
  const form = useForm<editProfileType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      title: "",
      city: "",
      dob: "",
      gender: "",
    },
  });
  return (
    <div className="order-2 md:order-1">
      <Form {...form}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal text-left text-sm">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal text-left text-sm">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal text-left text-sm">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    inputMode="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal text-left text-sm">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    inputMode="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-normal text-left text-sm">
                  Job title
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your job title"
                    inputMode="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel className="font-normal text-left text-sm">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter city name"
                    inputMode="text"
                    {...field}
                  />
                </FormControl>
                <MapPin size={15} className="absolute right-3 bottom-[20%]" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel className="font-normal text-left text-sm">
                  Set date of birth
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your date of birth"
                    inputMode="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel className="font-normal text-left text-sm">
                  Choose gender
                </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-full border-2 border-gray-200">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select your gender</SelectLabel>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex">
          <Button
            variant="default"
            className="bg-primary600 text-white hover:bg-primary700 mt-12 ml-auto px-8 rounded"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

const ProfileImages = () => {
  return (
    <div className="p-[10px] border border=[#E4E7EC] rounded-[14px] order-1 md:order-2">
      <div className="relative">
        <div className="banner-section relative">
          <div className="bg-primary600 min-h-[138px] w-full rounded"></div>
          <label
            htmlFor="banner-img"
            className="bg-primary100 w-[44px] h-[44px] rounded-full grid place-items-center absolute top-6 right-6 cursor-pointer hover:bg-primary200 ease-in duration-200"
          >
            <PencilSimpleLine
              size={20}
              className="text-primary600"
              weight="bold"
            />
          </label>
          <input type="file" name="banner" id="banner" hidden />
        </div>

        <div className="absolute -bottom-[30px] left-[50px]">
          <div className="relative w-max ">
            <input type="file" name="profileImg" id="profile-img" hidden />
            <Avatar className="w-[100px] h-[100px] border-[4px] border-white">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                width={80}
                height={80}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <label
              htmlFor="profile-img"
              className="bg-primary100 w-[44px] h-[44px] rounded-full grid place-items-center absolute bottom-0 -right-2 cursor-pointer hover:bg-primary200 ease-in duration-200 border-[4px] border-white"
            >
              <PencilSimpleLine
                size={20}
                className="text-primary600"
                weight="bold"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Help text section */}
      <div className="text-sm bg-[#E0EAFB] p-5 font-medium rounded text-[#324A76] mt-16">
        <p>
          We recommend using images sized at 1584 x 396 pixels (JPG or PNG
          format) for optimal display.
        </p>
      </div>
    </div>
  );
};

export default EditProfile;
