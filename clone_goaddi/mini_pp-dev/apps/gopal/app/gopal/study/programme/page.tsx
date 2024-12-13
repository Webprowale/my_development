"use client";

import { useQuery } from "@tanstack/react-query";
import AdmissionRequirmentCard from "../components/AdmissionRequirmentCard";
import ProgrammeDetaisHeader from "../components/ProgrammeDetaisHeader";
import StudyFooterCard from "../components/StudyFooterCard";
import { getStudyCourse } from "@/axios/endpoints/study.endpoint";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const ProgrammeDetais = () => {
  const searchParams = useSearchParams();
  const schoolId = searchParams.get("schoolId");
  const courseId = searchParams.get("tab");

  const { data, isLoading } = useQuery({
    queryKey: ["getStudyCourse"],
    queryFn: () =>
      getStudyCourse({
        schoolId,
      }),
  });

  let courseDetail = null;

  if (
    data?.data &&
    Array.isArray(data?.data) &&
    Array.isArray(data.data[0].courses)
  ) {
    courseDetail = data?.data[0]?.courses?.filter((value: any) => {
      return value[0].courseId === courseId;
    })[0];
  }

  function removeHTMLTags(str: string) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = str;
    return tempElement.textContent || tempElement.innerText || "";
  }
  const textOnly = removeHTMLTags(courseDetail?.courseDescription);

  return (
    <>
      {!isLoading ? (
        <div className="bg-white">
          {/* Programme HeaderSection */}
          <ProgrammeDetaisHeader
            universityName="Lakehead University"
            mainImage={courseDetail[0]?.mainImage}
            overviewImage={courseDetail[0]?.overviewImage}
            title={courseDetail[0]?.courseTitle}
            fee={courseDetail[0]?.fees}
            deadline={courseDetail[0]?.deadline}
            duration={courseDetail[0]?.duration}
            content="If technology is your forte and you possess analytical thinking and attention to detail, the IT world is eagerly seeking individuals like you."
          />
          {/* End Programme HeaderSection */}

          <div className="p-[1rem] md:p-[unset] max-w-[946px] md:mx-auto mt-[1rem] md:mt-[6rem]">
            <div className="text-[#676E7E] text-[1rem] font-[500] flex flex-col gap-[1rem] md:gap-[2rem]">
              <p>{textOnly}</p>
            </div>

            <div className="bg-[#E4E7EC] h-[1px] w-[100%] my-[3rem]"></div>

            {/*Admission Requirement  */}
            <div>
              <h2 className="text-[#1D2433] font-[700] text-[1.3rem] md:text-[2rem]">
                Admission Requirements
              </h2>

              <div className="mt-[1rem] flex flex-col items-center gap-[0.75rem]  md:mt-[1.5rem]">
                <AdmissionRequirmentCard title="Valid Passport" />
                <AdmissionRequirmentCard title="Letter of Acceptance" />
                <AdmissionRequirmentCard title="Passport Photo" />
              </div>
            </div>
            {/* end Admission Requirement  */}
            <hr className="bg-[#E4E7EC] h-[1px] w-[100%] my-[3rem]" />

            <div className="mt-[1.5rem]">
              <StudyFooterCard colorVariant="thickblue" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}
    </>
  );
};

export default ProgrammeDetais;
