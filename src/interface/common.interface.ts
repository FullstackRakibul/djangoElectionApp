export interface Country {
  id?: number;
  country_name: string;
  country_name_ban?: string;
}

export interface wordListInterface {
  ward_name: string;
  ward_name_ban?: string;
  union: number;
}

export interface unionListInterface {
  union_name: string;
  union_name_ban?: string;
  upazila: number;
}

export interface upzillahListInterface {
  upazila_name: string;
  upazila_name_ban: string;
  district: number;
  district_name?: string;
}

export interface electionPartyInterfcae {
  party_name: string;
  party_name_ban?: string;
  party_symbol: string;
  created_by?: string;
}
