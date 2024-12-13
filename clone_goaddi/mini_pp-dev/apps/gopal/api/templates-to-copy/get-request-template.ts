import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/query/api-endpoints";
import { GenericResponse } from "@/lib/query/generic-types";
import { getRequest } from "@/lib/query/http-helper";

export interface IData {}
type ResponseType = GenericResponse<IData>;

async function getRequestAPI() {
	return getRequest<ResponseType>(API_ENDPOINTS.BASE);
}

export function getRequestHook() {
	return useQuery({
		queryKey: ["get-request-key"],
		queryFn: () => getRequestAPI(),
		enabled: true,
	});
}
