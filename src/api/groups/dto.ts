import type {UserDto} from "@/api/users/dto";

export interface GroupDto {
  id?: number
  name?: string
  code?: string
  owner?: number
  users?: UserDto[]
}

export interface FindCriteriaDto {
  id?: number
  name?: string
  code?: string
  owner?: number
}