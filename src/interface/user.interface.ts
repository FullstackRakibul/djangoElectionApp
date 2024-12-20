

export interface GeneralUserInterface {
  username?: string
  phone: string,
  email?: string,
  user_type: number,
  party?: number
}

export interface GeneralUserTypeInterface {
  id?: number
  user_type_name: string,
  user_type_name_ban?: string
} 