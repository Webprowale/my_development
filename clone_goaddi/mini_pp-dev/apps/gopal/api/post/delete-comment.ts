"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/query/api-endpoints";
import { GenericResponse } from "@/lib/query/generic-types";
import { postRequest } from "@/lib/query/http-helper";
import { toast } from "sonner";


export interface ISavePostResponse {
	status: boolean;
	message: string;
	insert_id: number;
}

export interface IPayload {
	commentId: string;
}

type ResponseType = GenericResponse<string[]>;

// or

async function deleteComment(payload: IPayload) {
	return postRequest<ResponseType, IPayload>(API_ENDPOINTS.COMMENT.DELETE_COMMENT, payload);
}

export function useDeleteComment() {
	// const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteComment,
		onSuccess(data)
		{
			toast.success(data.message)
		},
		onError: (error) => {
			console.log(error, "error from mutation");
		},
	});
}
