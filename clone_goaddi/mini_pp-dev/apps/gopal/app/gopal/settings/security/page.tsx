"use client";

import SettingsHeader from "@/components/settings/SettingsHeader";
import { Button } from "@/components/ui/button";
import { DeviceDetailType, devicesType } from "@/interfaces";
import { Copy, Eye, EyeClosed, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OTPInput from "react-otp-input";
import { optSchema } from "@/schema/auth";
import { Motion } from "@/app/auth/components/otp-form";
import { handleCopyClick } from "@/utils";

const Device = ({
  deviceName,
  isActive,
  deviceOs,
  isTrusted,
  openDeviceModal,
}: devicesType) => {
  const openModal = () => {
    openDeviceModal();
  };
  return (
    <div className="device border-b border-b-[#E4E7EC] px-6 py-7 last-of-type:border-none">
      <div className="device-container w-full md:w-[70%] flex items-center justify-between ">
        <div className="device-details">
          {isActive && (
            <span className="state inline-block text-xs text-[#036B26] bg-[#E7F6EC] py-2 px-2 rounded font-medium">
              Currently Active
            </span>
          )}
          <h3 className="font-medium text-base mb-2">{deviceName}</h3>
          <p className="text-[#676E7E] text-sm flex items-center gap-2">
            <span>{deviceOs}</span>
            {isTrusted ? <span>&bull;</span> : null}
            {isTrusted ? (
              <span className="text-[#1D2433] font-medium">Trusted</span>
            ) : null}
          </p>
        </div>
        <Button
          variant={"secondary"}
          className="bg-primary100 text-primary600 hover:bg-primary200 font-medium text-xs px-5 py-2 rounded"
          onClick={openModal}
        >
          Show details
        </Button>
      </div>
    </div>
  );
};

const DeviceHistory = ({ openModal }: { openModal: () => void }) => {
  return (
    // user's devices
    <section className="devices">
      <h3 className="text-sm text-[#1D2433] px-6 pt-5 pb-3">Device History</h3>
      {deviceList &&
        deviceList.map((device: any, index: number) => (
          <Device
            key={index}
            deviceName={device.name}
            deviceOs={device?.platform}
            isActive={device?.isActive}
            isTrusted={device?.isTrusted}
            openDeviceModal={openModal}
          />
        ))}
    </section>
  );
};

const DeviceDetailsModal = ({
  closeDeviceModal,
  isMobile = false,
  deviceName = "Google Chrome",
  devicePlatform = "Window 10",
}: DeviceDetailType) => {
  // function to close modal
  const closeModal = () => {
    closeDeviceModal();
  };
  return (
    <div className="device-modal grid place-items-center fixed inset-0 w-full h-screen bg-[#00000089] z-50 ">
      <div className="device-modal__container bg-white w-full md:w-[50%] p-6 rounded animate-scaleUp">
        <header className="relative z-10 mb-8">
          {isMobile ? (
            <Image
              src={`/assets/modal-phone.svg`}
              width={80}
              height={80}
              className="mb-4"
              alt=""
            />
          ) : (
            <Image
              src={`/assets/modal-laptop.svg`}
              width={80}
              height={80}
              className="mb-4"
              alt=""
            />
          )}
          <h3 className="font-semibold text-2xl mb-2">
            {deviceName}. {devicePlatform}
          </h3>
          <p className="text-sm text-[#647995]">
            This shows the device currently signed in to your account.
          </p>
          <X
            size={24}
            weight="bold"
            className="absolute right-[20px] top-[24px] cursor-pointer"
            onClick={closeModal}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        {/* main section */}

        <section className="flex flex-col gap-6 mb-5">
          <div className="flex items-center justify-between">
            <p>Add as trusted device</p>
            <Button
              variant={"default"}
              className="w-[25%] bg-primary600 text-white px-16 py-4 font-normal text-sm rounded hover:bg-primary700"
            >
              Add
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p className="w-full md:w-[60%]">
              Remove login access and delete this device from your approved
              devices
            </p>
            <Button
              variant={"default"}
              className="w-[25%] bg-[#FBEAE9] text-[#9E0A05] px-16 py-4 text-sm font-medium rounded hover:bg-[#ffd7d4]"
            >
              Remove
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

// Two factor auth
const TwoFactorAuth = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<"tel" | "password">("password");

  const form = useForm<any>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      otp: "",
      membership: "gopal",
    },
  });

  const watchOTP = form.watch("otp");

  //   Submit
  const onSubmit = async (code: any) => {
    console.log(code);
  };

  const [twoFactorActive, setTwoFactorActive] = useState(false);
  const [authIsVerified, setAuthIsVerified] = useState(true);
  const [textMessage, setTextMessage] = useState(false);

  const closeTextMessageModal = () => {
    setTextMessage(false);
  };

  return (
    <>
      <section className="devices">
        <h3 className="text-sm text-[#1D2433] px-6 pt-5 pb-3">
          Enable two-factor authentication to add an extra layer of security to
          your GoPaddi account
        </h3>

        <div className="">
          <div className="device border-b border-b-[#E4E7EC] px-6 py-7 last-of-type:border-none">
            <div className="device-container w-full md:w-[70%] flex items-center justify-between ">
              <div className="device-details md:w-[65%]">
                <h3 className="font-medium text-base mb-2">
                  Authenticator App
                </h3>
                <p className="text-[#676E7E] text-sm flex items-center gap-2">
                  For secure logins, use a mobile authentication app to generate
                  a verification code whenever you access your Gopadi account.
                </p>
              </div>
              <Button
                variant={"secondary"}
                className="w-[20%] bg-primary100 text-primary600 hover:bg-primary200 font-medium text-xs px-10 py-2 rounded"
                onClick={() => {
                  setTwoFactorActive(true);
                }}
              >
                Activate
              </Button>
            </div>
          </div>
          <div className="device border-b border-b-[#E4E7EC] px-6 py-7 last-of-type:border-none">
            <div className="device-container w-full md:w-[70%] flex items-center justify-between ">
              <div className="device-details md:w-[60%]">
                <h3 className="font-medium text-base mb-2">Text Message</h3>
                <p className="text-[#676E7E] text-sm flex items-center gap-2">
                  Verify your Gopaddi login with an authentication code sent by
                  text message to your mobile phone
                </p>
              </div>
              <Button
                variant={"secondary"}
                className={`w-[20%] bg-[#FBEAE9] text-[#9E0A05] hover:bg-[#ffdad8] font-medium text-xs px-10 py-2 rounded`}
                onClick={() => {
                  setTextMessage(true);
                }}
              >
                Deactivate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Text message Modal*/}
      {textMessage && <TextMessage close={closeTextMessageModal} />}

      {/* Authenticator APP modal*/}
      {twoFactorActive && (
        <div className="device-modal grid place-items-center fixed inset-0 w-full h-screen bg-[#00000089] z-50 ">
          {/* modal container */}
          {true ? (
            <div className="device-modal__container bg-white w-full md:w-[45%] p-6 rounded animate-scaleUp">
              <header className="relative z-10 mb-8">
                <Image
                  src={`/assets/modal-vault.svg`}
                  width={70}
                  height={70}
                  className="mb-4"
                  alt=""
                />

                <h3 className="font-semibold text-xl mb-2">
                  Authenticator App
                </h3>
                <p className="text-sm text-[#647995] w-full md:w-[68%]">
                  To continue and set up two-factor authentication, you'll need
                  an authenticator app. We recommend using Google Authenticator,
                  scan the QR code below
                </p>
                <X
                  size={24}
                  weight="bold"
                  className="absolute right-[20px] top-[10px] cursor-pointer"
                  onClick={() => {
                    setTwoFactorActive(false);
                  }}
                />
                <img
                  src="/assets/modal-lines.svg"
                  className="absolute left-0 right-0 top-0 w-full -z-[1]"
                  alt=""
                />
              </header>

              {/* main section */}

              <section className="flex flex-col items-center gap-4 mb-5">
                <Image
                  src={"/assets/qr-code.svg"}
                  width={"303"}
                  height={"322"}
                  alt="qr code"
                />
                <p className="text-xs text-[#647995] text-center">
                  Having trouble scanning? Enter this key manually.
                </p>
                <h3 className="font-medium flex items-center gap-2">
                  <span id="key">EXAMPLE-KEY-12345</span>
                  <span
                    className="cursor-pointer hover:scale-105 duration-100"
                    onClick={() => {
                      handleCopyClick("Hello there");
                    }}
                  >
                    <Copy size={16} />
                  </span>
                </h3>

                <Button
                  variant={"default"}
                  className="block w-full md:w-[60%] bg-primary600 text-white hover:bg-primary700 min-h-[45px] font-normal mt-4"
                >
                  Continue
                </Button>
              </section>
            </div>
          ) : (
            // Enter code for authenticator app
            <div className="text-message__modal bg-white w-full md:w-[40%] p-6 rounded animate-scaleUp">
              <header className="relative z-10 mb-8">
                <Image
                  src={`/assets/modal-asterisk.svg`}
                  width={70}
                  height={70}
                  className="mb-4"
                  alt=""
                />

                <h3 className="font-semibold text-xl mb-2">Enter Code</h3>
                <p className="text-sm text-[#647995] w-full md:w-[68%]">
                  Enter the 6-digit verification code generated by your
                  authenticator app for your GoPaddi account
                  (janedoe@gmail.com).
                </p>
                <X
                  size={24}
                  weight="bold"
                  className="absolute right-[20px] top-[10px] cursor-pointer"
                  onClick={() => {
                    setTwoFactorActive(false);
                  }}
                />
                <img
                  src="/assets/modal-lines.svg"
                  className="absolute left-0 right-0 top-0 w-full -z-[1]"
                  alt=""
                />
              </header>

              <div className="">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" w-full"
                  >
                    <Motion className="flex justify-between">
                      <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem className="w-full mb-5 flex items-center justify-center">
                            <FormControl className="flex items-start justify-center">
                              <OTPInput
                                {...field}
                                numInputs={6}
                                inputStyle={{
                                  width: "3.4em",
                                  textAlign: "center",
                                  border: "1px solid #ced4da", // Add border style if needed
                                }}
                                inputType={visible}
                                shouldAutoFocus={true}
                                containerStyle="max-w-sm w-full flex items-center justify-center mb-5 space-x-3"
                                renderSeparator={<span></span>}
                                renderInput={(props) => (
                                  <input
                                    {...props}
                                    className="h-20 rounded-sm text-xl"
                                  />
                                )}
                              />
                            </FormControl>
                            <FormMessage className="md:text-sm text-xs mt-6" />
                          </FormItem>
                        )}
                      />
                    </Motion>

                    <div className="flex items-center justify-end">
                      <Button
                        variant={"default"}
                        className="ml-auto px-16 py-6 bg-primary600 text-white font-normal  hover:bg-primary700 mt-5 rounded"
                        type="submit"
                      >
                        Verify
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enter Code Message Modal */}
    </>
  );
};

// Text message 2fa
const TextMessage = ({ close }: { close: () => void }) => {
  const [visible, setVisible] = useState<"tel" | "password">("password");

  const form = useForm<any>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      otp: "",
      membership: "gopal",
    },
  });

  const watchOTP = form.watch("otp");

  //   Submit
  const onSubmit = async (code: any) => {
    console.log(code);
  };

  const closeModal = () => {
    close();
  };

  return (
    <div className="grid place-items-center fixed inset-0 w-full h-screen bg-[#00000089] z-50">
      <div className="text-message__modal bg-white w-full md:w-[40%] p-6 rounded animate-scaleUp">
        <header className="relative z-10 mb-8">
          <Image
            src={`/assets/modal-asterisk.svg`}
            width={70}
            height={70}
            className="mb-4"
            alt=""
          />

          <h3 className="font-semibold text-xl mb-2">Text Message </h3>
          <p className="text-sm text-[#647995] w-full md:w-[68%]">
            Enter the verification code sent to this number +2340711737482
          </p>
          <X
            size={24}
            weight="bold"
            className="absolute right-[20px] top-[10px] cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />
          <img
            src="/assets/modal-lines.svg"
            className="absolute left-0 right-0 top-0 w-full -z-[1]"
            alt=""
          />
        </header>

        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full"
            >
              <Motion className="flex justify-between">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="w-full mb-2 flex flex-col items-center justify-center">
                      <FormControl className="flex items-start justify-center">
                        <OTPInput
                          {...field}
                          numInputs={6}
                          inputStyle={{
                            width: "3.4em",
                            textAlign: "center",
                            border: "1px solid #ced4da", // Add border style if needed
                          }}
                          inputType={visible}
                          shouldAutoFocus={true}
                          containerStyle="max-w-sm w-full flex items-center justify-center mb-5 space-x-3"
                          renderSeparator={<span></span>}
                          renderInput={(props) => (
                            <input
                              {...props}
                              className="h-20 rounded-sm text-xl"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage className="md:text-sm text-xs self-start" />
                    </FormItem>
                  )}
                />
              </Motion>

              <div className="form-controls flex items-center justify-between mb-10">
                <p className="text-sm">
                  Didn't get a code?{" "}
                  <span className="text-primary600 underline">
                    Click to resend
                  </span>
                </p>

                <button className="password-visibility">
                  {visible === "tel" ? (
                    <div
                      onClick={() => setVisible("password")}
                      className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer"
                    >
                      <Eye size={24} />
                      <span>Hide password</span>
                    </div>
                  ) : (
                    <div
                      onClick={() => setVisible("tel")}
                      className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer"
                    >
                      <EyeClosed size={24} />
                      <span>See password</span>
                    </div>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-end mb-8">
                <Button
                  variant={"default"}
                  className="ml-auto px-16 py-6 bg-primary600 text-white font-normal  hover:bg-primary700 mt-5 rounded text-sm"
                  type="submit"
                >
                  Verify
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

// page main component
const ProfileSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mode = useSearchParams();

  // openModal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="security">
      <SettingsHeader
        heading="settings"
        subheading="Security"
        tabLink={links}
      />

      {/* main tab content */}
      {mode.get("tab") === "2fa" && <TwoFactorAuth />}
      {mode.get("tab") === "devices" && (
        <DeviceHistory openModal={handleOpenModal} />
      )}

      {/* trusted device modal */}
      {isModalOpen && (
        <DeviceDetailsModal
          closeDeviceModal={handleCloseModal}
          deviceName="Google Chrome"
          devicePlatform="Windows 10"
          isMobile={false}
        />
      )}
    </section>
  );
};

// mock list of devices
const deviceList = [
  {
    id: 1,
    name: "Google Chrome",
    platform: "Windows 10",
    isActive: true,
    isTrusted: true,
  },
  {
    id: 2,
    name: "Tecno K15q",
    platform: "Android",
    isActive: false,
    isTrusted: false,
  },
];

const links = [
  {
    id: 1,
    name: "Two Factor Authentication",
    tabName: "2fa",
    isActive: false,
  },
  {
    id: 2,
    name: "Manage Devices",
    tabName: "devices",
    isActive: true,
  },
];

export default ProfileSettings;
