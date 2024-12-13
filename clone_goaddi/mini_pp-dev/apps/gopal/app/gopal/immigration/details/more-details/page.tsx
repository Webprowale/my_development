"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AirplaneTakeoff,
  CalendarBlank,
  Chats,
  CheckCircle,
  CheckSquareOffset,
  Clock,
  Coins,
  CurrencyNgn,
  EnvelopeSimpleOpen,
  Files,
  Gear,
  Globe,
  IdentificationCard,
  ListChecks,
  PottedPlant,
  ShootingStar,
  Student,
  Tag,
  TestTube,
  Ticket,
} from "@phosphor-icons/react/dist/ssr";
import Modal from "@/components/goui/modal";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addCommasToNumber } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import form from "@/components/create/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Check from "@/components/immigration/components/svg/check.svg";
import FailedSvg from "@/components/immigration/components/svg/failed.svg";
import ResponseMsg from "@/components/immigration/components/response-msg";
// import { Check } from "@/app/gopal/wallet/assets/svg/check";
const ImmigrationMoreDetails = () => {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const requirementList = [
    {
      title: "Proof of Acceptance",
      subtitle:
        "Your school must provide you with a letter of acceptance (LOA). Include the original or electronic copy of your letter with your study permit application.",
      icon: <EnvelopeSimpleOpen size={20} className="text-primary600" />,
    },
    {
      title: "Proof of Identity",
      subtitle:
        "When applying, you will be required to upload a copy of the information page of your passport and two recent passport-size photos of you and each family member.",
      icon: <IdentificationCard size={20} className="text-primary600" />,
    },
    {
      title: "Proof of Funds",
      subtitle:
        "You will be required to provide a document to prove that you can support yourself and the family members who come with you while you are in Canada.",
      icon: <Coins size={20} className="text-primary600" />,
    },
  ];

  const applicationProcess = [
    {
      heading: "Check Your Eligibility",
      subtitle:
        "Complete a free assessment form to find out if you qualify for the visa",
      icon: (
        <TestTube
          size={deviceType === "mobile" ? 28 : 34}
          className="text-primary600"
          weight="bold"
        />
      ),
    },
    {
      heading: "We Will Reach Out",
      subtitle:
        "Once you complete the form, we will contact you to provide further assistance",
      icon: (
        <Chats
          size={deviceType === "mobile" ? 28 : 34}
          className="text-primary600"
          weight="bold"
        />
      ),
    },
    {
      heading: "Submit Documents",
      subtitle:
        "No need to stand in line at the consulate, we will do it for you",
      icon: (
        <Files
          size={deviceType === "mobile" ? 28 : 34}
          className="text-primary600"
          weight="bold"
        />
      ),
    },
    {
      heading: "Get Your Visa",
      subtitle:
        "Our system provides real time status updates to keep you informed",
      icon: (
        <Ticket
          size={deviceType === "mobile" ? 28 : 34}
          className="text-primary600"
          weight="bold"
        />
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSubmit, setisSubmit] = useState(false);

  const openModal = (name: string) => {
    setIsModalOpen(true);
    changeCollectionScreen(name);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [collectionScreen, SetCollectionScreen] = useState("");

  const changeCollectionScreen = (name: string) => {
    SetCollectionScreen(name);
  };

  return (
    <>
      <Breadcrumb className="mb-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/gopal/activities">
              Immigration
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/gopal/activities/search-result">
              Canada
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-black" />
          <BreadcrumbItem>
            <BreadcrumbPage>Study Permit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className="bg-white">
        <header className="details-header w-full h-[520px] flex justify-center items-center">
          <div className="grid gap-2">
            <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl xl:leading-[64px] font-black text-white">
              Canada Study Permit
            </div>
            <div className="flex justify-center gap-2 mt-1">
              <span className="font-normal text-sm text-white">
                Provided by
              </span>
              <span className="p-1 border-[1.13px] border-white rounded-full bg-[#F0F2F5]">
                <img src="/assets/immigration/birdview.png" />
              </span>

              <span className="text-base font-bold text-white">
                Birdview Travels
              </span>
            </div>
          </div>
        </header>

        <div className="w-[90%] md:w-[90%] mx-auto relative z-20 bg-white">
          {/* Info */}
          <section className="grid grid-cols-1 md:grid-cols-[25%_75%] md:items-start my-14 gap-10 md:gap-5">
            {/* left */}
            <div className="md:sticky md:top-28">
              <div className="border-l-[3px] border-l-primary600 pl-8 flex flex-col gap-5 mb-5">
                <div className="flex flex-col gap-1">
                  <h3 className="flex items-center gap-1">
                    <CalendarBlank
                      size={15}
                      className="text-primary600"
                      weight="light"
                    />
                    <span className="uppercase tracking-wider font-medium text-sm text-[#676E7E]">
                      Validity
                    </span>
                  </h3>
                  <p className="text-black font-semibold">Up to 2 years</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="flex items-center gap-1">
                    <Clock
                      size={15}
                      className="text-primary600"
                      weight="light"
                    />
                    <span className="uppercase tracking-wider font-medium text-sm text-[#676E7E]">
                      Processing
                    </span>
                  </h3>
                  <p className="text-black font-semibold">
                    15 - 20 business days
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="flex items-center gap-1">
                    <Tag size={15} className="text-primary600" weight="light" />
                    <span className="uppercase tracking-wider font-medium text-sm text-[#676E7E]">
                      Embassy Visa Fee
                    </span>
                  </h3>
                  <p className="text-black font-semibold flex items-center gap-1">
                    <CurrencyNgn weight="bold" /> {addCommasToNumber(450000)}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="flex items-center gap-1">
                    <Gear
                      size={15}
                      className="text-primary600"
                      weight="light"
                    />
                    <span className="uppercase tracking-wider font-medium text-sm text-[#676E7E]">
                      Service Fee
                    </span>
                  </h3>
                  <p className="text-black font-semibold flex items-center gap-1">
                    {" "}
                    <CurrencyNgn weight="bold" /> {addCommasToNumber(250000)}
                  </p>
                </div>
              </div>
              <Button
                className="bg-primary600 text-white py-6 px-6 rounded hover:bg-primary700 font-normal tracking-wide text-sm"
                onClick={() => openModal("")}
              >
                Check Your Eligibility
              </Button>
            </div>
            {/* right */}
            <div className="">
              <p className="text-[#676E7E] leading-relaxed">
                The study permit is a document we issue that allows foreign
                nationals to study at designated learning institutions (DLIs) in
                Canada. Most foreign nationals need a study permit to study in
                Canada. Make sure you have all the documents you need before you
                apply. You should apply before you travel to Canada.
              </p>

              {/* seperator */}
              <div className="seperator w-full h-[1px] bg-[#E4E7EC] my-10"></div>

              {/* help */}
              <section className="">
                <h2 className="font-bold text-3xl mb-5">
                  Eligibility Criteria
                </h2>

                <Accordion type="single" collapsible className="w-full">
                  {[...new Array(6)].map((key, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      className="border-[1px] p-2 my-4 rounded"
                    >
                      <AccordionTrigger className="no-underline">
                        <div className="flex gap-1">
                          <span className="font-black text-xl text-[#0D6EFD]">
                            0{index + 1}.
                          </span>
                          <span className="font-medium text-xl text-[#1D2433]">
                            Designated Learning Institution (DLI) Enrolment
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-gray-100 p-2">
                        It's generally recommended to book flights as early as
                        possible to secure the best fares, especially during
                        peak travel seasons. However, last-minute deals may also
                        be available for flexible travelers.
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* seperator */}
              <div className="seperator w-full h-[1px] bg-[#E4E7EC] my-10"></div>

              {/* Application process */}
              <section id="process" className="process">
                <h2 className="font-bold text-3xl mb-5">
                  <h2 className="font-bold text-3xl mb-5">
                    Application Process
                  </h2>
                </h2>

                <div className="flex flex-col md:flex-row items-left justify-between relative bg-no-repeat gap-[18px] md:gap-2">
                  {applicationProcess.map((process: any, index: number) => (
                    <div
                      className={`${deviceType !== "mobile" ? "medical-process" : ""} flex md:flex-col items-center justify-left md:justify-center gap-[18px] md:gap-0 md:text-center my-0 md:my-5 relative z-10`}
                      key={index}
                    >
                      <div>
                        <span className="w-[44px] md:w-[80px] h-[44px] md:h-[80px] bg-primary100 rounded-full grid place-items-center">
                          {process.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold mt-2">
                          {process.heading}
                        </h3>
                        <p className="text-sm text-[#676E7E]">
                          {process.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}

                  <img
                    src="/assets/process-link.svg"
                    alt=""
                    className="hidden md:block w-[75%] absolute left-[50%] translate-x-[-50%] right-0 top-16"
                  />
                </div>
              </section>

              {/* seperator */}
              <div className="seperator w-full h-[1px] bg-[#E4E7EC] my-10"></div>

              {/* requirements */}
              <section className="">
                <h2 className="font-bold text-3xl mb-5">Required Documents</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {requirementList.map((help: any, index: number) => (
                    <div
                      className="help border border-primary200 rounded p-4"
                      key={index}
                    >
                      <h3 className="flex items-center  mb-2 text-base gap-2 text-[#1D2433] font-semibold">
                        {help.icon}
                        <span>{help.title}</span>
                      </h3>
                      <p className="text-sm text-[#676E7E]">{help.subtitle}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom banner */}

              <section className="banner-bottom bg-primary100 rounded p-8 flex flex-col items-center md:items-start text-center md:text-left gap-2 text-[#1D2433] bg-[url('/assets/dot-corners.png')] bg-cover bg-center bg-no-repeat mt-10">
                <h2 className="text-3xl font-bold">
                  Take the First Step on Your Journey to Canada
                </h2>
                <p className="text-[#676E7E]">
                  Complete our free assessment form to check your eligibility
                  and we will contact you for further assistance and
                  information.
                </p>
                <Button
                  className="bg-primary600 text-white py-6 px-6 rounded hover:bg-primary700 font-normal tracking-wide text-sm w-max mt-2"
                  onClick={() => openModal("not_qualified")}
                >
                  Check Your Eligibility
                </Button>
              </section>
            </div>
          </section>
        </div>

        <div className="hidden md:block md:visible bg-[#00007E] px-20 py-10 mb-20">
          <div className="flex justify-between">
            <div className="text-3xl font-semibold text-white w-[256px]">
              More Canada Immigration Packages
            </div>

            <span className="flex justify-around gap-2">
              <div className="flex flex-col gap-3 justify-center items-center border-[1px] border-[#E4E7EC] rounded-sm bg-white hover:bg-[#E7F0FF] hover:text-[#0D6EFD] py-[70px] px-[60px] cursor-pointer">
                <p>
                  {" "}
                  <Student size={42} color="#0D6EFD" weight="bold" />{" "}
                </p>
                <p className="font-bold text-xl text-center">Study Permit</p>
              </div>

              <div className="flex flex-col gap-3 justify-center items-center border-[1px] border-[#E4E7EC] rounded-sm bg-white hover:bg-[#E7F0FF] hover:text-[#0D6EFD] py-[70px] px-[60px] cursor-pointer">
                <p>
                  {" "}
                  <PottedPlant size={42} color="#0D6EFD" weight="bold" />{" "}
                </p>
                <p className="font-bold text-xl text-center">Investor Visa</p>
              </div>

              <div className="flex flex-col gap-3 justify-center items-center border-[1px] border-[#E4E7EC] rounded-sm bg-white hover:bg-[#E7F0FF] hover:text-[#0D6EFD] py-[70px] px-[60px] cursor-pointer">
                <p>
                  {" "}
                  <ShootingStar size={42} color="#0D6EFD" weight="bold" />{" "}
                </p>
                <p className="font-bold text-xl text-center">
                  Rising Talent Visa
                </p>
              </div>
            </span>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        trigger={<button></button>}
        className="my-modal w-[85%] sm:max-w-[600px]"
        left={false}
      >
        {collectionScreen !== "" ? (
          collectionScreen == "qualified" ? (
            <>
              <ResponseMsg
                icon={Check}
                title="Congrats Champ!"
                spanText="qualified"
                text="We will reach out to you on next steps"
              />
            </>
          ) : (
            <>
              <ResponseMsg
                icon={FailedSvg}
                title="Nothing To Worry About"
                spanText="not qualified"
                text="But we will reach out to you with alternative solutions"
              />
            </>
          )
        ) : (
          <>
            <img
              className="absolute top-0 w-full h-fit z-[-1]"
              src="/assets/modal-lines.svg"
              alt="modal-lines"
            />

            <img src="/assets/settings/profile.svg" alt="" />

            <DialogHeader>
              <DialogTitle className="mt-2 text-xl">
                Check Your Eligibility
              </DialogTitle>
              <DialogDescription className="text-sm max-w-md mb-12">
                Fill in your details below to find out if you are qualified for
                Canada Study Permit
              </DialogDescription>

              <div className="pt-5">
                <div className="grid w-full h-[250px] overflow-y-scroll gap-1.5">
                  <form>
                    <div className="grid w-full gap-6">
                      <div className="flex flex-col space-y-1.5">
                        <Label className="font-normal text-left text-base">
                          How Old Are You?
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your date of birth"
                        />
                      </div>

                      <div className="flex flex-col gap-1 space-y-1.5">
                        <Label
                          className="font-normal text-left text-base"
                          htmlFor="framework"
                        >
                          Highest Educational Qualification
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="framework"
                            className="border border-neutral600 rounded-sm p-4"
                          >
                            <SelectValue placeholder="Select your education" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="next">B.Sc</SelectItem>
                            <SelectItem value="sveltekit">Masters</SelectItem>
                            <SelectItem value="astro">PHD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-1 space-y-1.5">
                        <Label
                          className="font-normal text-left text-base"
                          htmlFor="framework"
                        >
                          How Many Years of Work Experience Do You Have?
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="framework"
                            className="border border-neutral600 rounded-sm p-4"
                          >
                            <SelectValue placeholder="Select work experience" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="next">2Yrs</SelectItem>
                            <SelectItem value="sveltekit">3Yrs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-1 space-y-1.5">
                        <Label
                          className="font-normal text-left text-base"
                          htmlFor="framework"
                        >
                          How Much Will You Bring With You To Canada
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="framework"
                            className="border border-neutral600 rounded-sm p-4"
                          >
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="next">$10,000</SelectItem>
                            <SelectItem value="sveltekit">$20,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="flex w-full  gap-4 my-12">
                <Button
                  className="py-4 bg-blue-700 text-white w-full my-6"
                  onClick={() => openModal("qualified")}
                >
                  Submit
                </Button>
              </div>
            </DialogHeader>
          </>
        )}
      </Modal>
    </>
  );
};

export default ImmigrationMoreDetails;
