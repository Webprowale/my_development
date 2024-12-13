import { getCookie, hasCookie } from "cookies-next";
import { fmtResponse } from "@/utils";
import axios, { AxiosRequestConfig } from "axios";
import { getUserId } from "@/lib/get-userId";
import { usePathname } from "next/navigation";
import { GetServerSidePropsContext } from "next";
import { toast } from "sonner";
// import toast from "react-hot-toast";

let context: GetServerSidePropsContext | null = null;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

const checkInternetConnectivity = () => {
  if (!navigator.onLine) {
    // toast.error("No internet connection");
    return Promise.reject(new Error("No internet connection"));
  }
  return Promise.resolve();
};

const baseURL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_URL_STAGGING
    : process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION;

const service = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    Token: "gopaddi@v1",
  },
});

const authPath = "/auth/";

// request interceptor
service.interceptors.request.use(
  async function (config: any) {
    // Get userId
    // const userId = '98';

    const userId = await TokenStorageService.getToken();
    // console.log("Cooking", context?.req?.cookies);
    // Set userId header only if not on an auth link
    if (userId) {
      // config.headers["Userid"] = "44";
      config.headers["Userid"] = userId;

      // console.log("delete did not run");
      //@ts-ignore
      axios.defaults.headers.common["Userid"] = userId;
      // console.log(userId);
    } else {
      delete config.headers["Userid"];
      delete axios.defaults.headers.common["Userid"];
      console.log("delete ran");
    }
    // config.headers["Userid"] = "98";
    // axios.defaults.headers.common["Userid"] = "98";

    return config;

    // await checkInternetConnectivity();
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
service.interceptors.response.use(
  //   @ts-ignore

  (response) => {
    // Return the entire AxiosResponse object
    // return fmtResponse(response, false);
    return response?.data;
  },
  function (error) {
    console.log(error, "this is the error from the interceptor----2");

    // Check if error is an axios error
    if (error && !error) {
      const { response } = error;
      // return fmtResponse(response, true);
      return response;
    } else {
      const { response } = error;
      // return fmtResponse(response, true);
      return response;
    }
  },
);

export default service;

export const TOKEN_KEY = "Userid";
const isServer = typeof window === "undefined";

export const TokenStorageService = {
  async getToken() {
    return isServer
      ? (await import("next/headers")).cookies().get(TOKEN_KEY)?.value
      : getCookie(TOKEN_KEY);
  },
};


export const  showApiErrors = (errors:any[]) => {
  errors.forEach(error => {
    for (const key in error) {
      if (error.hasOwnProperty(key)) {
        toast.error(`${key}: ${error[key]}`);
      }
    }
  });
}