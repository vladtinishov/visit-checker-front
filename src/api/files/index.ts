import { API } from "@/api/api";

const baseRoute = '/photos/upload'

export const filesApi = {
  create: (dto: FormData) => API.post(baseRoute, dto, { headers: {
    'Content-Type': 'multipart/form-data'
  }}).then(data => data.data),
};