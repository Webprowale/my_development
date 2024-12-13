import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
import { toast } from "sonner";

export type ErrorData = {
	message: string;
	validationErrors?: string | [string] | [{ description: string }];
};

const baseURL =
	process.env.NEXT_PUBLIC_NODE_ENV === "development"
		? process.env.NEXT_PUBLIC_BASE_URL_STAGGING
		: process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION;

const api = axios.create({
	baseURL,
	withCredentials: false,
	headers: {
		Token: "gopaddi@v1",
	},
});

api.interceptors.request.use(async (config) => {
	const userId = await TokenStorageService.getToken();

	if (userId) {
		config.headers["Userid"] = userId;

		axios.defaults.headers.common["Userid"] = userId;
	} else {
		delete config.headers["Userid"];
		delete axios.defaults.headers.common["Userid"];
	}

	return config;
});

export default api;

export const TOKEN_KEY = "Userid";
const isServer = typeof window === "undefined";

export const TokenStorageService = {
	async getToken() {
		return isServer ? (await import("next/headers")).cookies().get(TOKEN_KEY)?.value : getCookie(TOKEN_KEY);
	},
};

export const showApiErrors = (errors: any[]) => {
	errors.forEach((error) => {
		for (const key in error) {
			if (error.hasOwnProperty(key)) {
				toast.error(`${key}: ${error[key]}`);
			}
		}
	});
};
