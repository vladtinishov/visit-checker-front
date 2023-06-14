import { defineStore } from "pinia";
import { eventsApi } from "@/api/events";
import type {FindCriteriaDto, EventDto, GetEventsReportsDto} from "@/api/events/dto";
import {useGroupStore} from "@/stores/group";
import dayjs from "dayjs";

export const useEventsStore = defineStore("events", {
  state: () => ({
    event: {} as EventDto,
    events: [] as EventDto[],
    reports: [] as EventDto[],
    report: {} as EventDto,
    isLoading: false as boolean,
    date: ''
  }),

  getters: {
    isNew: (state) => !state?.event?.id,
    truants: (state) => {
      const groupUsers = useGroupStore().group?.users || []
      return groupUsers.filter(user => !state.report?.users?.some(({id}) => user.id === id));
    }
  },

  actions: {
    async get(dto: FindCriteriaDto) {
      try {
        this.isLoading = true
        const res = await eventsApi.get(dto);
        this.events = res;
      } catch (error) {
        console.error("Произошла ошибка при получении:", error);
      } finally {
        this.isLoading = false
      }
    },

    async getOne(id: number) {
      try {
        this.isLoading = true

        const res = await eventsApi.getById(id);
        this.event = res;
      } catch (error) {
        console.error("Произошла ошибка при получении:", error);
      } finally {
        this.isLoading = false
      }
    },

    async create() {
      try {
        this.isLoading = true
        const res = await eventsApi.create(this.event!);
        this.event = res;
        this.events.push(this.event)
      } catch (error) {
        console.error("Произошла ошибка при создании:", error);
      } finally {
        this.isLoading = false
      }
    },

    async udpate(id: number, dto: EventDto) {
      try {
        this.isLoading = true

        await eventsApi.update(id, dto);
      } catch (error) {
        console.error("Произошла ошибка при обновлении:", error);
      } finally {
        this.isLoading = false
      }
    },

    async delete(id: number) {
      try {
        await eventsApi.delete(id);
        this.events = this.events.filter(event => event.id !== id)
      } catch (error) {
        console.error("Произошла ошибка при удалении:", error);
      }
    },

    initForCreation() {
      this.event = {} as EventDto
    },

    async getReports() {
      const groupId = useGroupStore().group!.id!
      const date = this.date.length ? this.date : dayjs().format('YYYY-MM-DD')
      const dto: GetEventsReportsDto = { groupId, date }
      this.reports = await eventsApi.getReports(dto)
    }
  },
});
