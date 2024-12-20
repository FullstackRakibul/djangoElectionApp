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

export interface addressInterface {
  line1: string,
  division_id: number,
  district_id: number,
  upazila_id: number,
  union_id: number,
  ward_id: number,
  city_corporation_id: number,
  municipality_id: number
}