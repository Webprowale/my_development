"use client";
import { CheckCircle } from "@phosphor-icons/react";
import AvailableProgrammCard from "../components/AvailableProgrammCard";
import { useQuery } from "@tanstack/react-query";
import {
  getStudyAllCourses,
  getStudyQuestionnairies,
} from "@/axios/endpoints/study.endpoint";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Courses = () => {
  const searchParams = useSearchParams();
  const logId = searchParams.get("logId");
  const qtn1 = searchParams.get("qtn1");
  const qtn2 = searchParams.get("qtn2");
  const qtn3 = searchParams.get("qtn3");
  const qtn4 = searchParams.get("qtn4");
  const qtn5 = searchParams.get("qtn5");
  const qtn6 = searchParams.get("qtn6");

  const result = {
    logId,
    answers: [qtn1, qtn2, qtn3, qtn4, qtn5, qtn6],
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getStudyQuestionnairies"],
    queryFn: () => getStudyQuestionnairies(result),
  });

  // const { data: allCourseData, isLoading: isAllCoursesLoading } = useQuery({
  //   queryKey: ["getStudyAllCourses"],
  //   queryFn: () => getStudyAllCourses(),
  // });

  // const courseResponse = data?.data[0][0]?.programs?.map(
  //   (value: any) => value[0]?.courseId,
  // );

  // const allCoursesResponse = allCourseData?.data[0]?.courses?.map(
  //   (value: any) => value[0],
  // );

  // const filteredCourses = allCoursesResponse && courseResponse && allCoursesResponse?.filter((course: any) =>
  //   courseResponse.includes(course?.courseId),
  // );

  console.log(data);

  return (
    <div className="bg-white p-[1.2rem] md:p-[3.75rem] ">
      <div>
        <div className="bg-[#E7F6EC] p-[1.5rem] rounded-[4px] mb-[1.3rem] inline-block">
          <CheckCircle
            size={35}
            style={{
              color: "#0F973D",
            }}
          />
        </div>
        <h2 className="text-[1.3rem] font-[700] md:text-[2.5rem] text-[#1D2433] tracking-[-0.5px]">
          Nice One Champ!
        </h2>
        <p className="text-[#647995] text-[1rem] font-[500] ">
          We found <span className="text-[#1D2433]">4 program</span> options for
          you
        </p>
      </div>

      <main className="flex flex-col gap-[1.5rem] md:grid md:grid-cols-3 mt-[1.875rem]">
        {!isLoading
          ? data?.data[0][0]?.programs?.map((program: any, index: number) => (
              <Link
                href={`/gopal/study/programme?tab=${program[0].courseId}&schoolId=${program[0].schoolId}`}
              >
                <AvailableProgrammCard
                  key={index}
                  img={program[0]?.image}
                  course={program[0]?.courseTitle}
                  duration={program[0]?.duration}
                  cardVariant="v2"
                />
              </Link>
            ))
          : null}

        {isLoading
          ? [...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-64 w-full" />
            ))
          : null}
      </main>
    </div>
  );
};

export default Courses;
