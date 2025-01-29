export interface Country {
  id?: number;
  country_name: string;
  country_name_ban?: string;
}

export interface divisionListInterface {
  id?: number;
  division_name: string;
  division_name_ban?: string;
  country_id?: number;
}


export interface districtListInterface {
  id?: number;
  district_name: string,
  district_name_ban?: string,
  division?: number
}


export interface wordListInterface {
  id?: number
  ward_name: string;
  ward_name_ban?: string;
  union: number;
}

export interface unionListInterface {
  id?: number
  union_name: string;
  union_name_ban?: string;
  upazila: number;
}

export interface upzillahListInterface {
  id?: number
  upazila_name: string;
  upazila_name_ban: string;
  district: number;
  district_name?: string;
}

export interface addressInterface {
  id?: number,
  line1: string,
  division: number,
  district: number,
  upazila: number,
  union: number,
  ward: number,
  city_corporation?: number,
  municipality?: number
}