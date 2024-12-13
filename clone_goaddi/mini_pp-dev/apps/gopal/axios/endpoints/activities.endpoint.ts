import $ from "../index";

type ResponsTypes = Promise<{
  data: any;
  success?: boolean;
  message?: string;
}>;

export const detailActivities = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/activity/activityDetails`,
    method: "post",
    data: data,
  });
};

export const activities = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/activity/destinations`,
    method: "post",
    data: data,
  });
};

export const searchActivities = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/activity/activityList`,
    method: "post",
    data: data,
  });
};
