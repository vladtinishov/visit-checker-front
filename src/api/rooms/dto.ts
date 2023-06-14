import type {EventDto} from "@/api/events/dto";

export interface RoomDto {
  id?: number
  name?: string
  groupId?: number
  events?: EventDto[]
}

export interface FindCriteriaDto {
  id?: number
  name?: string
  groupId?: number
}