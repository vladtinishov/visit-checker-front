import { defineStore } from "pinia";
import { groupsApi } from "@/api/groups";
import type {FindCriteriaDto, GroupDto} from "@/api/groups/dto";

export const useGroupStore = defineStore("group", {
  state: () => ({
    group: {} as GroupDto | null,
    groups: [] as GroupDto[],
    isLoading: false as boolean,
  }),

  actions: {
    async get(dto: FindCriteriaDto) {
      try {
        this.isLoading = true
        const res = await groupsApi.get(dto);
        this.groups = res;
      } catch (error) {
        console.error("Произошла ошибка при получении:", error);
      } finally {
        this.isLoading = false
      }
    },

    async getOne(id: number) {
      try {
        const res = await groupsApi.getById(id);
        this.group = res;
      } catch (error) {
        console.error("Произошла ошибка при получении:", error);
      }
    },

    async searchByCode(code: string) {
      try {
        this.isLoading = true
        const res = await groupsApi.get({ code });
        if (res.length) this.group = res[0];
      } catch (error) {
        console.error("Произошла ошибка при получении:", error);
      } finally {
        this.isLoading = false
      }
    },

    async create() {
      try {
        this.isLoading = false
        const res = await groupsApi.create(this.group!);
        this.group = res;
      } catch (error) {
        console.error("Произошла ошибка при создании:", error);
      } finally {
        this.isLoading = true
      }
    },

    async udpate(id: number, dto: GroupDto) {
      try {
        await groupsApi.update(id, dto);
      } catch (error) {
        console.error("Произошла ошибка при обновлении:", error);
      }
    },

    async delete(id: number) {
      try {
        await groupsApi.delete(id);
        this.group = null;
      } catch (error) {
        console.error("Произошла ошибка при удалении:", error);
      }
    },
  },
});
