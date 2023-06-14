import { API } from "@/api/api";
import type { FindCriteriaDto, RoomDto } from "@/api/rooms/dto";

const baseRoute = '/rooms'

export const roomsApi = {
  get: (dto: FindCriteriaDto): Promise<RoomDto[]> => API.get(baseRoute, { params: dto}).then(data => data.data),

  getById: (id: number): Promise<RoomDto> => API.get(`${baseRoute}/${id}`).then(data => data.data),

  create: (dto: RoomDto): Promise<RoomDto> => API.post(baseRoute, dto).then(data => data.data),

  update: (id: number, dto: RoomDto): Promise<RoomDto> => API.put(`${baseRoute}/${id}`, dto).then(data => data.data),

  delete: (id: number) => API.delete(`${baseRoute}/${id}`).then(data => data.data),
};