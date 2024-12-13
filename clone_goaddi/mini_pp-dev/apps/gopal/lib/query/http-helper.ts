import api from "./http";

export const getRequest = async <T>(url: string) => {
	const { data } = await api.get<T>(`${url}`);

	return data;
};

export const postRequest = async <T, P>(url: string, payload: P) => {
	const { data } = await api.post<T>(url, payload);

	return data;
};

export const patchRequest = async <T, P>(url: string, payload: P) => {
	return await api.patch<T>(url, payload);
};

export const putRequest = async <T, P>(url: string, payload: P) => {
	const { data } = await api.put<T>(url, payload);

	return data;
};

export const deleteRequest = async <T, P>(url: string, payload: P) => {
	const { data } = await api.delete<T>(url, payload);

	return data;
};
