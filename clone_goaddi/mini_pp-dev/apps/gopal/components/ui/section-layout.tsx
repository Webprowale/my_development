import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const SectionLayout: React.FC<Props> = ({ children, title, description }) => {
  return (
    <section className="p-4 bg-white">
      <div className="grid gap-1 mb-4 ml-3">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
      {children}
    </section>
  );
};

export default SectionLayout;
