//@ts-nocheck
"use client";
import MedicalCard from "@/components/medical/MedicalCard";
import { useMedicalServices } from "@/store/useMedical";
import Link from "next/link";
import { useEffect } from "react";

const Page = () => {
  const { loading, success, data, getMedicalServices } = useMedicalServices();

  useEffect(() => {
    getMedicalServices();
  }, [getMedicalServices]);

  // console.log(data);

  return (
    <main
      id="medical"
      className="bg-white mb-10"
    >
      {/* hero section */}
      <section className="medical-hero min-h-[70vh] bg-[url('/assets/medical-hero.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center text-white gap-2">
        <h1 className="text-6xl font-bold">Medical Tourism</h1>
        <p className="mb-4">Travel to another country for medical care</p>
        <Link
          href={"#"}
          className="py-4 px-6 rounded text-sm bg-primary700 hover:bg-primary800 ease-linear duration-150"
        >
          Explore Our Medical Services
        </Link>
      </section>

      {/* available services */}
      <section className="services pt-16 pb-10 px-4">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#1D2433]">
            Available Medical Services
          </h2>
          <p className="text-[#676E7E]">
            We serve as the intermediary between you and numerous health care
            advantages that will improve your wellbeing.
          </p>
        </header>

        <section className="list grid grid-cols-1 md:grid-cols-3 gap-4 grid-rows-1">
          {data[0]?.service?.map((value: any, index: number) => (
            <MedicalCard
              key={index}
              id={value?.id}
              name={value?.service}
              subtitle={value?.description}
              image={value?.image}
            />
          ))}
        </section>
      </section>
    </main>
  );
};

const medicalServices = [
  {
    id: 1,
    name: "Childbirth Services",
    subtitle:
      "Empowering families with compassionate childbirth services for a journey of safety and joy.",
    image: "/assets/preggo.png",
  },
  {
    id: 2,
    name: "Dental Care",
    subtitle:
      "Providing comprehensive dental care solutions for healthier smiles and happier lives.",
    image: "/assets/dental.png",
  },
  {
    id: 3,
    name: "Eye Services (Optometry)",
    subtitle:
      "Guiding vision to clarity and health with personalized eye care solutions.",
    image: "/assets/optometry.png",
  },
  {
    id: 4,
    name: "Annual Medicals Abroad",
    subtitle:
      "Ensuring proactive wellness through comprehensive annual medical assessments.",
    image: "/assets/abroad-medical.png",
  },
  {
    id: 5,
    name: "Mental Health Care",
    subtitle:
      "Nurturing minds, restoring balance: compassionate mental health care for holistic well-being.",
    image: "/assets/mental.png",
  },
  {
    id: 6,
    name: "Orthopaedic Services",
    subtitle:
      "Restoring mobility, relieving pain: expert orthopaedic care tailored to your needs.",
    image: "/assets/orthopaedic.png",
  },
];

export default Page;
