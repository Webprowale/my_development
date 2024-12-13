import JoinUs from "@/components/home/join";
import ProductBenefit from "@/components/home/pages/products/benefits";
import ProductsHero from "@/components/home/pages/products/hero";
import Footer from "@/components/home/footer";
import React from "react";

type Props = {};

const GopalLanding = (props: Props) => {
  return (
    <>
      <ProductsHero />
      <ProductBenefit />
      <div className="mt-20 mb-20">
        <JoinUs />
      </div>
      <Footer />
    </>
  );
};

export default GopalLanding;
