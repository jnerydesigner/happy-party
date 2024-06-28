export type PresentHotResponse = {
  id: string;
  name: string;
  image: string;
  urlSailers: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PresentsHotResponsePagination = {
  presentsHot: PresentHotResponse[];
  pagination: Pagination;
};
