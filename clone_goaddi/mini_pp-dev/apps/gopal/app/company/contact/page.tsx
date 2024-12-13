import Footer from "@/components/home/footer";
import JoinUs from "@/components/home/join";
import ContactHero from "@/components/home/pages/contact/hero";
import React from "react";

type Props = {};

const ContactPage = (props: Props) => {
  return (
    <>
      <ContactHero />
      <JoinUs />
      <Footer />
    </>
  );
};

export default ContactPage;
