import React from "react";
// import SignInForm from "../components/signin-form";

import AuthLayout from "../components/authLayout";
import ForgotForm from "./components/forgot-form";
import ForgotIllustrator from "./components/illustrator";

type Props = {};

const ForgotPassword = (props: Props) => {
  return (
    <AuthLayout
      question="Are you new to GoPaddi?"
      answer="Sign Up"
      form={<ForgotForm />}
      google={false}
      title="Forgot Password"
      // subTitle="Welcome Back!"
      description="Don’t worry! It happens sometimes. Enter your email and we’ll send a password reset link."
      answerLink="/auth/sign-up"
      right={<ForgotIllustrator />}
    />
  );
};

export default ForgotPassword;
