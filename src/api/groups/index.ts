import { API } from "@/api/api";
import type {FindCriteriaDto, GroupDto} from "@/api/groups/dto";

const baseRoute = '/groups'

export const groupsApi = {
  get: (dto: FindCriteriaDto): Promise<GroupDto[]> => API.get(baseRoute, { params: dto}).then(data => data.data),

  getById: (id: number): Promise<GroupDto> => API.get(`${baseRoute}/${id}`).then(data => data.data),

  create: (dto: GroupDto): Promise<GroupDto> => API.post(baseRoute, dto).then(data => data.data),

  update: (id: number, dto: GroupDto): Promise<GroupDto> => API.put(`${baseRoute}/${id}`, dto).then(data => data.data),

  delete: (id: number) => API.delete(`${baseRoute}/${id}`).then(data => data.data),
};