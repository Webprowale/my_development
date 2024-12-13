import SettingsHeader from "@/components/settings/SettingsHeader";
import { redirect } from "next/navigation";

const Settings = () => {
  return redirect("/gopal/settings/profile");
};

export default Settings;
