"use client";
import { AiOutlineUser } from "react-icons/ai";
import { C_Button } from "./button";
import Input from "./form/input";
import Select from "./form/select";
import Textarea from "./form/textarea";
import EditIcon from "./icons/edit";
import Button from "@/components/goui/button";
import { getProfileAPi, profileEditApi } from "@/axios/endpoints/user.endpoint";
import { useForm } from "react-hook-form";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/components/goui/spinner";
import { SpinnerGap } from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { uploadFilesApi } from "@/axios/endpoints/uploader.endpoint";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { checkUsername } from "@/axios/endpoints/onboarding.endpoint";
import axios from "axios";
import { showApiErrors } from "@/axios";
import getUser from "@/lib/get-user";
import { useAuthStore } from "@/store/useAuthStore";

const profileSchema = z.object({
    firstName: z.string(),//
    lastName: z.string(),//
    userName: z.string(),//
    city: z.string(),//
    emailAddress: z.string(),
    dateOfBirth: z.string(),
    // dateOfBirthFormat: z.string(),
    gender: z.string(),//
    phoneNumber: z.string(),//
    profilePicture: z.string().optional(),//
    bio:z.string(),//
    coverPicture:z.string().optional()//

  })
  .required();
type profileSchemaType = z.infer<typeof profileSchema>;
function EditProfile({ setModalVisibilty }: { setModalVisibilty: any }) {
  const [usernameAvailable, setUsernameAvailable] = useState<string>("");
  const [userLoading, setUserLoading] = useState(false);
  const [loadingBanner,setLoadingBanner] = useState(false)
  const [loadingPicture,setLoadingPicture] = useState(false)
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profilePicture: "",
      gender: "male",
      bio:"",
      coverPicture:""
    },
  });
  const gender = watch("gender");
  const watchUsername = watch("userName");
  const picture = watch('profilePicture')
  const coverPicture = watch('coverPicture')
  const username = getValues("userName");

  const [userNameKeyboardTypeTrack,setUserNameKeyboardTypeTrack]= useState(null)
  // Username Check
  useEffect(() => {
    
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
    if(userNameKeyboardTypeTrack){
      if (username) {
        checkUsernameFunc();
      } 
    }
   

  }, [userNameKeyboardTypeTrack]);

  const client = useQueryClient();
  const { setUser } = useAuthStore((state: any) => ({ ...state }));

  // const route = useRouter()
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { data, isLoading: isGetting } = useQuery({
    queryKey: ["getProfileAPi",id],
    queryFn: () => getProfileAPi({ userId: `${id}` }),
    enabled: typeof id == "string",
    refetchOnWindowFocus: false,
  });
  const { mutate: UploadFile } = useMutation({
    mutationFn: uploadFilesApi,
    onSuccess: (d) => {
      console.log({ "Lanre Upload": d });
    },
  });
  useEffect(() => {
    if (data) {
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("userName", data.userName??'');
      // @ts-ignore
      setValue("city", data?.city);
      setValue("emailAddress", data.emailAddress);
      setValue("dateOfBirth", data.dateOfBirth);
      setValue("gender", data.gender);
      setValue("phoneNumber", data.phoneNumber);
      // @ts-ignore
      if(data?.bio){
      // @ts-ignore
        setValue('bio',data.bio)
      }
      if (data?.profilePicture?.length !== 0) {
        setValue("profilePicture", data.profilePicture);
      } else {
        setValue("profilePicture", "");
      }

      // @ts-ignore
      if (data?.coverPicture?.length !== 0) {
      // @ts-ignore
        setValue("coverPicture", data.coverPicture);
      } else {
        setValue("coverPicture", "");
      }
      // console.log({'from query':data})
    }
  }, [data]);
  const { mutate: updateProfile } = useMutation({
    mutationFn: profileEditApi,
    onSuccess: (d) => {
      setIsLoading(false);
      // console.log({d})
      if(d?.length!==0){
        //so if it not 0 then there is error
        showApiErrors(d[0]?.errors)
        return 
      }
      toast.success("Profile Saved");
      const newUserInfo = getValues();
      setUser({
        email: newUserInfo.emailAddress,
        phone: newUserInfo.phoneNumber,
        gender: newUserInfo.gender,
        picture: newUserInfo.profilePicture,
      })
      // @ts-ignore
      client.invalidateQueries("getProfileAPi");
    },
    onError: () => {
      setIsLoading(false);

      toast.error("Something went wrong please try again");
    },
  });
  const handleUploadImage = async (e: any,name:string) => {
    // console.log({'file to Upload':e.target.files[0]})
    const file = e.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      toast.error('file size to large, limit is 5mb')
      return
    }
    // const form = new FormData();
    console.log({'type':typeof e.target.files,file})
    // form.append("file1",  e.target.files);
    // UploadFile(form);
    const mediaFiles =[file]
    const formData = new FormData();
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append(`file${i}`, mediaFiles[i]);
    }
     // Uploading Post

    //  setIsLoading(true)
    if(name==='coverPicture'){
      setLoadingBanner(true)
     }else{
      setLoadingPicture(true)
     }
    const filesresponse = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if(name==='coverPicture'){
      setLoadingBanner(false)
     }else{
      setLoadingPicture(false)
      
     }

    const link = filesresponse?.data?.data;
    if(link){
      // @ts-ignore
      setValue(name,link[0].file)
    }
    console.log({filesresponse})
  };

  const onSubmit = (data: profileSchemaType) => {
    // console.log({data})
    setIsLoading(true);
    // console.log({data})
    updateProfile({
      ...data,
      accountType: "gopal",
    });
  };
  if (isGetting) {
    return <Spinner />;
  }
  // console.log({errors})
  return (
    <div>
      <img
        className="absolute top-0 w-full h-fit z-[-1]"
        src="/assets/modal-lines.svg"
        alt="modal-lines"
      />

      <img src="/assets/profile_main.png" />

      <DialogHeader>
        <DialogTitle className="mt-2 text-xl">Edit Profile</DialogTitle>
        <DialogDescription className="text-sm max-w-md mb-12">
          Edit your profile page
        </DialogDescription>

        <div className="pt-5 h-[450px] overflow-y-auto">
          <div className="my-6 border rounded p-2">
            <div className="relative">
              {/* <img
                src="/assets/thumbnail_image.svg"
                className="w-full rounded"
                alt="banner"
              /> */}
              {
                coverPicture?.length !== 0?
                <img
                src={coverPicture}
                className="w-full rounded h-[150px] object-cover"
                // style={{border:'1px solid red'}}
                alt="banner"
              />:
              // <img
              //   src="/assets/thumbnail_image.svg"
              //   className="w-full rounded h-[150px] object-cover "
              //   alt="banner"
              // />
              <div
              className="w-full rounded h-[150px] object-cover bg-white"
              
              >

              </div>
              }

              <C_Button className="bg-white absolute top-5 right-5 rounded-full">
                <label htmlFor="banner_img" className="">
                    {
                      loadingBanner?<Spinner />:<EditIcon />
                    }
                    <input
                  type="file"
                  className="hidden"
                  id="banner_img"
                  accept="image/png, image/jpeg"
                  onChange={e=>handleUploadImage(e,'coverPicture')}
                />
                  </label>
              </C_Button>

              <div className="absolute -bottom-10 left-10">
                {/* <img
                    src="/assets/avatar-edit-profile.png"
                    alt="profile image"
                    className="w-32 h-32 rounded-full border-4 border-white"
                  /> */}
                <div
                  className=" rounded-full bg-white  w-32 h-32 border-4 border-white"
                  // style={{'border':'1px solid red'}}
                >
                  {
                   picture?.length !== 0?
                    <img
                    src={picture}
                    alt="profile image"
                    className="w-32 h-32 rounded-full border-4 border-white"
                  />:
                  <Avatar
                  // className={size === "small" ? smallImage : mediumImage}
                  className={"h-[100%] w-[100%]"}
                >
                  {/* <AvatarImage src={avatar} fetchPriority="high" /> */}
                  <AvatarFallback className={"text-base uppercase"}>
                    {getInitials(`${data?.firstName} ${data?.lastName}`)}
                  </AvatarFallback>
                </Avatar>
                  }

                </div>
                <C_Button
                  // onClick
                  className="bg-white absolute bottom-0 right-0 rounded-full"
                >
                  <label htmlFor="c_button" className="">
                    {
                      loadingPicture?<Spinner />:<EditIcon />
                    }
                  </label>
                  <input
                  type="file"
                  className="hidden"
                  id="c_button"
                  accept="image/png, image/jpeg"
                  onChange={e=>handleUploadImage(e,'profilePicture')}
                />
                </C_Button>
                
              </div>
            </div>

            <p className="bg-blue-400/30 mt-12 px-3 py-6">
              We recommend using images sized at 1584 x 396 pixels&#40;JPG or
              PNG format&#41; for optimal display.
            </p>
          </div>

          <div className="grid w-full max-full items-center gap-1.5">
            {/* intert forms here */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full grid grid-cols-2 gap-6"
            >
              <div className="w-full col-span-2">
                <Input register={register("userName",{
                  onChange:(e)=>{
                    setUserNameKeyboardTypeTrack(e)
                  }
                })} label="Username" />
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
                      {watchUsername === "" ? "" : usernameAvailable}
                    </span>
                  )}
                </div>
              </div>
              <Input label="First Name" register={register("firstName")} />
              <Input label="Last Name" register={register("lastName")} />
              <Input label="Email" value={data?.emailAddress} 
              register={register("emailAddress")}
              />
              <Input label="City" register={register("city")} />
              <Input
                label="Date of Birth"
                type="date"
                register={register("dateOfBirth")}
              />

              {/* <p className="col-span-2">Choose who can see your birthday</p> */}
              <Input label="Phone" type="number" register={register("phoneNumber")} />
               
              {/* <div>
                  <Label className="flex mb-2">Gender</Label>
                  <Select
                  value={gender}
                  
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Percentage" />
                    </SelectTrigger>
                    <SelectContent
                    onChange={e=>{
                      console.log({"target":e.target})
                    }}
                    >
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
    </div> */}

              {/* <Select label="Year" options={[]} />
<Textarea label="Bio" className="w-full col-span-2" /> */}
              <Select
                value={gender}
                className="w-full col-span-2"
                label="Gender"
                options={[
                  { label: "Pick Gender", value: "" },
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                onChange={(e) => {
                  setValue("gender", e.target.value);
                }}
              />
               <Textarea 
                label="Bio"
                className="w-full col-span-2"

                register={register("bio")}
                />
              <div className="col-span-2 w-full flex justify-end gap-4 mb-8 py-5">
                <C_Button
                  onClick={(e) => {
                    e.preventDefault();
                    setModalVisibilty();
                  }}
                  className="bg-blue-300/30 text-blue-700 px-12 py-3"
                >
                  Cancel
                </C_Button>

                <C_Button
                  className="px-12 py-3 bg-blue-700 text-white"
                  type="submit"
                  isLoading={isLoading}
                  // profileEditApi
                >
                  Save
                </C_Button>
              </div>
            </form>
          </div>
        </div>
      </DialogHeader>
    </div>
  );
}

export default EditProfile;
