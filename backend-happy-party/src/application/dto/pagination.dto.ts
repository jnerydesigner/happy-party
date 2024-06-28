export type UserResponse = {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type UsersResponsePagination = {
  users: UserResponse[];
  pagination: Pagination;
};
