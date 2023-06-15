import type {UserDto} from "@/api/users/dto";
import type {RoomDto} from "@/api/rooms/dto";

export interface EventDto {
  id?: number;
  roomId?: number;
  name?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  users?: UserDto[];
  room?: RoomDto;
}

export interface FindCriteriaDto {
  id?: number;
  roomId?: number;
  name?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
}

export interface GetEventsReportsDto {
  date?: string;
  groupId?: number;
  roomId?: number;
}