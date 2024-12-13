"use client";

import EditProfile from "@/components/gobusiness/settings/EditProfile";
import Unlink from "@/components/gobusiness/settings/Unlink";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { useSearchParams } from "next/navigation";
import React from "react";

const SettingsContainer = () => {
  const mode = useSearchParams();

  return (
    <section
      className=""
      id="settings"
    >
      <SettingsHeader
        heading=""
        subheading="Settings"
        tabLink={links}
      />

      {mode.get("tab") === "edit-profile" && <EditProfile />}
      {mode.get("tab") === "unlink" && <Unlink />}
    </section>
  );
};
const links = [
  {
    id: 1,
    name: "Edit Profile",
    tabName: "edit-profile",
    isActive: false,
  },
  {
    id: 2,
    name: "Unlink",
    tabName: "unlink",
    isActive: true,
  },
];

export default SettingsContainer;
