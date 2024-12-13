import { getCookie, deleteCookie } from "cookies-next";

export const getUserId = () => {
  const userId = getCookie("Userid");

  // console.log("USERID GET USER ID", userId);
  // return "98"s
  if (!userId) {
    return "";
  }

  return userId;
};

export const deleteUser = () => {
  deleteCookie("Userid");
};
