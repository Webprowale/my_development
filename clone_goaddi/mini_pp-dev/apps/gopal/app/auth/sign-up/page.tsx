"use client";
import React from "react";
import SignUpForm from "./components/signup-form";
import AuthImageCarousel from "../components/carousel";
import AuthLayout from "../components/authLayout";
import { useSearchParams } from "next/navigation";

type Props = {};

const SignUp = (props: Props) => {
  // ?referralcode=6928173054
  const referral = useSearchParams().get("referralcode");
  console.log(referral);
  return (
    <AuthLayout
      question="Already have an account?"
      answer="Sign In"
      answerLink="/auth/sign-in"
      form={<SignUpForm referral={referral} />}
      google={true}
      googleText="Sign up with Google"
      title="Create an Account"
      description="Create your GoPaddi account and get started in minutes."
      right={<AuthImageCarousel />}
    />
  );
};

export default SignUp;
