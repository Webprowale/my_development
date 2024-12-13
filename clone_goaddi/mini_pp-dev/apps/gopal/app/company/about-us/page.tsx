import React from "react";
import CompanyHero from "@/components/home/pages/company/hero";
import CompanyJourney from "@/components/home/pages/company/journey";
import CompanyMission from "@/components/home/pages/company/mission";
import CompanyValues from "@/components/home/pages/company/values";
import JoinUs from "@/components/home/join";
import Footer from "@/components/home/footer";

type Props = {};

const Company = (props: Props) => {
  return (
    <>
      <CompanyHero />
      <CompanyJourney />
      <CompanyMission />
      <CompanyValues />
      <JoinUs />
      <Footer />
    </>
  );
};

export default Company;
