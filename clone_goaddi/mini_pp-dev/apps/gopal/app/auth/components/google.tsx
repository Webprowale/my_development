"use client";
import React from "react";
import Motion from "./motion";
import { Button } from "@/components/ui/button";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { string } from "zod";
import axios from "axios";
import { googleAuth } from "@/axios/endpoints/auth.endpoint";
import { getBrowserName, getPlatformName } from "@/utils/device";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";
import { decodeJwtResponse } from "@/utils/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  googleText: string;
};

const GoogleAuth = ({ googleText }: Props) => {
  const router = useRouter();

  const { setUser } = useAuthStore((state: any) => ({ ...state }));

  delete axios.defaults.headers.common["Userid"];
  const signUp = useGoogleLogin({
    onSuccess: async ({ access_token, scope }) => {
      try {
        // Get Google Data
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${access_token}` } },
        );

        await onGoogleAuth(userInfo, router, setUser);
      } catch (error) {
        toast.success("Something went wrong!");
      }
    },
  });

  return (
    <Motion>
      <Button
        className="text-sm inline-flex gap-3 font-medium w-full h-12 border-gray-400 rounded-sm text-gray-800"
        variant="outline"
        onClick={() => signUp()}
      >
        <img src="/assets/google.png" className="w-5 h-5" alt="Google Icon" />{" "}
        {googleText}
      </Button>
    </Motion>
  );
};

export default GoogleAuth;

export const OnTapGoogle = () => {
  const router = useRouter();
  const { setUser } = useAuthStore((state) => ({ ...state }));
  delete axios.defaults.headers.common["Userid"];
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      console.log(credentialResponse);

      const userInfo = await decodeJwtResponse(credentialResponse.credential);
      // Google Data
      // const { email, family_name, given_name, picture } = userInfo?.data;
      await onGoogleAuth(userInfo, router, setUser);
      console.log("User Info", userInfo);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return <div className=""></div>;
};

const onGoogleAuth = async (
  userInfo: any,
  router: AppRouterInstance,
  setUser: any,
) => {
  try {
    // Google Data

    const { email, family_name, given_name, picture } = userInfo?.data;

    console.log("User Info", userInfo);

    // Ip & Location data from IPAPI
    // const ipapi = (await axios.get(`https://ipapi.co/json`)) as any;

    delete axios.defaults.headers.common["Userid"];
    const ipapi = await axios.get("https://ipapi.co/json");

    const { ip, country_name, country_code, region, region_code } = ipapi?.data;

    // Browser & Platform Informations
    const browser = getBrowserName();
    const platform = getPlatformName();

    //  Send the UserData to server and redirect
    const googleRes = await googleAuth({
      email: email,
      fname: given_name,
      lname: family_name,
      media: "google",
      membership: "gopal",
      browser: browser,
      platform: platform,
      picture,
      device: platform,
      ip_address: ip,
      location: `${region} ${region_code}, ${country_name} ${country_code}`,
    });

    const { success } = googleRes as any;
    console.log(googleRes);

    if (success) {
      setUser({
        userId: googleRes?.data[0]?.user[0]?.Userid,
        ...googleRes?.data[0]?.user[0],
      });

      await axios.post("/api/auth", {
        userId: googleRes?.data[0]?.user[0]?.Userid,
      });

      toast.success("You have successfully logged in!");
      setTimeout(() => {
        // router.refresh();
        // router.refresh();
        router.push("/gopal?mode=refresh");
      }, 1000);
    } else {
      toast.error("Something went wrong!");
    }

    console.log("Gopaddi Res", googleRes);

    console.log({
      ip,
      browser,
      platform,
      ...userInfo?.data,
      country_code,
      country_name,
      region,
      region_code,
    });
  } catch (error) {
    toast.error("Something went wrong!");
    console.log(error);
  }
};
