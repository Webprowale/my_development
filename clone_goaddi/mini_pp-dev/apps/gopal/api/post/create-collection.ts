"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/query/api-endpoints";
import { GenericResponse } from "@/lib/query/generic-types";
import { getRequest, postRequest } from "@/lib/query/http-helper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface ICreateCollectionResponse {
      status:    boolean;
      message:   string;
      insert_id: number;
}


export interface IPayload {
      title:       string;
      file:        string;
}

type ResponseType = ICreateCollectionResponse;

async function createCollection(payload: IPayload) {
	return postRequest<ResponseType, IPayload>(API_ENDPOINTS.POSTS.CREATE_COLLECTION, payload);
}

export function useCreateCollection() {
	// const router = useRouter();
      const queryClient = useQueryClient()
      

	return useMutation({
		mutationFn: createCollection,
		onSuccess: (data) => {
                  queryClient.invalidateQueries({queryKey: ["get-all-collections"]})
		},
		onError: (error) => {
			console.log(error, "error from mutation");
		},
	});
}
