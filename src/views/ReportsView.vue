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
import {OhVueIcon} from "oh-vue-icons";
import { CoClock } from "oh-vue-icons/icons";

// refs & vars
const usersStore = useUserStore()
const groupsStore = useGroupStore()
const roomsStore = useRoomStore()
const eventStore = useEventsStore()

const router = useRouter()

const { user } = storeToRefs(usersStore)
const { event, events, isLoading: isEventsLoading, reports, report, truants, date } = storeToRefs(eventStore)

const showForm = ref<boolean>(false)
const showModal = ref<boolean>(false)

// computed

// methods
const openForm = (reportToView?: EventDto) => {
  showForm.value = true
  report.value = reportToView!
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

const searchReports = () => {
  eventStore.getReports()
  closeModal()
}

// hooks
onMounted(() => {
  eventStore.getReports()
  if (!user.value.id) router.push({ name: 'login' })
})
</script>

<template>
  <TSection>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">Отчёты</h1>
      <TButton @click="openModal">Фильтры</TButton>
    </div>
    <div>
      <div class="mt-4" v-if="reports.length">
        <TBlock v-for="report in reports" :key="report.id" class="mt-4">
          <div class="flex justify-between items-center">
            <div class="font-bold text-xm">
              {{ report.name }}
            </div>
            <div class="text-gray-500 cursor-pointer" @click="openForm(report)">
              смотреть
            </div>
          </div>
        </TBlock>
      </div>
      <div class="text-2xl font-bold text-gray-500 text-center mt-10" v-else>Пока нет отчётов</div>
    </div>
  </TSection>
  <TDrawer :width="500" v-if="showForm" @close="closeForm">
    <div>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Отчёт</h1>
      </div>
      <div class="my-4">
        <div class="font-bold text-gray-700 mt-3" style="font-size: 17px">
          <span>Событие:</span>
          <span class="ml-2">{{ report.name }}</span>
        </div>
        <div class="font-bold text-gray-700 mt-3" style="font-size: 17px">
          <span>Комната:</span>
          <span class="ml-2">{{ report?.room?.name }}</span>
        </div>
      </div>
      <div class="flex">
        <div class="text-gray-700 mt-3" style="font-size: 17px">
          <v-icon name="co-calendar" />
          <span class="ml-1">{{ report.date }}</span>
        </div>
        <div class="text-gray-700 mt-3 ml-5" style="font-size: 17px">
          <v-icon name="co-clock" />
          <span class="ml-1">{{ report.startTime }} - {{ report.endTime}}</span>
        </div>
      </div>
      <div class="mt-5" v-if="report?.users?.length">
        <div class="px-5 flex font-bold text-gray-500">
          <p class="w-full">Имя</p>
          <p class="w-full">Опоздание</p>
        </div>
        <TBlock v-for="user in report.users" :key="user.id" class="mt-2">
          <div class="flex">
            <div class="w-full">
              <h1>{{ user.name}}</h1>
            </div>
            <div class="w-full">
              <p class="font-bold">{{ user.lateTime}} <span class="text-gray-800 font-medium">мин</span></p>
            </div>
          </div>
        </TBlock>
      </div>
      <div v-if="truants.length">
        <h1 class="mt-5 font-bold">Не пришедшие:</h1>
        <div class="mt-2">
          <TBlock v-for="user in truants" :key="user.id" class="mt-2">
            <div class="flex">
              <div class="w-full">
                <h1>{{ user.name}}</h1>
              </div>
            </div>
          </TBlock>
        </div>
      </div>

    </div>
  </TDrawer>
  <TModal :width="500" v-if="showModal" @close="closeModal">
    <div v-if="!isEventsLoading">
      <div class="mt-4">
        <TInput label="День" :disable-past="true" type="date" v-model="date" />
      </div>
      <TButton color="light" class="mt-4" @click="searchReports">Искать</TButton>
    </div>
    <div v-else class="flex justify-center items-center">
      <TLoader />
    </div>
  </TModal>
</template>