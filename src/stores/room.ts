import { defineStore } from "pinia";
import { roomsApi } from "@/api/rooms";
import type { FindCriteriaDto, RoomDto } from "@/api/rooms/dto";
import dayjs from "dayjs";

export interface PreparedEvent {
  roomName: string,
  date: string,
  time: string,
}

export const useRoomStore = defineStore("room", {
  state: () => ({
    room: {} as RoomDto | null,
    rooms: [] as RoomDto[],
    isLoading: false as boolean,
    date: '',
  }),

  getters: {
    isNew: (state) => !state?.room?.id,
    allEvents: (state) =>  {
      let result = [] as PreparedEvent[]
      state.rooms.forEach(room => {
        const preparedEvents = room.events
          ?.map(event => ({
            id: event.id,
            roomName: room.name || '',
            date: event.date  || '',
            time: event.startTime || '00:00'
          }))

        if (preparedEvents && preparedEvents.length) result = result.concat(preparedEvents)
      })

      return result.filter(event => {
        console.log(event.date, state.date, dayjs(event.date).format('YYYY-MM-DD') === dayjs(state.date).format('YYYY-MM-DD'))
        return dayjs(event.date).format('YYYY-MM-DD') === dayjs(state.date).format('YYYY-MM-DD')
      })
    },

    roomsForSelect: (state) => state.rooms.map(room => ({ title: room.name, value: room.id }))
  },

  actions: {
    async get(dto: FindCriteriaDto) {
      try {
        this.isLoading = true
        const res = await roomsApi.get(dto);
        this.rooms = res;
      } catch (error) {
        console.error("Произошла ошибка при получении:", error);
      } finally {
        this.isLoading = false
      }
    },

    async getOne(id: number) {
      try {
        const res = await roomsApi.getById(id);
        this.room = res;
      } catch (error) {
        console.error("Произошла ошибка при получении:", error);
      }
    },

    async create() {
      try {
        this.isLoading = false
        const res = await roomsApi.create(this.room!);
        this.room = res;
      } catch (error) {
        console.error("Произошла ошибка при создании:", error);
      } finally {
        this.isLoading = true
      }
    },

    async udpate(id: number, dto: RoomDto) {
      try {
        await roomsApi.update(id, dto);
      } catch (error) {
        console.error("Произошла ошибка при обновлении:", error);
      }
    },

    async delete(id: number) {
      try {
        await roomsApi.delete(id);
        this.room = null;
      } catch (error) {
        console.error("Произошла ошибка при удалении:", error);
      }
    },

    initForCreation() {
      this.room = {} as RoomDto
    }
  },
});
