import Navbar from "@/components/home/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CompanyLayout = ({ children }: Props) => {
  return (
    <main className="bg-white">
      <Navbar />
      {children}
    </main>
  );
};

export default CompanyLayout;
