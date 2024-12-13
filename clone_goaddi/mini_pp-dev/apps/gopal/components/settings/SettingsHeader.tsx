import { ArrowLeft } from "@phosphor-icons/react";
import SettingsTab from "./SettingsTab";

const SettingsHeader = ({
  heading,
  subheading,
  tabLink,
}: {
  heading: string;
  subheading: string;
  tabLink: any;
}) => {
  return (
    <header className="">
      <div className="heading-section p-6 pb-4">
        <h1 className="text-sm text-[#676E7E] capitalize hidden md:block">
          {heading}
        </h1>

        <h2 className="text-xl font-semibold capitalize flex flex-row gap-2">
          {window.innerWidth < 768 && <ArrowLeft size={32} color="#000" />}
          {subheading}
        </h2>
      </div>

      {/* Tab sections */}
      <SettingsTab tabList={tabLink} />
    </header>
  );
};

export default SettingsHeader;
