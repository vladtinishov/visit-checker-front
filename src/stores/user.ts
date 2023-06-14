import { defineStore } from "pinia";
import { usersApi } from "@/api/users";
import type {UserDto} from "@/api/users/dto";
import {useRouter} from "vue-router";
import {useGroupStore} from "@/stores/group";
import {useRoomStore} from "@/stores/room";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as UserDto | null,
    isLoading: false,
  }),

  actions: {
    async initAll() {
      const groupId = this.user!.groupId!
      await useGroupStore().getOne(groupId)
      await useRoomStore().get({ groupId })
    },

    async getUser(userId: number) {
      try {
        const user = await usersApi.getById(userId);
        this.user = user;
      } catch (error) {
        console.error("Произошла ошибка при получении пользователя:", error);
      }
    },

    async createUser(newUser: UserDto) {
      try {
        this.isLoading = true
        const createdUser = await usersApi.create(newUser);
        this.user = createdUser;
        await this.initAll()
      } catch (error) {
        console.error("Произошла ошибка при создании пользователя:", error);
      } finally {
        this.isLoading = false
      }
    },

    async updateUser(userId: number, updatedUser: UserDto) {
      try {
        await usersApi.update(userId, updatedUser);
      } catch (error) {
        console.error("Произошла ошибка при обновлении пользователя:", error);
      }
    },

    async deleteUser(userId: number) {
      try {
        const deletedUser = await usersApi.delete(userId);
        this.user = null;
      } catch (error) {
        console.error("Произошла ошибка при удалении пользователя:", error);
      }
    },

    async login() {
      try {
        this.isLoading = true
        const { login, password } = this.user!
        this.user = await usersApi.auth({ login, password })

        await this.initAll()
      } catch (error) {
        console.error("Произошла ошибка при удалении пользователя:", error);
      } finally {
        this.isLoading = false
      }
    }
  },
});
