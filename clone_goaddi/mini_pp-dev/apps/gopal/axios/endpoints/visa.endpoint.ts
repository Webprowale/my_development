import $ from "../index";

type ResponsTypes = Promise<{
  data: any;
  success?: boolean;
  message?: string;
}>;

export const getVisaCountry = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/visa/fetch_countries`,
    method: "post",
  });
};

export const getVisaSearch = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/visa/search`,
    method: "post",
    data: data,
  });
};

export const getVisaRequirement = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/visa/visarequirements`,
    method: "post",
    data: data,
  });
};

export const getCheckEligibility = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/visa/check_eligibility`,
    method: "post",
    data: data,
  });
};

export const visaSubmit = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/visa/submit`,
    method: "post",
    data: data,
  });
};

export const getAllVisa = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/visa/visaPost`,
    method: "post",
  });
};

export const getVisaType = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/visa/visaPost`,
    method: "post",
    data: data,
  });
};