"use client";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ProfilePicture from "../profile-picture/ProfilePicture";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
// import { PopoverContent } from "@radix-ui/react-popover";
import { PopoverContent } from "@/components/ui/popover";
import {
  CalendarBlank,
  MapPin,
  MapPinLine,
  SpinnerGap,
} from "@phosphor-icons/react";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/schema/onboarding";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  checkUsername,
  goPalOnboardProfile,
} from "@/axios/endpoints/onboarding.endpoint";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { GoAuthButton } from "@/components/goui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [picLink, setPicLink] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<string>("");
  const [userLoading, setUserLoading] = useState(false);

  const router = useRouter();

  // form instance
  const form = useForm<any>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      city: "",
      dob: "",
      gender: "",
      phone: "",
    },
  });

  const watchUsername = form.watch("username");

  // Username Check
  useEffect(() => {
    const username = form.getValues("username");
    console.log("Username", username);

    const checkUsernameFunc = async () => {
      setUserLoading(true);
      const { message, success } = await checkUsername({
        username,
        for: "personal",
      });

      setUserLoading(false);
      console.log("Username check", message, success);

      if (watchUsername.length < 4) {
        setUsernameAvailable("");
      } else if (success) {
        setUsernameAvailable("Username available!");
      } else {
        setUsernameAvailable("Oops! Username already in use.");
      }
    };
    if (username) {
      checkUsernameFunc();
    }
  }, [watchUsername]);

  // Handle the form on submit
  const onSubmit = async (values: any) => {
    const loadingId = toast.loading("Setting up your profile");

    setLoading(true);
    console.log("Profile Values", values);

    if (!mediaFiles.length) {
      return;
    }

    console.log("lol");
    const formData = new FormData();
    console.log(mediaFiles);

    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append(`file${i}`, mediaFiles[i]);
    }

    // Uploading Post
    const filesresponse = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const links = filesresponse?.data?.data[0].file;

    const profileReqBody = {
      accountType: "gopal",
      dob: values.dob.toISOString().split("T")[0],
      ...values,
    };

    const profileResponse = await goPalOnboardProfile(profileReqBody);

    setPicLink(links);

    console.log(profileResponse);

    if (profileResponse.success) {
      toast.success("Profile set up successfully", {
        id: loadingId,
        duration: 2000,
      });

      router.push("/onboarding/gopal?step=interest");
    }

    setLoading(false);

    console.log("Upload Data", links);
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="font-semibold text-[2.25rem] text-[#1D2433]">
          Profile Setup
        </h1>
        <p className="text-[#676E7E] font-medium">
          Welcome to Gopaddi! set up your profile
        </p>
      </header>
      {/* Page form */}
      <Form {...form}>
        <form
          className="profile-setup grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage className="md:text-xs text-xs mt-2" />
                <FormDescription>
                  {userLoading ? (
                    <span className="inline-flex gap-1">
                      <SpinnerGap
                        size={20}
                        className="animate-spin text-gray-700"
                      />{" "}
                      Checking Username
                    </span>
                  ) : (
                    <span
                      className={`${usernameAvailable ? "text-green-600" : "text-red-600"}`}
                    >
                      {usernameAvailable}
                    </span>
                  )}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal">City</FormLabel>
                <div className="field relative">
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Enter city name"
                        className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                        {...field}
                      ></Input>
                    </FormControl>
                    <span className="icon absolute top-[50%] right-3 translate-y-[-50%]">
                      <MapPin size={15} />
                    </span>
                  </div>
                  <FormMessage className="md:text-xs text-xs mt-2" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col z-10">
                <FormLabel className="text-sm font-normal">
                  Set date of birth
                </FormLabel>
                <Popover>
                  <div className="field relative">
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full text-center min-h-[50px] items-center justify-start  font-normal hover:bg-transparent opacity-100 border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Enter your date of birth</span>
                          )}
                          <CalendarBlank
                            size={15}
                            className="icon absolute top-[50%] right-3 translate-y-[-50%]"
                          />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-10" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        fromYear={1800}
                        toYear={2024}
                        selected={field.value}
                        onSelect={field.onChange}
                        className="bg-[#fff] w-full shadow-md shadow-gray-300 rounded-sm "
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </div>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  Set date of birth
                </FormLabel>
                <div className="field relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full text-center min-h-[50px] items-center justify-start text-[#98A2B3] hover:text-[#98A2B3] font-normal hover:bg-transparent opacity-100 border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                      >
                        {field.value ? (
                          field.value
                        ) : (
                          <span>Enter you date of birth</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="z-10 ">
                      <Calendar
                        // mode="single"
                        // captionLayout="dropdown"
                        captionLayout="dropdown-buttons"
                        fromYear={1800}
                        toYear={2024}
                        {...form}
                        className="bg-[#fff] w-full shadow-md shadow-gray-300 rounded-sm "
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <span className="icon absolute top-[50%] right-3 translate-y-[-50%]">
                    <CalendarBlank size={15} />
                  </span>
                </div>
              </FormItem>
            )}
          ></FormField> */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal relative">
                  <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                    *
                  </span>
                  Choose gender
                </FormLabel>
                <div className="field relative">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none">
                        <SelectValue
                          placeholder="Select your gender"
                          className="text-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="md:text-xs text-xs mt-2" />
                </div>
              </FormItem>
            )}
          ></FormField>
          {/* <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  Phone Number
                </FormLabel>
                <div className="field relative">
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      inputMode="tel"
                      className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage className="md:text-xs text-xs mt-2" />
                </div>
              </FormItem>
            )}
          ></FormField> */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full mt-px">
                <FormControl>
                  <div className="w-full">
                    <label
                      htmlFor="Phone number"
                      className="text-sm w-full relative"
                    >
                      Phone number
                      <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                        *
                      </span>
                    </label>
                    <PhoneInput
                      defaultCountry="ng"
                      {...field}
                      className="phoneInput w-full"
                      inputClassName="w-full border-gray-400 focus-visible:bg-none focus-visible:border-primary600 focus-visible:outline-primary600 rounded-sm   outline-none  focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                    />
                  </div>
                </FormControl>
                <FormMessage className="md:text-base text-sm mt-6" />
              </FormItem>
            )}
          />
          <div className="custom-field col-start-1 col-end-3">
            <div>
              <div className="text-base font-normal">
                Personal profile picture
              </div>
              <ProfilePicture
                name="picture"
                label="Upload"
                classes="col-start-1 col-end-3"
                setMediaFiles={setMediaFiles}
              />
            </div>
          </div>

          <GoAuthButton
            type="submit"
            disabled={loading || userLoading || !mediaFiles.length}
            loading={loading}
            className="w-full py-3 md:text-sm mt-8 font-medium transition-all col-start-1 col-end-3"
          >
            Next
          </GoAuthButton>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
