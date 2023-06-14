<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import TSection from "@/components/base/section/TSection.vue";
import TButton from "@/components/base/button/TButton.vue";
import TBlock from "@/components/base/block/TBlock.vue";
import TDrawer from "@/components/base/drawer/TDrawer.vue";
import TInput from "@/components/base/input/TInput.vue";
import TModal from "@/components/base/modal/TModal.vue";
import {useGroupStore} from "@/stores/group";
import {useRoomStore} from "@/stores/room";
import type {RoomDto} from "@/api/rooms/dto";
import {useEventsStore} from "@/stores/events";
import type {EventDto} from "@/api/events/dto";
import TLoader from "@/components/base/loader/TLoader.vue";

// refs & vars
const usersStore = useUserStore()
const groupsStore = useGroupStore()
const roomsStore = useRoomStore()
const eventStore = useEventsStore()

const router = useRouter()

const { user } = storeToRefs(usersStore)
const { group } = storeToRefs(groupsStore)
const { room, rooms, isNew } = storeToRefs(roomsStore)
const { event, events, isLoading: isEventsLoading } = storeToRefs(eventStore)

const showForm = ref<boolean>(false)
const showModal = ref<boolean>(false)

// computed

// methods
const openForm = (roomToEdit?: RoomDto) => {
  showForm.value = true

  if (roomToEdit) {
    room.value = roomToEdit
    if (room.value?.events) events.value = room.value.events
  } else roomsStore.initForCreation()
}

const closeForm = () => showForm.value = false

const openModal = (eventToEdit?: EventDto) => {
  showModal.value = true

  if (eventToEdit) {
    event.value = eventToEdit
  } else eventStore.initForCreation()
}

const closeModal = () => {
  showModal.value = false
}

const saveRoom = async () => {
  room.value!.groupId = group.value!.id!
  await roomsStore.create()
  await roomsStore.get({ groupId: group.value!.id! })
  closeForm()
}

const saveEvent = async () => {
  event.value!.roomId = room.value!.id
  await eventStore.create()
  closeModal()
}

const deleteEvent = async (id: number) => {
  await eventStore.delete(id)
}

const deleteRoom = async () => {
  await roomsStore.delete(room.value!.id!)
  closeForm()
  await roomsStore.get({ groupId: group.value!.id! })
}

// hooks
onMounted(() => {
  if (!user.value.id) router.push({ name: 'login' })
})

</script>

<template>
  <TSection>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">Комнаты</h1>
      <TButton @click="openForm">Создать</TButton>
    </div>
    <div>
      <div class="mt-4" v-if="rooms.length">
        <TBlock v-for="room in rooms" :key="room.id" class="mt-4">
          <div class="flex justify-between items-center">
            <div class="font-bold text-xm">
              {{ room.name }}
            </div>
            <div class="text-gray-500 cursor-pointer" @click="openForm(room)">
              Изменить
            </div>
          </div>
        </TBlock>
      </div>
      <div class="text-2xl font-bold text-gray-500 text-center mt-10" v-else>У вас нет комнат</div>
    </div>
  </TSection>
  <TDrawer :width="500" v-if="showForm" @close="closeForm">
    <div>
      <div class="flex items-center justify-between" v-if="isNew">
        <h1 class="text-2xl font-bold">Новая комната</h1>
        <TButton @click="saveRoom">Сохранить</TButton>
      </div>
      <div class="flex items-center justify-between" v-else>
        <h1 class="text-2xl font-bold">Редактирование</h1>
        <TButton @click="saveRoom">Сохранить</TButton>
      </div>
      <div class="mt-2">
        <TInput placeholder="Кабинет 304" v-model="room.name" />
      </div>
    </div>
    <div class="mt-5" v-if="!isNew">
      <h1 class="text-xl font-bold">События:</h1>
      <TButton color="light" class="mt-4" @click="openModal">Создать</TButton>
      <div class="mt-5" v-if="events.length">
        <div class="px-5 flex font-bold text-gray-500">
          <p class="w-full">Название</p>
          <p class="w-full">Дата</p>
          <p class="w-full">Время</p>
        </div>
        <TBlock v-for="event in events" :key="event.id" class="mt-4">
          <div class="flex">
            <div class="w-full">
              <h1 class="font-bold">{{ event.name}}</h1>
            </div>
            <div class="w-full">
              <p class="font-bold">{{ event.date}}</p>
            </div>
            <div class="w-full">
              <div class="flex justify-between">
                <p class="font-bold">{{ event.startTime}} - {{ event.endTime}}</p>
                <div class="rounded-full bg-red-300 w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-600 ml-4" @click="deleteEvent(event.id)">
                  <span class="font-bold text-white" style="font-size: 10px; margin-bottom: 3px">╳</span>
                </div>
              </div>
            </div>
          </div>
        </TBlock>
      </div>
      <div @click="deleteRoom" v-if="!isNew" class="text-red-300 hover:text-red-500 cursor-pointer font-bold mt-5 text-right">
        Удалить
      </div>
    </div>
  </TDrawer>
  <TModal :width="500" v-if="showModal" @close="closeModal">
    <div v-if="!isEventsLoading">
      <div>
        <TInput label="Название:" placeholder="Английский" v-model="event.name" />
      </div>
      <div class="mt-4">
        <TInput label="День" :disable-past="true" type="date" v-model="event.date" />
      </div>
      <div class="mt-4">
        <TInput label="От" :disable-past="true" type="time" v-model="event.startTime" />
        <TInput label="До" type="time" class="ml-4" v-model="event.endTime" />
      </div>
      <TButton color="light" class="mt-4" @click="saveEvent">Добавить</TButton>
    </div>
    <div v-else class="flex justify-center items-center">
      <TLoader />
    </div>
  </TModal>
</template>