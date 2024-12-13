import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const FlutterwavePay = () => {
  const config = {
    public_key: "FLWPUBK-**************************-X",
    tx_ref: "we3ewwdwwdwdwdwe3443.4.32",
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phone_number: "070********",
      name: "john doe",
    },
    customizations: {
      title: "Go Paddi",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response: any) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div>
      <h1>Testing flutter wave</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
};

export default FlutterwavePay;
