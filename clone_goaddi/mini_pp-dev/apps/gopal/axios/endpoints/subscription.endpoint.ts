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

export const getSubscriptionPlans = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/palsubscribe/getplans`,
    method: "post",
    data: data,
  });
};

export const makePaymentForSubscriptionPlan = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/palsubscribe/subscribe`,
    method: "post",
    data: data,
  });
};

export const confirmPaymentStatus = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/palsubscribe/callback`,
    method: "post",
    data: data,
  });
};

export const confirmSubscriptionStatus = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/palsubscribe/knowstatus`,
    method: "post",
    data: data,
  });
};
