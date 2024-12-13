import $ from "../index";

type ResponsTypes = Promise<{
  data: any;
  code?: any;
  success?: boolean;
  message?: string;
  serverResponse: {
    [key: string]: any;
  };
}>;

export const medicalServices = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/Medical/services`,
    method: "post",
  });
};

export const medicalCountries = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/Medical/countries`,
    method: "post",
  });
};

export const medicalProgram = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/Medical/programs`,
    method: "post",
    data: data,
  });
};
