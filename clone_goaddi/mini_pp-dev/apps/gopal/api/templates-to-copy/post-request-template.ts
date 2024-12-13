"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/query/api-endpoints";
import { GenericResponse } from "@/lib/query/generic-types";
import { postRequest } from "@/lib/query/http-helper";


export interface IResponse {}

export interface IPayload {}

type ResponseType = IResponse;

// or

type ResponseType2 = GenericResponse<IResponse>;

async function postRequestAPI(payload: IPayload) {
	return postRequest<ResponseType, IPayload>(API_ENDPOINTS.POSTS.CREATE_COLLECTION, payload);
}

export function usePostRequestHook() {
	// const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postRequestAPI,
		onSuccess: (data) => {
			// toast.success(data.message);

			queryClient.invalidateQueries({ queryKey: ["key-to-invalidate"] });
		},
		onError: (error) => {
			console.log(error, "error from mutation");
		},
	});
}
