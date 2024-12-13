"use client";

import SettingsHeader from "@/components/settings/SettingsHeader";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormField,
//   FormControl,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, SealCheck, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AccountStatus from "./AccountStatus";

import { useForm } from 'react-hook-form';
// @ts-ignore
import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useMutation, useQuery } from "@tanstack/react-query";
import { getrequestVerificationStatusApi, requestVerificationApi } from "@/axios/endpoints/user.endpoint";
import { toast } from "sonner";
import { isValidURL } from "@/utils";

// {"success":true,"message":"Request is pending"} pending
// {"success":true,"message":"Request is accepted"} accepted
// {"success":true,"message":"Request is denied"} accepted

const Accounts = () => {
  const mode = useSearchParams();
  return (
    <main>
      <SettingsHeader
        heading="settings"
        subheading="Accounts"
        tabLink={links}
      />

      {mode.get("tab") === "verify" && <VerifyMe />}
      {mode.get("tab") === "account-status" && <AccountStatus />}
    </main>
  );
};

const VerifyMe = () => {
  const [isVerify, setIsVerify] = useState(false);

  const closeVerifyModal = () => {
    setIsVerify(false);
  };
  const [status,setStatus] = useState<'pending'|'accepted'|'denied'>('pending');
  const {isLoading,data} = useQuery({
    queryKey:['getrequestVerificationStatusApi'],
    queryFn:getrequestVerificationStatusApi,
    
  })
  // 
  useEffect(()=>{
    if(data){
      if(data.message.toLowerCase()==='request is pending'){
        setStatus('pending')
        return 
      }
      if(data.message.toLowerCase()==='request is accepted'){
        setStatus('accepted')
        return 
      }
    setStatus('denied')

    }
  },[data])
  console.log(data)
  return (
    <>
      <section className="grid grid-cols-[2fr_1fr]">
        <div className="left p-5 border-r border-r-[#E4E7EC]">
          <div className="header bg-[#E7F0FF] p-4 rounded flex items-start gap-3 mb-5">
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className=""
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <p className="w-full md:w-[70%] text-sm leading-normal mb-4">
                <span className="font-semibold">Jane Doe</span>, unlock your
                verification badge by verifying your account
              </p>
              <Button
                variant={"default"}
                type="button"
                className="bg-primary600 text-white text-xs py-2 font-normal px-10 rounded hover:bg-primary700"
                onClick={e => {
                  e.preventDefault()
                  console.log("Helllow world")
                  setIsVerify(true);
                }}
              >
                Verify
              </Button>
            </div>
            <Image
              src={"/assets/verify-icons.svg"}
              width={128}
              height={108}
              alt=""
              className="ml-auto"
            />
          </div>
          <p className="text-sm text-[#1D2433]">
            At GoPaddi, verification helps users identify trusted and genuine
            accounts. To be eligible for verification, your account must meet
            the following criteria:
          </p>
          <ul className="text-sm text-[#1D2433] list-inside list-disc flex flex-col gap-8 mt-7 ml-3">
            <li>
              <span className="font-semibold">Minimum Account Age: </span>Your 
              account must be at least 3 months old. This helps ensure accounts
              have a history on our platform and are not newly created.
            </li>
            <li>
              <span className="font-semibold">Authentic Representation:  </span>
              Your account should accurately represent yourself or your
              organization. We do not verify accounts impersonating others.
            </li>
            <li>
              <span className="font-semibold">Reason for Verification:  </span>
              Briefly explain why you believe your account should be verified.
              This helps us understand your motivations and how verification can
              benefit the platform.
            </li>
            <li>
              <span className="font-semibold">Social Media Linking: </span>
               Connect your account to verified social media profiles on
              reputable platforms (e.g., Instagram, Twitter with a blue
              checkmark). This provides external verification of your identity
              or brand.
            </li>
          </ul>

          {/* Note on the page */}
          <div className="text-[#324A76] p-4 rounded bg-[#E0EAFB] mt-10 text-xs leading-relaxed">
            We take account verification seriously at Gopadi. Our team carefully
            examines all verification requests against our guidelines. However,
            meeting all the requirements doesn't guarantee getting verified. We
            also consider the value your account brings to the Gopadi community
            and the potential impact of verification. Our goal is to be clear
            about the verification process. We may update the guidelines from
            time to time to keep the system fair and effective.
          </div>
        </div>
        <div className="right p-5">
          <div className="verify-stage relative bg-[#F9FAFB] p-4 rounded border border-[#E4E7EC]">
            <div className="img relative w-max">
              <Avatar className="w-[100px] h-[100px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <SealCheck
                size={32}
                weight="fill"
                className="text-primary600 bg-white absolute bottom-0 right-0"
              />
            </div>
            <Progress
            status={status}
            // value={33}
             className="min-h-[15px] my-5 " />

            <p className="text-sm">
              Your account verification is in progress. We will notify you once
              it's complete.
            </p>

            <span className={`tag inline-block  text-xs font-semibold py-2 px-4 rounded absolute top-4 right-5
                ${status=='pending'?'bg-[#FEF4E6] text-[#865503]':''}
                ${status=='accepted'?'bg-[#E7F6EC] text-[#036B26]':''}
                ${status=='denied'?'bg-[#FBEAE9] text-[#9E0A05]':''}   
            `}>
              
              {status=='pending'?'in progress':''}
              {status=='accepted'?'Completed':''}
              {status=='denied'?'Unsuccessful':''}
            </span>
          </div>
        </div>
      </section>

      {/* {isVerify ? <VerifyModal close={closeVerifyModal} />:''} */}
      {isVerify ? <VerifyModal close={closeVerifyModal} />:''}
    </>
  );
};



const VerfyAccount = yup.object({
  "fbId":yup.string(),
  "twitterId":yup.string(),
  "tiktokId":yup.string(),
  "linkedinId":yup.string(),
  "instaId":yup.string(),
  "file":yup.string(),
  "comments":yup.string().required()
})
export type VerfyAccountI = yup.InferType<typeof VerfyAccount>
const VerifyModal = ({ close }: { close: () => void }) => {
  // close modal
  const closeModal = () => {
    close();
  };

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<"tel" | "password">("password");

  const {
    register,watch,
    handleSubmit,setValue,setError,
    formState: { errors },
  } = useForm<VerfyAccountI>({
    resolver: yupResolver(VerfyAccount),
    defaultValues:{
      file:"#"
    }
  });
  const {mutate,isPending} =useMutation({
    mutationFn:requestVerificationApi,
    onSuccess:()=>{
      closeModal()
      toast.success("Request created")
    },
    onError:()=>{
      toast.error('Something went wrong, please try again')
    }
  })
   
  //   Submit
  const onSubmit =  (data: VerfyAccountI) => {
    
    if(data.fbId &&  isValidURL(data.fbId) ==false  ){
      setError('fbId',{type:'value',message:'. Invalid or wrong url'})
      return 
    }
    if(data.instaId && isValidURL(data.instaId) ==false){
      setError('instaId',{type:'value',message:'. Invalid or wrong url'})
      return 
    }
    if(data.linkedinId && isValidURL(data.linkedinId) ==false){
      setError('linkedinId',{type:'value',message:'. Invalid or wrong url'})
      return 
    }
    if(data.twitterId && isValidURL(data.twitterId) ==false){
      setError('twitterId',{type:'value',message:'. Invalid or wrong url'})
      return 
    }
    if(data.tiktokId && isValidURL(data.tiktokId) ==false){
      setError('tiktokId',{type:'value',message:'. Invalid or wrong url'})
      return 
    }
    mutate(data)
  };
  // console.log({errors})

  return (
    <div className="grid place-items-center fixed inset-0 w-full h-screen backdrop-blur-sm bg-[#00000089] z-50">
      <div className="text-message__modal bg-white w-full md:w-[35%] p-6 rounded animate-scaleUp">
        <header className="relative z-10 mb-4">
          <Image
            src={`/assets/modal-seal.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Verify Account</h3>
          <p className="text-sm text-[#647995] w-full md:w-[68%]">
            Fill in the necessary details to verify your account
          </p>
          <X
            size={22}
            weight="bold"
            className="absolute right-0 top-[10px] cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        <div className="">
          {/* <Form
           {...form}
          > */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" w-full flex flex-col gap-4"
            >
              {/* <FormField
                // control={form.control}
                name="reason"
                render={({ field }) => (
                  <div className="w-full mb-2">
                    <label className="font-normal text-left text-sm">
                      Reason for verification
                    </label>
                    <FormControl className="flex items-start justify-center">
                      <div className="relative">
                        <Textarea
                          placeholder="Briefly explain why you believe your account should be verified (This helps us understand your motivations and how verification can benefit the platform.)"
                          className="min-h-[120px] !border !border-[#98A2B3] focus:border-primary700 text-xs placeholder:text-[#98A2B3]  focus-visible:ring-transparent focus:outline-none rounded"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="md:text-sm text-xs self-start" />
                  </div>
                )}
              ></FormField> */}
                 <div className="w-full mb-2">
                    <label className="font-normal text-left text-sm">
                      Reason for verification
                    </label>
                    {/* <FormControl className="flex items-start justify-center"> */}
                      <div className="relative">
                        <Textarea
                          placeholder="Briefly explain why you believe your account should be verified (This helps us understand your motivations and how verification can benefit the platform.)"
                          className="min-h-[120px] !border !border-[#98A2B3] focus:border-primary700 text-xs placeholder:text-[#98A2B3]  focus-visible:ring-transparent focus:outline-none rounded"
                          {...register('comments')}
                       errorMessage={errors?.comments?.message}
                       errorTitle="Reason for verification"
                       />
                       
                      </div>
                    {/* </FormControl> */}
                    <div className="md:text-sm text-xs self-start" />
                  </div>
              <h3 className="font-semibold">Social Media Links</h3>

              <div className="flex gap-6">
              <div className="w-full mb-2">
                      <label className="font-normal text-left text-sm">
                        Instagram profile link
                      </label>
                      {/* <FormControl className="flex items-start justify-center"> */}
                        <div className="relative">
                          <Input
                            placeholder=""
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...register('instaId')}
                       errorMessage={errors?.instaId?.message}
                       errorTitle="Instagram profile link"

                          ></Input>
                        </div>
                      {/* </FormControl> */}
                      <div className="md:text-sm text-xs self-start" />
                    </div>
                    <div className="w-full mb-2">
                      <label className="font-normal text-left text-sm">
                        Facebook profile link
                      </label>
                      {/* <FormControl className="flex items-start justify-center"> */}
                        <div className="relative">
                          <Input
                            placeholder=""
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...register('fbId')}
                            errorMessage={errors?.fbId?.message}
                       errorTitle="Facebook profile link"

                          ></Input>
                        </div>
                      {/* </FormControl> */}
                      <div className="md:text-sm text-xs self-start" />
                    </div>
              </div>

              <div className="flex gap-6">
              <div className="w-full mb-2">
                      <label className="font-normal text-left text-sm">
                        Linkedin profile link
                      </label>
                      {/* <FormControl className="flex items-start justify-center"> */}
                        <div className="relative">
                          <Input
                            placeholder=""
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...register('linkedinId')}
                            errorMessage={errors?.linkedinId?.message}
                            errorTitle="linkedinId profile link"
                          ></Input>
                        </div>
                      {/* </FormControl> */}
                      <div className="md:text-sm text-xs self-start" />
                    </div>
                    <div className="w-full mb-2">
                      <label className="font-normal text-left text-sm">
                        X(twitter) profile link
                      </label>
                      {/* <FormControl className="flex items-start justify-center"> */}
                        <div className="relative">
                          <Input
                            placeholder=""
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...register('twitterId')}
                            errorMessage={errors?.twitterId?.message}
                            errorTitle="X(twitter) profile link"
                          ></Input>
                        </div>
                      {/* </FormControl> */}
                      <div className="md:text-sm text-xs self-start" />
                    </div>
              </div>

              
              <div className="flex gap-6">
              <div className="w-full mb-2">
                      <label className="font-normal text-left text-sm">
                        Ticktok profile link
                      </label>
                      {/* <FormControl className="flex items-start justify-center"> */}
                        <div className="relative">
                          <Input
                            placeholder=""
                            className="min-h-[50px] border-[#98A2B3] focus:border-primary700 focus-visible:ring-transparent focus:outline-none rounded"
                            {...register('tiktokId')}
                            errorMessage={errors?.tiktokId?.message}
                            errorTitle="Ticktok profile link"
                          ></Input>
                        </div>
                      {/* </FormControl> */}
                      <div className="md:text-sm text-xs self-start" />
                    </div>

              </div>



              <div className="flex items-center justify-end mb-2">
                <Button
                  variant={"default"}
                  className="ml-auto px-16 py-6 bg-primary600 text-white font-normal  hover:bg-primary700 mt-2 rounded text-sm"
                  type="submit"
                
                >
                  {
                    isPending?
                    'Verifying..':'Verify'
                  }
                  
                </Button>
              </div>
            </form>
          {/* </Form> */}
        </div>
      </div>
    </div>
  );
};

const links = [
  {
    id: 1,
    name: "Account Details",
    tabName: "account-details",
    isActive: false,
  },
  {
    id: 2,
    name: "Connect & Switch",
    tabName: "connect",
    isActive: true,
  },
  {
    id: 3,
    name: "Verify Me",
    tabName: "verify",
    isActive: true,
  },
  {
    id: 4,
    name: "Account Status",
    tabName: "account-status",
    isActive: true,
  },
];

export default Accounts;
