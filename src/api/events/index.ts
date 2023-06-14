import { API } from "@/api/api";
import type {EventDto, FindCriteriaDto, GetEventsReportsDto} from "@/api/events/dto";

const baseRoute = '/events'

export const eventsApi = {
  get: (dto: FindCriteriaDto): Promise<EventDto[]> => API.get(baseRoute, { params: dto}).then(data => data.data),

  getById: (id: number): Promise<EventDto> => API.get(`${baseRoute}/${id}`).then(data => data.data),

  create: (dto: EventDto): Promise<EventDto> => API.post(baseRoute, dto).then(data => data.data),

  update: (id: number, dto: EventDto): Promise<EventDto> => API.put(`${baseRoute}/${id}`, dto).then(data => data.data),

  delete: (id: number) => API.delete(`${baseRoute}/${id}`).then(data => data.data),

  getReports: (dto: GetEventsReportsDto): Promise<EventDto[]> => API.get(`${baseRoute}/reports`, { params: dto}).then(data => data.data),
};