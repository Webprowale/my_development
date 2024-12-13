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
import { PopoverContent } from "@radix-ui/react-popover";
import {
  CalendarBlank,
  MapPin,
  MapPinLine,
  SpinnerGap,
} from "@phosphor-icons/react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  checkUsername,
  goBusinessOnboardProfile,
  goPalOnboardProfile,
} from "@/axios/endpoints/onboarding.endpoint";
import "react-international-phone/style.css";
import { profileSchema } from "@/schema/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PhoneInput } from "react-international-phone";

const BusinessForm = () => {
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
      name: "",
      email: "",
      staffs: "",
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
      console.log("Username check", message);
      if (success) {
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

    const profileResponse = await goBusinessOnboardProfile(profileReqBody);

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
          Business Profile Setup
        </h1>
        <p className="text-[#676E7E] font-medium">
          Welcome to Gopaddi! Set up your Profile for your business
        </p>
      </header>
      {/* Page form */}
      <Form {...form}>
        <form className="profile-setup grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal relative">
                  <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                    *
                  </span>
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                    {...field}
                  ></Input>
                </FormControl>
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
                      {usernameAvailable
                        ? "Username available!"
                        : "Oops! Username already in use."}
                    </span>
                  )}
                </FormDescription>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal relative">
                  <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                    *
                  </span>
                  Business name
                </FormLabel>
                <div className="field relative">
                  <FormControl>
                    <Input
                      placeholder="Enter business name"
                      className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                      {...field}
                    ></Input>
                  </FormControl>
                </div>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal relative">
                  <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                    *
                  </span>
                  Email
                </FormLabel>
                <div className="field relative">
                  <Input
                    placeholder="your@email.com"
                    className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                    {...field}
                  ></Input>
                </div>
              </FormItem>
            )}
          ></FormField>
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
          <FormField
            control={form.control}
            name="staffs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal relative">
                  <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                    *
                  </span>
                  Staff size
                </FormLabel>
                <div className="field relative">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none">
                        <SelectValue
                          placeholder="Select your staff size"
                          className="text-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="freelancer">
                          Freelance (1 employee)
                        </SelectItem>
                        <SelectItem value="small">
                          Small Team (2 - 5 employees)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium Team (6 - 25 employees)
                        </SelectItem>
                        <SelectItem value="large">
                          Large Team (26 - 100 employees)
                        </SelectItem>
                        <SelectItem value="enterprise">
                          Enterprise (100+ employees)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="md:text-xs text-xs mt-2" />
                </div>
              </FormItem>
            )}
          ></FormField>

          <div className="custom-field col-start-1 col-end-3">
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">
                    Business profile picture
                  </FormLabel>
                  <ProfilePicture
                    name="profilePicture"
                    label="Upload"
                    classes="col-start-1 col-end-3"
                  />
                </FormItem>
              )}
            ></FormField>
          </div>

          <Button
            variant={"default"}
            type="submit"
            className="bg-primary600 w-full col-start-1 col-end-3 py-6 hover:bg-primary700"
          >
            Next
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BusinessForm;
