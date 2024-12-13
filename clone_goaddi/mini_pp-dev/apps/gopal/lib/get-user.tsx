import { getCookie } from "cookies-next";

export default async function getUser() {
  const userId = await TokenStorageService.getToken();

  // console.log("USERID GET USER", userId);

  if (!userId) {
    return false;
  }

  return userId;
}

//use

export const getUserId = async () => {
  const userId = await TokenStorageService.getToken();

  // console.log("USERID GET USER ID", userId);

  if (!userId) {

    return "";
  }

  return userId;
};

// export  getUserId;

export const TOKEN_KEY = "Userid";
const isServer = typeof window === "undefined";

export const TokenStorageService = {
  async getToken() {
    return isServer
      ? (await import("next/headers")).cookies().get(TOKEN_KEY)?.value
      : getCookie(TOKEN_KEY);
  },
};
