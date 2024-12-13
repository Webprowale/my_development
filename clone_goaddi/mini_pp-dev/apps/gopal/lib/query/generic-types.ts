export interface GenericResponse<T> {
	status: boolean;
	message: string;
	data: T;
}
