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
import { CalendarBlank, MapPin, MapPinLine } from "@phosphor-icons/react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerGap } from "@phosphor-icons/react";
import {
  checkUsername,
  goFamilyOnboardProfile,
} from "@/axios/endpoints/onboarding.endpoint";
import { toast } from "sonner";
import axios from "axios";
import { GoAuthButton } from "@/components/goui/button";

const FamilyForm = () => {
  const [loading, setLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [picLink, setPicLink] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<string>("");
  const [userLoading, setUserLoading] = useState(false);

  const router = useRouter();

  // form instance
  const form = useForm<any>({
    // resolver: zodResolver(),
    defaultValues: {
      family_name: "",
      email: "",
      staff_size: "",
      username: "",
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
      } else if (!success && !watchUsername) {
        setUsernameAvailable("");
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
    console.log("Family Values", values);

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
      logo: links,
      size: values.staff_size,
      name: values.family_name,
      username: values.username,
      email: values.email,
    };

    const profileResponse = await goFamilyOnboardProfile(profileReqBody);

    setPicLink(links);

    console.log(profileResponse);

    if (profileResponse.success) {
      toast.success("Profile set up successfully", {
        id: loadingId,
        duration: 2000,
      });

      router.push("/onboarding/gopal?step=interest");
    } else if (
      profileResponse?.error_code === "1002" &&
      !profileResponse?.success
    ) {
      toast.info("You don't have a GoFamily Account", {
        id: loadingId,
        duration: 2000,
      });
    }

    setLoading(false);

    console.log("Upload Data", links);
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="font-semibold text-[2.25rem] text-[#1D2433]">
          Family Profile Setup
        </h1>
        <p className="text-[#676E7E] font-medium">
          Welcome to Gopaddi! set up your profile for your family
        </p>
      </header>
      {/* Page form */}
      <Form {...form}>
        <form
          className="profile-setup grid grid-cols-1 md:grid-cols-2 gap-8"
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
                      Checking User
                    </span>
                  ) : (
                    <span
                      className={`${usernameAvailable === "Username available!" ? "text-green-600" : "text-red-600"}`}
                    >
                      {watchUsername === "" ? "" : usernameAvailable}
                    </span>
                  )}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="family_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  Family name
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
                <FormLabel className="text-base font-normal">Email</FormLabel>
                <div className="field relative">
                  <Input
                    placeholder="your@email.com"
                    type="email"
                    className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                    {...field}
                  ></Input>
                </div>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="staff_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal relative">
                  <span className="text-red-600 absolute -top-px -right-1.5 text-xs">
                    *
                  </span>
                  Staff Size
                </FormLabel>
                <div className="field relative">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none">
                        <SelectValue
                          placeholder="Select staff size"
                          className="text-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">
                          Small Family (1 - 2 members)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium Family (3 - 4 members)
                        </SelectItem>
                        <SelectItem value="Large">
                          Large Family (1 - 2 members)
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
            <div>
              <div className="text-base font-normal">
                Family profile picture
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

export default FamilyForm;
