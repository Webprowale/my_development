import $ from "../index";
import getUser from "@/lib/get-user";

type ResponsTypes = Promise<{
  data: any;
  code?: any;
  status?: boolean;
  success?: boolean;
  result?: any;
  message?: string;
  serverResponse: {
    [key: string]: any;
  };
}>;

export function getDiaryPosts(): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/diary/fetch_diary`,
    method: "post",
  });
}

export function CreateDiaryPoster(data: any): ResponsTypes {
  return $({
    url: "gopaddiberlin/gopaddiberlinbkend/web/diary/create",
    method: "post",
    data: data,
  });
}

export function UpdateDairy(data: any) {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/diary/update_diary`,
    method: "post",
    data: data,
  });
}

export function DeleteDairy(data: any) {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/diary/delete_diary`,
    method: "post",
    data: data,
  });
}

export function ChangeDairyCover(data: any) {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/diary/change_cover`,
    method: "post",
    data: data,
  });
}
export function DeleteFiles(data: any) {
  console.log(data);
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/diary/manage_files`,
    method: "post",
    data: data,
    // response: data,
  });
}
export function DeleteDiary(data: any) {
  console.log(data);
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/diary/delete_diary`,
    method: "post",
    data: data,
    // response: data,
  });
}
