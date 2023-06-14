<script setup lang="ts">
import TSection from "@/components/base/section/TSection.vue";
import TInput from "@/components/base/input/TInput.vue";
import TButton from "@/components/base/button/TButton.vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
import {useGroupStore} from "@/stores/group";
import {computed, ref, watch} from "vue";
import TModal from "@/components/base/modal/TModal.vue";
import TLoader from "@/components/base/loader/TLoader.vue";
import TPageLoader from "@/components/base/loader/TPageLoader.vue";
import {useRouter} from "vue-router";

// vars & refs
const usersStore = useUserStore()
const groupsStore = useGroupStore()
const router = useRouter()

const { user, isLoading: isUserLoading } = storeToRefs(useUserStore())
const { group, isLoading: isGroupLoading } = storeToRefs(useGroupStore())

const code = ref<string>('')
const showModal = ref<boolean>(false)

// computed
const canShowGroupCreate = computed(() => !group.value!.id)

// methods
const signinUser = async () => {
  await usersStore.createUser(user.value!)

  if (!group.value!.owner) {
    group.value!.owner = user.value?.id
    // const { users, rooms, ...groupData } = group.value
    await groupsStore.udpate(group.value!.id!, { id: group.value.id, code: group.value.code, owner: group.value.owner })
  }
  await router.push({ name: 'main' })
}

const toggleFrom = () => {
  showModal.value = !showModal.value
}

const createGroup = async () => {
  await groupsStore.create()
  code.value = group.value!.code!
  toggleFrom()
}

const resetGroup = () => {
  delete user.value?.groupId
  group.value = {}
  code.value = ''
}

// hooks
watch(code, async () => {
  await groupsStore.searchByCode(code.value)
  if (group.value?.id) user.value!.groupId = group.value!.id
})
</script>

<template>
  <TSection>
    <h1 class="text-3xl font-bold text-gray-800 text-center">Регистрация</h1>
    <div class="flex justify-center">
      <form class="inline-flex flex-col mt-8">
        <TInput placeholder="Иван Иванов" label="Имя" v-model="user.name" />
        <div class="mt-4">
          <TInput label="Логин" placeholder="ivan_ivanov" class="mr-2" v-model="user.login" />
          <TInput label="Пароль" type="password" v-model="user.password" />
        </div>
        <div class="w-full  mt-3" v-if="canShowGroupCreate">
          <div class="flex justify-center w-full" v-if="isGroupLoading">
            <TLoader />
          </div>
          <div class="mt-4 inline-flex items-end justify-between w-full" v-else>
            <div class="flex items-end">
              <TButton @click="toggleFrom" color="light">
                Создать группу
              </TButton>
            </div>
            <span class="mb-3">или</span>
            <TInput label="Ввести код" v-model="code" />
          </div>
        </div>
        <div class="w-full rounded-2xl shadow p-3 flex justify-between mt-3" v-else>
          <div>
            <p class="text-gray-500 -mb-1">Группа:</p>
            <div class="flex items-center">
              <h1 class="text-xl">{{ group.name }} <span class="text-gray-500">({{ group?.users?.length || 0}} уч.)</span></h1>
            </div>
          </div>
          <div class="flex items-center">
            <div class="rounded-full bg-red-300 w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-600 ml-4" @click="resetGroup">
              <span class="font-bold text-white" style="font-size: 10px; margin-bottom: 3px">╳</span>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <TButton @click="signinUser">
            Регистрация
          </TButton>
        </div>
      </form>
    </div>
  </TSection>
  <TModal v-if="showModal" :width="300" @close="toggleFrom">
    <TInput label="Название группы" placeholder="АИСУ" v-model="group.name" />
    <TButton @click="createGroup" color="light" class="mt-5">
      Создать группу
    </TButton>
  </TModal>
  <TPageLoader v-if="isUserLoading" />
</template>


