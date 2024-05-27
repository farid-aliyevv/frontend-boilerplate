export interface PaginationParams {
	page: number;
	pageSize: number;
}

export interface PaginationResponse {
	index: number;
	size: number;
	count: number;
	pages: number;
	hasPrevious: boolean;
	hasNext: boolean;
}
