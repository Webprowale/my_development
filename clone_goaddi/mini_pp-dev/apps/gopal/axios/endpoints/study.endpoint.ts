import $ from "../index";

type ResponsTypes = Promise<{
  data: any;
  success?: boolean;
  message?: string;
}>;


export const getStudyCountry = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/get_country`,
    method: "post",
  });
};

export const getStudyDegree = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/fetch_degree`,
    method: "post",
    data: data,
  });
};

export const getStudyProgram = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/fetch_programs`,
    method: "post",
    data: data,
  });
};

export const getStudyCategory = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/fetch_category`,
    method: "post",
  });
};

export const getStudyStream = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/fetch_stream`,
    method: "post",
    data: data,
  });
};

export const getStudyAllSchool = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/fetch_allschool`,
    method: "post",
  });
};


export const getStudyCheckEligibility = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/check_eligibility`,
    method: "post",
    data: data,
  });
};

export const getStudyGrade = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/fetch_grade`,
    method: "post",
    data: data,
  });
};

export const getStudySchool = (data?: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/school_courses`,
    method: "post",
    data: data,
  });
};

export const getStudyQuestionnairies = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/questionnaires`,
    method: "post",
    data: data,
  });
};

export const getStudyCourse = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/fetchcourses`,
    method: "post",
    data: data,
  });
};

export const getStudyAllCourses = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/fetchallcourses`,
    method: "post"
  });
};

export const getStudySchoolByCountry = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/courseapi/school_country`,
    method: "post",
    data: data
  });
};