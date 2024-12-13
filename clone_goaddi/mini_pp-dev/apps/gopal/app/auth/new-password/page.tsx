import React from "react";
// import SignInForm from "../components/signin-form";
import AuthImageCarousel from "../components/carousel";
import AuthLayout from "../components/authLayout";
import NewPasswordForm from "./components/new-password-form";
import NewPassIllustrator from "./components/illustrator";

type Props = {};

const NewPassword = (props: Props) => {
  return (
    <AuthLayout
      question="Are you new to GoPaddi?"
      answer="Sign Up"
      form={<NewPasswordForm />}
      google={false}
      title="Set new password"
      // subTitle="Welcome Back!"
      description="To ensure security, please choose a new password that has not been used for this account before."
      answerLink="/auth/sign-up"
      right={<NewPassIllustrator />}
    />
  );
};

export default NewPassword;
