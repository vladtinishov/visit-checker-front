import { API } from "@/api/api";
import type {LoginUserDto, UserDto} from "@/api/users/dto";

const baseRoute = '/users'

export const usersApi = {
  get: () => API.get(baseRoute).then(data => data.data),

  getById: (id: number) => API.get(`${baseRoute}/${id}`).then(data => data.data),

  create: (dto: UserDto) => API.post(baseRoute, dto).then(data => data.data),

  update: (id: number, dto: UserDto) => API.put(`${baseRoute}/${id}`, dto).then(data => data.data),

  delete: (id: number) => API.delete(`${baseRoute}/${id}`).then(data => data.data),

  auth: (dto: LoginUserDto): Promise<UserDto> => API.post(`/auth/login`, dto).then(data => data.data),
};