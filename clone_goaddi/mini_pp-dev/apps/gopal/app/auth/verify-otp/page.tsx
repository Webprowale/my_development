import React from "react";
import OtpForm from "../components/otp-form";
import Illustrator from "../components/illustrator";
import AuthLayout from "../components/authLayout";

type Props = {};

const VerifyOTP = async (props: Props) => {
  return (
    <AuthLayout
      form={<OtpForm />}
      title="Verify OTP"
      description={`Enter the one time password sent to your registered email address.`}
      right={<Illustrator />}
    />
  );
};

export default VerifyOTP;
