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

export function register(data: any): ResponsTypes {
  return $({
    url: `/tokyodevbckend/index.php/user/userRegistration`,
    method: "post",
    data: data,
  });
}

export function login(data: any): ResponsTypes {
  return $({
    url: `/tokyodevbckend/index.php/user/userLogin`,
    method: "post",
    data: data,
  });
}

export function resetPassword(data: any): ResponsTypes {
  return $({
    url: `/tokyodevbckend/index.php/user/resetPassword`,
    method: "post",
    data: data,
  });
}

export function verifyOtp(data: any): ResponsTypes {
  return $({
    url: `/tokyodevbckend/index.php/user/userVerification`,
    method: "post",
    data: data,
  });
}

export function resetOTP(data: any): ResponsTypes {
  return $({
    url: `/tokyodevbckend/index.php/user/getToken`,
    method: "post",
    data: data,
  });
}

export function sendOtp(data: any): ResponsTypes {
  return $({
    url: `/tokyodevbckend/index.php/user/resend_otp`,
    method: "post",
    data: data,
  });
}

export function googleAuth(data: any): ResponsTypes {
  return $({
    url: `/gopaddiberlin/gopaddiberlinbkend/web/google_auth/check_google_info`,
    method: "post",
    data: data,
  });
}

// export function patchColor(id: any, data: any, otherId: any): ResponsTypes {
//   return $({
//     url: `/api/${id}/colors/${otherId}`,
//     method: "patch",
//     data: data,
//   });
// }

// export function deleteColor(id: any, otherId: any): ResponsTypes {
//   return $({
//     url: `/api/${id}/colors/${otherId}`,
//     method: "delete",
//   });
// }
