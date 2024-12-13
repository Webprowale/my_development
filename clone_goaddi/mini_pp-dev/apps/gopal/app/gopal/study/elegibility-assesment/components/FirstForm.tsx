"use client";
import { useForm } from "react-hook-form";
import { SetStateAction } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getStudyAllSchool,
  getStudyCategory,
  getStudyCountry,
  getStudyCourse,
  getStudyDegree,
  getStudyProgram,
  getStudyStream,
} from "@/axios/endpoints/study.endpoint";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const schema = yup.object({
  country: yup.string().required("Country is required"),
  degree: yup.string().required("Degree is required"),
  category: yup.string().required("Category is required"),
  stream: yup.string().required("Stream is required"),
  maritalStatus: yup.string().required("Marital status is required"),
  program: yup.string().required("Program status is required"),
  school: yup.string().required("School status is required"),
  course: yup.string().required("Course status is required"),
  dob: yup.string().required("Date of Birth is required"),
});

type SchemaTypes = yup.InferType<typeof schema>;

const FirstForm = ({
  setInformation,
}: {
  setInformation: React.Dispatch<SetStateAction<{}>>;
}) => {
  const router = useRouter();
  const form = useForm<SchemaTypes>({
    resolver: yupResolver(schema),
    defaultValues: {
      country: "",
      school: "",
      degree: "",
      program: "",
      category: "",
      stream: "",
      maritalStatus: "",
      course: "",
      dob: "",
    },
  });

  const { data: countryData, isLoading: isCountryDataLoading } = useQuery({
    queryKey: ["getStudyCountry"],
    queryFn: () => getStudyCountry(),
  });

  const { data: schoolData, isLoading: isSchoolDataLoading } = useQuery({
    queryKey: ["getStudySchool"],
    queryFn: () => getStudyAllSchool(),
  });

  const { data: degreeData, isLoading: isDegreeDataLoading } = useQuery({
    queryKey: ["getStudyDegree", form.watch("country")],
    queryFn: () =>
      getStudyDegree({
        countryId: form.getValues("country"),
      }),
  });

  const { data: programData, isLoading: isProgramDataLoading } = useQuery({
    queryKey: ["getProgramDegree", form.watch("degree")],
    queryFn: () =>
      getStudyProgram({
        degreeId: form.getValues("degree"),
      }),
  });

  const { data: categoryData, isLoading: isCategoryDataLoading } = useQuery({
    queryKey: ["getStudyCategory"],
    queryFn: () => getStudyCategory(),
  });

  const { data: streamData, isLoading: isStreamDataLoading } = useQuery({
    queryKey: ["getStudyStream", form.watch("category")],
    queryFn: () =>
      getStudyStream({
        categoryId: form.getValues("category"),
      }),
  });

  const { data: courseData, isLoading: isCourseDataLoading } = useQuery({
    queryKey: ["getStudyCourse", form.watch("school")],
    queryFn: () =>
      getStudyCourse({
        schoolId: form.getValues("school"),
      }),
  });


  async function onSubmit(values: SchemaTypes) {
    const dob = new Date(values.dob);
    const currentDate = new Date();
    // Calculate the difference in years
    let differenceInYears = currentDate.getFullYear() - dob.getFullYear();
    const isBeforeBirthday =
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate());

    if (isBeforeBirthday) {
      differenceInYears--;
    }

    router.push(`/gopal/study/elegibility-assesment?tab=Post-graduate`);
    const data = {
      degreeId: values.degree,
      categoryId: values.category,
      countryId: values.country,
      streamId: values.stream,
      programId: values.program,
      maritalStatus: values.maritalStatus,
      schoolId: values.school,
      courseId: values.course,
      dob: differenceInYears,
    };

    setInformation(data);
  }

  return (
    <div className="flex  flex-col gap-[1.5rem]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full mt-3"
        >
          <>
            {!isCountryDataLoading ? (
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where Would You Like To Study?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countryData && countryData?.data?.length
                          ? countryData?.data[0]?.countries?.map(
                              (country: { name: string }, index: number) => (
                                <SelectItem
                                  key={index}
                                  value={country[0]?.countryId}
                                >
                                  {country[0].name}
                                </SelectItem>
                              ),
                            )
                          : null}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <Skeleton className="h-7 w-full" />
            )}

            {!isSchoolDataLoading ? (
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Your Prefer School</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select school" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {schoolData && schoolData?.data?.length
                          ? schoolData?.data[0]?.school?.map(
                              (school: { name: string }, index: number) => (
                                <SelectItem
                                  key={index}
                                  value={school[0]?.schoolId}
                                >
                                  {school[0].schoolName}
                                </SelectItem>
                              ),
                            )
                          : null}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <Skeleton className="h-7 w-full" />
            )}

            {form.getValues("school").length > 0 && courseData ? (
              <>
                {!isCourseDataLoading ? (
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Course Type?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courseData
                              ? courseData?.data[0]?.courses?.map(
                                  (
                                    course: { title: string },
                                    index: number,
                                  ) => {


                                    // console.log(title);
                                    return (
                                      <SelectItem
                                        key={index}
                                        value={course[0]?.courseId}
                                        onClick={() => console.log(field.value)}
                                      >
                                        {course[0].courseTitle}
                                      </SelectItem>
                                    );
                                  },
                                )
                              : null}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <Skeleton className="h-7 w-full" />
                )}
              </>
            ) : null}

            {form.getValues("country").length > 0 && degreeData ? (
              <>
                {!isDegreeDataLoading ? (
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What Degree Are You Hoping to Pursue?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a degree" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {degreeData
                              ? degreeData?.data[0]?.degree?.map(
                                  (
                                    degree: { title: string },
                                    index: number,
                                  ) => (
                                    <SelectItem
                                      key={index}
                                      value={degree[0]?.degreeId}
                                    >
                                      {degree[0].title}
                                    </SelectItem>
                                  ),
                                )
                              : null}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <Skeleton className="h-7 w-full" />
                )}
              </>
            ) : null}

            {form.getValues("degree").length > 0 && programData ? (
              <>
                {!isProgramDataLoading ? (
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What Pragram Are You Hoping to Pursue?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a pragram" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {programData
                              ? programData?.data[0]?.program?.map(
                                  (
                                    program: { title: string },
                                    index: number,
                                  ) => (
                                    <SelectItem
                                      key={index}
                                      value={program[0]?.programId}
                                    >
                                      {program[0].title}
                                    </SelectItem>
                                  ),
                                )
                              : null}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <Skeleton className="h-7 w-full" />
                )}
              </>
            ) : null}

            {!isCategoryDataLoading ? (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryData && countryData?.data?.length
                          ? categoryData?.data[0]?.category?.map(
                              (category: { title: string }, index: number) => (
                                <SelectItem
                                  key={index}
                                  value={category[0]?.categoryId}
                                >
                                  {category[0].title}
                                </SelectItem>
                              ),
                            )
                          : null}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <Skeleton className="h-7 w-full" />
            )}

            {form.getValues("category").length > 0 && streamData ? (
              <>
                {!isStreamDataLoading ? (
                  <FormField
                    control={form.control}
                    name="stream"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stream</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stream" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {streamData
                              ? streamData?.data[0]?.streams?.map(
                                  (
                                    stream: { title: string },
                                    index: number,
                                  ) => (
                                    <SelectItem
                                      key={index}
                                      value={stream[0]?.streamId}
                                    >
                                      {stream[0].title}
                                    </SelectItem>
                                  ),
                                )
                              : null}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <Skeleton className="h-7 w-full" />
                )}
              </>
            ) : null}

            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Single", "Married"].map(
                        (status: string, index: number) => (
                          <SelectItem key={index} value={status}>
                            {status}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <input
                      type="date"
                      className="h-10 w-full text-sm px-3 rounded-lg border"
                      placeholder="Date of birth"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>

          <button
            type="submit"
            className="py-2 w-full md:text-sm bg-primary600 text-white rounded"
          >
            Next
          </button>

          {/* <Motion>
            <GoAuthButton
              type="submit"
              className="w-full py-2 md:text-sm font-medium transition-all mt-1"
              loading={loading}
            >
              Submit
            </GoAuthButton>
          </Motion> */}
        </form>
      </Form>
    </div>
  );
};
export default FirstForm;

{
  /* <Motion>
            <GoAuthButton
              type="submit"
              className="w-full py-2 md:text-sm font-medium transition-all mt-1"
              loading={loading}
            >
              Submit
            </GoAuthButton>
          </Motion> */
}
