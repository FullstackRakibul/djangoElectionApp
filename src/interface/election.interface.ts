import type { addressInterface } from "./common.interface";


export interface electionCenterListInterface {
  id?: number;
  center_name: string;
  center_name_ban?: string;
  address?: number;
  address_details?: addressInterface;
}

export interface electionCenterInterface {
  id?: number;
  center_name: string;
  center_name_ban?: string;
  address?: number;
}

export interface electionInfoInterface {
  id?: number
  election_info_name: string;
  election_info_name_ban?: string;
  total_voter?: number;
  total_votes?: number;
  election_type?: number;
  created_by?: number;
  candidates?: [];
  parties?: [];
  workers?: [];
}

export interface electionDataInterface {
  vote_count: number;
  election: number;
  worker: [];
  created_by?: number;
  updated_by?: number;
}

export interface electionDetailsInterface {
  election_info_name: string;
  election_info_name_ban?: string;
  total_voter: number;
  total_votes: number;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: number;
  election_type: number;
  candidates: [];
  parties: [];
  workers: [];
}

export interface electionSeatInterface {
  election_seat_name: string;
  election_seat_name_ban?: string;
  address?: number;
  election_center?: [];
}

export interface electionType {
  election_type_name: string;
  election_type_name_ban?: string;
  created_by?: string;
}

export interface electionPartyInterfcae {
  party_name: string;
  party_name_ban?: string;
  party_symbol: string;
  created_by?: string;
}

export interface DataTableHeaderForVoteCount {
  title: string;    // Display text
  key: string;      // Item property key
  align?: 'start' | 'end' | 'center';
  sortable?: boolean;
  // ... other optional properties
}