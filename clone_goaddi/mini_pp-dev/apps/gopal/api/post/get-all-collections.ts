import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/query/api-endpoints";
import { GenericResponse } from "@/lib/query/generic-types";
import { getRequest } from "@/lib/query/http-helper";


export interface CollectionData {
      id:         string;
      title:      string;
      image:      string;
      status:     string;
      created_at: Date;
}
type ResponseType = GenericResponse<CollectionData[]>;



async function getCollections() {
      return getRequest<ResponseType>(API_ENDPOINTS.POSTS.GET_COLLECTIONS);
}

export function useGetCollections() {
      return useQuery({
    queryKey: ["get-all-collections"],
    queryFn: () => getCollections(),
    enabled: true
  });
}



