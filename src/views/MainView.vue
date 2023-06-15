<script setup lang="ts">
import TSection from "@/components/base/section/TSection.vue";
import TBlock from "@/components/base/block/TBlock.vue";
import {useGroupStore} from "@/stores/group";
import {storeToRefs} from "pinia";
import {useRoomStore} from "@/stores/room";
import {isPast} from "@/utils/time";
import {computed, onMounted, ref } from "vue";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import dayjs from "dayjs";

// refs & vars
const router = useRouter()
const groupsStore = useGroupStore()
const roomStore = useRoomStore()
const usersStore = useUserStore()

const { user } = storeToRefs(usersStore)

const { group } = storeToRefs(groupsStore)
const { allEvents, date } = storeToRefs(roomStore)

// computed
const eventClasses = computed(() => (date: string, time: string) => {
  return isPast(`${date} ${time}`) ? 'bg-red-100' : 'bg-blue-100'
})
// methods
const isOwner = (id: number) => id === group.value!.owner!

// hooks
onMounted(() => {
  if (!user.value.id) router.push({ name: 'login' })
  date.value = dayjs().format('YYYY-MM-DD')
})
</script>

<template>
  <TSection>
    <div class="flex w-full">
      <div class="w-full mr-2">
        <TBlock>
          <template #title>Расписание</template>
          <div class="flex">
            <div>
              <VueDatePicker inline auto-apply :enable-time-picker="false" v-model="date"></VueDatePicker>
            </div>
            <div v-if="allEvents.length" class="px-5">
              <div v-for="event in allEvents" :key="event.id">
                <p class="p-2 rounded-xl mb-2" :class="eventClasses(event.date, event.time)">
                  В
                  <span class="ml-2 font-bold mr-2">{{ event.time}}</span> нужно быть в
                  <span class="ml-1 font-bold">{{ event.roomName }}</span>
                </p>
              </div>
            </div>
            <div class="flex items-center justify-center w-full font-bold text-gray-500 p-5" v-else>
              У вас нет событий на эту дату
            </div>
          </div>
        </TBlock>
      </div>
      <div class="w-full ml-2">
        <TBlock>
          <template #title>В вашей группе</template>
          <div class="flex items-center justify-center w-full font-bold text-gray-500" v-if="!group?.users?.length">
            Тут только вы
          </div>
          <div>
            <ul>
              <li v-for="user in group.users" :key="user.id">
                <div class="flex justify-between my-2 text-gray-600 items-center">
                  {{ user.name }}
                  <div class="px-2 py-1 text-white font-bold rounded-md bg-orange-400" style="font-size: 12px" v-if="isOwner(user.id!)">Владелец</div>
                </div>
              </li>
            </ul>
          </div>
        </TBlock>
      </div>
    </div>
  </TSection>
</template>