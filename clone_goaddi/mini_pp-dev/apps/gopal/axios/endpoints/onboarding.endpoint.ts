import { ApiResponseType } from "@/interfaces";
import service from "..";

type ResponsTypes = Promise<{
  error_code: string;
  data: any;
  code?: any;
  success?: boolean;
  message: string;
  serverResponse: {
    [key: string]: any;
  };
}>;

export const goPalOnboardProfile = (data: any): ResponsTypes => {
  return service({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/onboarding/save_personal_details",
    method: "post",
    data: data,
  });
};
export const goFamilyOnboardProfile = (data: any): ResponsTypes => {
  return service({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/onboarding/save_family_details",
    method: "post",
    data: data,
  });
};

export const goBusinessOnboardProfile = (data: any): ResponsTypes => {
  return service({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/onboarding/save_business_details",
    method: "post",
    data: data,
  });
};

export const checkUsername = (data: any): ResponsTypes => {
  return service({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/onboarding/check_username",
    method: "post",
    data: data,
  });
};

export const popularAccounts = (data: any): ResponsTypes => {
  return service({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/onboarding/popular_accounts",
    method: "post",
    data: data,
  });
};

export const setInterest = (data: any): ResponsTypes => {
  return service({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/onboarding/save_interests",
    method: "post",
    data: data,
  });
};

export const getPopularAccounts = (): ResponsTypes => {
  return service({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/onboarding/popular_accounts",
    method: "get",
  });
};
