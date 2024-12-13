import { VerfyAccountI } from "@/app/gopal/settings/accounts/page";
import $ from "../index";
import getUser from "@/lib/get-user";

type ResponsTypes = Promise<{
  data: any;
  code?: any;
  success?: boolean;
  result?: any;
  message?: string;
  serverResponse: {
    [key: string]: any;
  };
}>;

export function followUser(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/Api/follow_users`,
    method: "post",
    data: data,
  });
}

export const profileEditApi = async (data: any): Promise<any> => {
  const resp = await $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/Edit_update/gopal_profileedit`,
    method: "post",
    data: data,
  });
  return resp.data;
};

type getProfileResponse = {
  city: string; //
  gender: string; //
  // picture:string,
  bio: string; //
  coverPicture: string; //
  dateOfBirth: null | string;
  dateOfBirthFormat: string; //
  dateOfBirthPrivacy: string;
  emailAddress: string; //
  firstName: string; //
  lastName: string; //
  phoneCode: string;
  phoneNumber: string; //
  profilePicture: string;
  userId: string;
  userName: null | string;
};
export const getProfileAPi = async (data: {
  userId: string;
}): Promise<getProfileResponse> => {
  const resp = await $({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/user/userinfo",
    method: "post",
    data,
  });
  return resp.data[0].userInfo[0];
};

export const requestVerificationApi = async (data: VerfyAccountI) => {
  const resp = await $({
    // url:'/gopaddiberlin/gopaddiberlinbkend/bluetick/request_send',
    url: "/gopaddiberlin/gopaddiberlinbkend/web/savefeeds/request_send",
    method: "post",
    data,
  });
  return resp.data;
};
export const getrequestVerificationStatusApi = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const resp = await $({
    url: "/gopaddiberlin/gopaddiberlinbkend/web/savefeeds/request_status",
    method: "get",
  });
  // @ts-ignore
  return resp;
};

// https://vgtechdemo.com/gopaddiberlin/gopaddiberlinbkend/web/savefeeds/request_send
type fetchFollowersAndFollowApiResponse = {
  followers: number[];
  following: number[];
};
export const fetchFollowersAndFollowApi = async (
  userId,
): Promise<fetchFollowersAndFollowApiResponse> => {
  const resp = await $({
    // https://vgtechdemo.com/gopaddiberlin/gopaddiberlinbkend/web/savefeeds/fetch_followers_following
    // url: "/gopaddiberlin/gopaddiberlin/gopaddiberlinbkend/web/bluetick/fetch_followers_following",
    url: "gopaddiberlin/gopaddiberlinbkend/web/savefeeds/fetch_followers_following",
    method: "post",
    data: { userId },
  });

  return resp.data;
};
