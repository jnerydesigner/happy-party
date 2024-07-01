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

interface Party {
  id: string;
  name: string;
  description: string;
  banner: string;
  date: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Present {
  presentId: string;
  name: string;
  image: string;
  urlSailers: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

interface ListPresent {
  listId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  partyId: string;
  party: Party;
  user: User;
  listPresents: Present[];
}

interface PaginationListPresent {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ListPresentsResponse {
  listsPresents: ListPresent[];
  pagination: PaginationListPresent;
}
