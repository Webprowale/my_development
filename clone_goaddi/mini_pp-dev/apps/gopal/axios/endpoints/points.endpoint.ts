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

export const getPoints = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/Gomarketerpoints/viewpoints`,
    method: "post",
  });
};

export const getPointsHistory = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/Gomarketerpoints/viewhistory`,
    method: "post",
  });
};
