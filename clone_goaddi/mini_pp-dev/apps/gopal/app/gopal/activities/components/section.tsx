import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const SectionLayout: React.FC<Props> = ({ children, title, description }) => {
  return (
    <section className="px-6 py-4 bg-white">
      <div className="grid gap-1 mb-4">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
      {children}
    </section>
  );
};

export default SectionLayout;
