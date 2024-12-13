"use client";

import SettingsHeader from "@/components/settings/SettingsHeader";
import { Switch } from "@/components/ui/switch";

const Notification = () => {
  return (
    <main className="pb-10">
      <SettingsHeader
        heading="settings"
        subheading="notifications"
        tabLink={links}
      />

      <section className="general px-6 ">
        <h2 className="py-7 text-sm text-[#1D2433]">General</h2>
        {settingsActions.general.map((item: any, index: number) => (
          <div
            className="flex items-center justify-between w-full md:w-[60%]"
            key={index}
          >
            <div className="text flex flex-col gap-1 mb-5">
              <h3 className="font-medium text-[#1D2433]">{item.title}</h3>
              <p className="font-normal text-[#676E7E] text-sm">
                {item.subtitle}
              </p>
            </div>
            <div className="switch">
              <Switch
                className="bg-primary600"
                checked={item?.value}
              />
            </div>
          </div>
        ))}
      </section>
      <section className="general px-6 ">
        <h2 className="py-7 text-sm text-[#1D2433]">Social Activity</h2>
        {settingsActions.social.map((item: any, index: number) => (
          <div
            className="flex items-center justify-between w-full md:w-[60%]"
            key={index}
          >
            <div className="text flex flex-col gap-1 mb-5 last-of-type:mb-0">
              <h3 className="font-medium text-[#1D2433]">{item.title}</h3>
              <p className="font-normal text-[#676E7E] text-sm">
                {item.subtitle}
              </p>
            </div>
            <div className="switch">
              <Switch className="bg-primary600" />
            </div>
          </div>
        ))}
      </section>
      <section className="general px-6 ">
        <h2 className="py-7 text-sm text-[#1D2433]">Social Activity</h2>
        {settingsActions.social.map((item: any, index: number) => (
          <div
            className="flex items-center justify-between w-full md:w-[60%]"
            key={index}
          >
            <div className="text flex flex-col gap-1 mb-5 last-of-type:mb-0">
              <h3 className="font-medium text-[#1D2433]">{item.title}</h3>
              <p className="font-normal text-[#676E7E] text-sm">
                {item.subtitle}
              </p>
            </div>
            <div className="switch">
              <Switch className="data-[state=checked]:bg-primary600" />
            </div>
          </div>
        ))}
      </section>
      <section className="general px-6 ">
        <h2 className="py-7 text-sm text-[#1D2433]">Trips and Activities</h2>
        {settingsActions.trips.map((item: any, index: number) => (
          <div
            className="flex items-center justify-between w-full md:w-[60%]"
            key={index}
          >
            <div className="text flex flex-col gap-1 mb-5 last-of-type:mb-0">
              <h3 className="font-medium text-[#1D2433]">{item.title}</h3>
              <p className="font-normal text-[#676E7E] text-sm">
                {item.subtitle}
              </p>
            </div>
            <div className="switch">
              <Switch className="bg-primary600" />
            </div>
          </div>
        ))}
      </section>
      <section className="general px-6 ">
        <h2 className="py-7 text-sm text-[#1D2433]">Reminders</h2>
        {settingsActions.trips.map((item: any, index: number) => (
          <div
            className="flex items-center justify-between w-full md:w-[60%]"
            key={index}
          >
            <div className="text flex flex-col gap-1 mb-5 last-of-type:mb-0">
              <h3 className="font-medium text-[#1D2433]">{item.title}</h3>
              <p className="font-normal text-[#676E7E] text-sm">
                {item.subtitle}
              </p>
            </div>
            <div className="switch">
              <Switch className="bg-primary600" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

// Tab links
const links = [
  {
    id: 1,
    name: "Notifications",
    tabName: "notifications",
    isActive: false,
  },
];

// Page settings texts based on categories
const settingsActions = {
  general: [
    {
      title: "Email",
      subtitle: "Notifications sent to the your email address.",
      value: true,
    },
    {
      title: "Push Notifications",
      subtitle: "Notifications sent to the your mobile device",
      value: true,
    },
    {
      title: "In-Site Notifications",
      subtitle: "Notifications displayed on the website",
      value: true,
    },
  ],
  social: [
    {
      title: "New posts from users you follow",
      subtitle: "Stay informed about new content.",
    },
    {
      title: "Comments on your posts",
      subtitle: "Get notified when someone interacts with your posts.",
    },
    {
      title: "Replies to your comments",
      subtitle: "See responses to your comments directly.",
    },
    {
      title: "Tagging your username",
      subtitle: "Be notified when someone mentions you",
    },
  ],
  trips: [
    {
      title: "Flight booking confirmations and updates",
      subtitle: "Get flight information straight to your inbox",
    },
    {
      title: "Hotel booking confirmations and updates",
      subtitle: "Receive hotel confirmation and updates ",
    },
    {
      title: "Activity booking confirmations and updates",
      subtitle: "See confirmation and updates for your booked activities ",
    },
    {
      title: "Itinerary changes",
      subtitle: "Get notified about any changes to your travel plans",
    },
    {
      title: "Trip cancellation notices",
      subtitle: "Receive immediate notification about trip cancellations",
    },
  ],
  reminders: [
    {
      title: "Trip reminders ",
      subtitle: "Get reminders about your upcoming trips",
    },
    {
      title: "Activity reminders",
      subtitle: "Receive reminders for your booked activities",
    },
  ],
};

export default Notification;
