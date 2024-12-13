import $ from "../index";

type ResponsTypes = Promise<{
  data: any;
  code?: any;
  result?: any;
  success?: boolean;
  message?: string;
  serverResponse: {
    [key: string]: any;
  };
}>;

export const getUserWallet = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/wallet/viewWallet`,
    method: "post",
  });
};

export const createWallet = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/wallet/createWallet`,
    method: "post",
  });
};

export const checkUserWalletBalance = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/wallet/checkBalance`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
  });
};

export const getTransactions = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/wallet/getTransactions`,
    method: "post",
  });
};

export const InitiateFundWallet = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/wallet/fundWalletInitiate`,
    method: "post",
    data: data,
  });
};
export const confirmFundWallet = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/wallet/fundWalletCallback`,
    method: "post",
    data: data,
  });
};
export const searchUsername = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/wallet/searchUsers`,
    method: "post",
    data: data,
  });
};
export const transferToWallet = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/wallet/transferMoney`,
    method: "post",
    data: data,
  });
};
export const createPin = (data: any): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/wallet/createPIN`,
    method: "post",
    data: data,
  });
};
export const checkPinStatus = (): ResponsTypes => {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/wallet/checkPin`,
    method: "post",
  });
};
