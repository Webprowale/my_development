"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/query/api-endpoints";
import { GenericResponse } from "@/lib/query/generic-types";
import { postRequest } from "@/lib/query/http-helper";


export interface ISavePostResponse {
      status:    boolean;
      message:   string;
      insert_id: number;
}


export interface IPayload {
      post_id:       string;
      collection_id: string;
      type:          string;
}


type ResponseType = ISavePostResponse;

// or


async function savePost(payload: IPayload) {
	return postRequest<ResponseType, IPayload>(API_ENDPOINTS.POSTS.SAVE_POST, payload);
}

export function useSavePost() {
	// const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: savePost,
		onError: (error) => {
			console.log(error, "error from mutation");
		},
	});
}
