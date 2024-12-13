import React from "react";
// import SignInForm from "../components/signin-form";
import AuthImageCarousel from "../components/carousel";
import AuthLayout from "../components/authLayout";
import ForgotForm from "./components/reset-otp-form";
import ResetIllustrator from "./components/illustrator";

type Props = {};

const ForgotPassword = (props: Props) => {
  return (
    <AuthLayout
      question="Are you new to GoPaddi?"
      answer="Sign Up"
      form={<ForgotForm />}
      google={false}
      title="Password Reset"
      // subTitle="Welcome Back!"
      description="We sent a code to johndoe@gmail.com."
      answerLink="/auth/sign-up"
      right={<ResetIllustrator />}
    />
  );
};

export default ForgotPassword;
