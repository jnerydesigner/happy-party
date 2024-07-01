export type UserPrismaType = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  Party: PartyPrismaType[];
};

export type PartyPrismaType = {
  id: string;
  name: string;
  description: string;
  date: Date;
  banner: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  user: UserPrismaType;
  type_party: TypePartyType;
  type_party_id: string;
  list_presents?: ListPresentsType;
  married?: MarriedType;
  birthdays?: BirthDaysType;
};

export type TypePartyType = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  party?: PartyPrismaType;
};

export type ListPresentsType = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  party: PartyPrismaType;
  party_id: string;
  Presents: PresentsType[];
};

export type PresentsType = {
  id: string;
  name: string;
  image: string;
  url_sailers: string;
  created_at: Date;
  updated_at: Date;
  list_presents: ListPresentsType;
  list_presents_id: string;
};

export type PresentsHotType = {
  id: string;
  name: string;
  image: string;
  url_sailers: string;
  created_at: Date;
  updated_at: Date;
};

export type MarriedType = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  party?: PartyPrismaType;
  party_id?: string;
};

export type BirthDaysType = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  party?: PartyPrismaType;
  party_id?: string;
};
