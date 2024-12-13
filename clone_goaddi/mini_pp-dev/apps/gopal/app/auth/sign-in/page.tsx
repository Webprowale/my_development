import React from "react";
import SignInForm from "./components/signin-form";
import AuthImageCarousel from "../components/carousel";
import AuthLayout from "../components/authLayout";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <AuthLayout
      question="Are you new to GoPaddi?"
      answer="Sign Up"
      form={<SignInForm />}
      google={true}
      googleText="Sign in with Google"
      title="Sign In."
      subTitle="Welcome Back!"
      description="Ready to take control? Sign in to your GoPaddi account."
      answerLink="/auth/sign-up"
      right={<AuthImageCarousel />}
    />
  );
};

export default SignIn;
