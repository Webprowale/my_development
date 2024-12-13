"use client";

import * as React from "react";

import { useEffect, useState } from "react";
import { C_Button } from "./button";
import EditIcon from "./icons/edit";
import ProfileInput from "../../profile/[id]/form/input";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Interests from "@/components/onboarding/interests/Interests";
import {
  AirplaneInFlight,
  Article,
  Chair,
  Chalkboard,
  ChalkboardSimple,
  Circle,
  House,
  Path,
  PersonSimple,
  PersonSimpleThrow,
  Pill,
  PlusCircle,
  SpinnerGap,
  SuitcaseRolling,
  SwimmingPool,
  Warehouse,
  Webcam,
  Wine,
} from "@phosphor-icons/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import Spinner from "@/components/goui/spinner";

import SettingsHeader from "@/components/settings/SettingsHeader";
import Modal from "@/components/goui/modal";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomInput from "./form/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkUsername } from "@/axios/endpoints/onboarding.endpoint";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserId } from "@/lib/get-userId";
import { getProfileAPi, profileEditApi } from "@/axios/endpoints/user.endpoint";
import axios from "axios";
import { getInitials } from "@/utils";
import { showApiErrors } from "@/axios";
import { toast } from "sonner";
import ModalLayout from "@/components/goui/modal-layout";

const profileSchema = z
  .object({
    firstName: z.string(), //
    lastName: z.string(), //
    userName: z.string(), //
    city: z.string(), //
    emailAddress: z.string(),
    dateOfBirth: z.string(),
    // dateOfBirthFormat: z.string(),
    gender: z.string(), //
    phoneNumber: z.string(), //
    profilePicture: z.string().optional(), //
    bio: z.string(), //
    coverPicture: z.string().optional(), //
  })
  .required();
type profileSchemaType = z.infer<typeof profileSchema>;

const ProfileSettings = () => {
  const mode = useSearchParams();
  const [userLoading, setUserLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<string>("");
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [loadingPicture, setLoadingPicture] = useState(false);
  const form = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profilePicture: "",
      gender: "male",
      bio: "",
      coverPicture: "",
    },
  });
  const id = getUserId();
  const [isLoading, setIsLoading] = useState(false);

  const gender = form.watch("gender");
  const watchUsername = form.watch("userName");
  const dateofbirth = form.watch("dateOfBirth");
  const picture = form.watch("profilePicture");
  const coverPicture = form.watch("coverPicture");
  const [userNameKeyboardTypeTrack, setUserNameKeyboardTypeTrack] =
    useState(null);

  useEffect(() => {
    const username = form.getValues("userName");
    // console.log("Username", username);

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
    if (userNameKeyboardTypeTrack) {
      if (username) {
        checkUsernameFunc();
      }
    }
  }, [userNameKeyboardTypeTrack]);
  const client = useQueryClient();
  const [date, setDate] = React.useState<Date>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function openModal(modalType: string) {
    setIsModalOpen(true);
    setModalState(modalType);
  }

  const { data, isLoading: isGetting } = useQuery({
    queryKey: ["getProfileAPi"],
    queryFn: () => getProfileAPi({ userId: `${id}` }),
    enabled: typeof id == "string",
    refetchOnWindowFocus: false,
  });

  // console.log({id,'tyoes':typeof id})
  useEffect(() => {
    if (data) {
      form.setValue("firstName", data.firstName);
      form.setValue("lastName", data.lastName);
      form.setValue("userName", data.userName ?? "");
      // @ts-ignore
      form.setValue("city", data?.city);
      form.setValue("emailAddress", data.emailAddress);
      form.setValue("dateOfBirth", data.dateOfBirth);
      form.setValue("gender", data.gender);
      form.setValue("phoneNumber", data.phoneNumber);
      // @ts-ignore
      if (data?.bio) {
        // @ts-ignore
        form.setValue("bio", data.bio);
      }
      if (data?.profilePicture?.length !== 0) {
        form.setValue("profilePicture", data.profilePicture);
      } else {
        form.setValue("profilePicture", "");
      }

      // @ts-ignore
      if (data?.coverPicture?.length !== 0) {
        // @ts-ignore
        form.setValue("coverPicture", data.coverPicture);
      } else {
        form.setValue("coverPicture", "");
      }
      // console.log({'from query':data})
    }
  }, [data]);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleChange = (interest: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedInterests((prevInterests) => [...prevInterests, interest]);
    } else {
      setSelectedInterests((prevInterests) =>
        prevInterests.filter((item) => item !== interest),
      );
    }
  };

  const { mutate: updateProfile } = useMutation({
    mutationFn: profileEditApi,
    onSuccess: (d) => {
      setIsLoading(false);
      // console.log({d})
      if (d?.length !== 0) {
        //so if it not 0 then there is error
        showApiErrors(d[0]?.errors);
        return;
      }
      toast.success("Profile Saved");
      // @ts-ignore
      client.invalidateQueries("getProfileAPi");
    },
    onError: () => {
      setIsLoading(false);

      toast.error("Something went wrong please try again");
    },
  });
  const handleUploadImage = async (e: any, name: string) => {
    // console.log({'file to Upload':e.target.files[0]})
    const file = e.target.files[0];
    // const form = new FormData();
    console.log({ type: typeof e.target.files, file });
    // form.append("file1",  e.target.files);
    // UploadFile(form);
    const mediaFiles = [file];
    const formData = new FormData();
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append(`file${i}`, mediaFiles[i]);
    }
    // Uploading Post

    //  setIsLoading(true)
    if (name === "coverPicture") {
      setLoadingBanner(true);
    } else {
      setLoadingPicture(true);
    }
    const filesresponse = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (name === "coverPicture") {
      setLoadingBanner(false);
    } else {
      setLoadingPicture(false);
    }

    const link = filesresponse?.data?.data;
    if (link) {
      // @ts-ignore
      form.setValue(name, link[0].file);
    }
    // console.log({filesresponse})
  };

  const onSubmit = (data: profileSchemaType) => {
    // console.log({data})
    // console.log({data})
    setIsLoading(true);
    updateProfile({
      ...data,
      accountType: "gopal",
    });
  };

  // if (isGetting) {
  //   return <Spinner />;
  // }
  console.log({ erro: form.formState.errors });
  return (
    <section id="security" className="">
      <SettingsHeader heading="settings" subheading="Profile" tabLink={links} />
      {mode.get("tab") === "edit-profile" ? (
        <div className="md:flex grid gap-[2rem] p-4">
          <div className="md:w-2/6 w-full my-4 h-[301px] md:order-2 order-1">
            <div className="grid gap-14 border border-[#E4E7EC] rounded-sm">
              <div className="relative bg-primary">
                {coverPicture?.length !== 0 ? (
                  <img
                    src={coverPicture}
                    className="w-full rounded h-[138px] object-cover"
                    alt="banner"
                  />
                ) : (
                  <div className="w-full rounded h-[138px] object-cover bg-primary-500"></div>
                )}
                <C_Button
                  className="bg-white absolute top-5 right-5 rounded-full"
                  onClick={() => openModal("banner")}
                >
                  <label htmlFor="banner_img" className="">
                    {loadingBanner ? <Spinner /> : <EditIcon />}
                  </label>
                </C_Button>
                <div className="absolute -bottom-14 left-10">
                  {picture?.length !== 0 ? (
                    <img
                      src={picture}
                      alt="profile image"
                      className="w-36 h-36 rounded-full border-4 border-white"
                    />
                  ) : (
                    <div>
                      <Avatar className="w-36 h-36">
                        <AvatarFallback className="text-base uppercase">
                          {getInitials(`${data?.firstName} ${data?.lastName}`)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <C_Button
                    className="bg-white absolute bottom-10 -right-4 rounded-full"
                    onClick={() => openModal("profile")}
                  >
                    <label htmlFor="c_button" className="">
                      {loadingPicture ? <Spinner /> : <EditIcon />}
                    </label>
                  </C_Button>
                </div>
              </div>
              <div className="text-start text-sm font-medium bg-[#E0EAFB] text-[#324A76] p-4 m-2 mt-6">
                We recommend using images sized at 1584 x 396 pixels (JPG or PNG
                format) for optimal display.
              </div>
            </div>
          </div>

          <div className="flex md:w-4/6 w-full md:order-1 order-2 md:mt-0 -mt-4">
            <Form {...form}>
              <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row gap-6 py-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
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
                      <FormItem className="w-full md:w-1/2">
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
                </div>
                <div className="flex flex-col md:flex-row gap-6 py-4">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel className="font-normal text-left text-sm">
                          Username
                        </FormLabel>
                        <FormControl>
                          <div>
                            <Input
                              value={watchUsername}
                              placeholder="Enter your username"
                              onChange={(e) => {
                                setUserNameKeyboardTypeTrack(e.target.value);
                                form.setValue("userName", e.target.value);
                              }}
                            />
                            <div>
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
                                  {watchUsername === ""
                                    ? ""
                                    : usernameAvailable}
                                </span>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel className="font-normal text-left text-sm">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-6 py-4">
                  <div className="w-full md:w-1/2">
                    <CustomInput
                      value={dateofbirth}
                      label="Date of Birth"
                      type="date"
                      onChange={(e) => {
                        form.setValue("dateOfBirth", e.target.value);
                      }}
                      className="flex flex-col w-full mt-2"
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel className="font-normal text-left text-sm">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-6 py-4">
                  <FormField
                    control={form.control}
                    name="emailAddress"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel className="font-normal text-left text-sm">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email " {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/2">
                        <FormLabel className="font-normal text-left text-sm">
                          Choose gender
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={gender}
                            onValueChange={(value) => {
                              form.setValue("gender", value);
                            }}
                          >
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
                <div className="flex flex-col md:flex-row py-4">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-normal text-left text-sm">
                          Bio
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell the world a little bit about yourself!"
                            className="min-h-[120px] !border-2 !border-gray-200 focus:!border-primary700 text-xs placeholder:text-[#98A2B3] focus-visible:ring-transparent focus:outline-none rounded"
                            onChange={(e) => {
                              form.setValue("bio", e.target.value);
                            }}
                            value={form.getValues("bio")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="block md:hidden mx-4">
                  <div className="flex gap-1 justify-between">
                    <Button
                      type="reset"
                      className="!px-8 !py-4 !rounded-sm !bg-[#E7F0FF] text-[#0D6EFD] w-full"
                    >
                      Reset
                    </Button>

                    <Button
                      type="submit"
                      className="!px-8 !py-4 !rounded-sm w-full"
                    >
                      {isLoading ? <Spinner /> : " Save Changes "}
                    </Button>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="flex justify-between items-end gap-1">
                    <div></div>
                    <div className="flex gap-1 w-3/6">
                      <Button
                        type="reset"
                        className="!px-8 !py-4 !rounded-sm !bg-[#E7F0FF] text-[#0D6EFD] w-full"
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        className="!px-8 !py-4 !rounded-sm w-full"
                      >
                        {isLoading ? <Spinner /> : " Save Changes "}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 md:grid-cols-8 gap-2 md:gap-3 w-full mb-10 p-4">
            {interestList.map((interest: any, index: number) => (
              <Interests
                key={index}
                id={interest.id}
                label={interest.label}
                icon={interest.icon}
                name="interest"
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="block md:hidden mx-4 mb-4">
            <div className="flex gap-1 justify-between">
              <Button
                type="reset"
                className="!px-8 !py-4 !rounded-sm !bg-[#E7F0FF] text-[#0D6EFD] w-full"
              >
                Reset
              </Button>

              <Button type="submit" className="!px-8 !py-4 !rounded-sm w-full">
                Save Changes
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex justify-between items-end gap-1 -mt-4 md:mr-4 mr-0">
              <div className=""></div>
              <div className="flex gap-1 w-2/6">
                <Button
                  type="reset"
                  className="!px-8 !py-4 !rounded-sm !bg-[#E7F0FF] text-[#0D6EFD] w-full"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="!px-8 !py-4 !rounded-sm w-full"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <ModalLayout
        isOpen={isModalOpen}
        setIsOpen={closeModal}
        closeModalRoute={""}
      >
        <img
          className="absolute top-0 w-full inset-0  z-[-1]"
          src="/assets/modal-lines.svg"
          alt="modal-lines"
        />
        <img
          src="/assets/settings/profile.svg"
          alt=""
          className="w-fit h-fit"
        />
        <DialogHeader>
          <DialogTitle className="mt-2 text-xl">
            {modalState == "banner"
              ? "Edit banner picture"
              : "Edit profile picture"}
          </DialogTitle>
          <DialogDescription className="text-sm max-w-md mb-12">
            {modalState == "banner"
              ? "Select a custom banner that reflects your style, or upload a photo directly from your device."
              : `Select a custom avatar that reflects your style, or upload a photo
            directly from your device.`}
          </DialogDescription>

          <div className="py-5 px-3">
            <div className="grid grid-cols-5 justify-center gap-2">
              <div className="flex flex-col gap-3 items-center justify-center border border-[#E4E7EC] py-[16px] px-[10px]">
                <p>
                  {modalState == "banner" ? (
                    <img src="/assets/profile/banner_pix.png" alt="" />
                  ) : (
                    <img src="/assets/settings/avatar_upload.png" alt="" />
                  )}
                </p>
                <p className="items-center">
                  <PlusCircle size={20} />
                </p>
              </div>
              {[...new Array(4)].map(() => (
                <div className="flex flex-col gap-3 items-center justify-center border border-[#E4E7EC] py-[16px] px-[10px]">
                  <p>
                    {modalState == "banner" ? (
                      <img alt="" src="/assets/profile/banner_img.png" />
                    ) : (
                      <img alt="" src="/assets/settings/avatar.png" />
                    )}
                  </p>

                  <p>
                    <Circle size={20} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 w-full flex justify-end gap-6">
            <C_Button className="px-12 py-3 bg-[#0D6EFD] text-white">
              Save
            </C_Button>
          </div>
        </DialogHeader>
      </ModalLayout>
    </section>
  );
};

const links = [
  {
    id: 1,
    name: "Edit Profile",
    tabName: "edit-profile",
    isActive: false,
  },
  {
    id: 2,
    name: "Interests",
    tabName: "interests",
    isActive: true,
  },
];

const interestList = [
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
  {
    id: "swim",
    label: "Swimming",
    icon: (
      <SwimmingPool
        size={25}
        weight="bold"
        className="interest-icon text-[#344054]"
      />
    ),
  },
];

export default ProfileSettings;
