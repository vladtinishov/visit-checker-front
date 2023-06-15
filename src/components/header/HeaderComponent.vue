<script lang="ts" setup>

import LogoComponent from "@/components/Logo/LogoComponent.vue";
import TButton from "@/components/base/button/TButton.vue";
import {useRoute} from "vue-router";
import { computed, ref } from "vue";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import TModal from "../base/modal/TModal.vue";
import TInput from "../base/input/TInput.vue";
import ImageUploadComponent from "../file-upload/ImageUploadComponent.vue";
import TPageLoader from "../base/loader/TPageLoader.vue";
import { useGroupStore } from "@/stores/group";
import TBlock from "../base/block/TBlock.vue";

const route = useRoute()
const userStore = useUserStore()
const groupStore = useGroupStore()

const { isAdmin, user, isLoading } = storeToRefs(userStore)
const { group } = storeToRefs(groupStore)
const canShowModal = ref<boolean>(false)

// computed
const canShowButtons = computed(() => ['home', 'login', 'signin'].includes(route?.name?.toString() || ''))

// methods
const toggleModal = () => canShowModal.value = !canShowModal.value
</script>

<template>
  <header class="py-4 px-4 md:py-6">
    <div class="container mx-auto p-0">
      <div class="flex items-center justify-between">
        <div class="flex-shrink-0">
          <a class="flex rounded outline-none" href="/">
            <LogoComponent />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="text-gray-900"><span><svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg"
                                                                 fill="none" viewBox="0 0 24 24" stroke="currentColor"><path
              stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M4 6h16M4 12h16M4 18h16"></path></svg></span></button>
        </div>
        <div class="hidden lg:flex lg:ml-12 lg:items-center lg:justify-center lg:space-x-6 xl:space-x-6" v-if="!canShowButtons">
          <RouterLink :to="{ name: 'main' }">
            <span title="" class="text-base font-bold text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50">
              Главная
            </span>
          </RouterLink>
          <RouterLink :to="{ name: 'rooms' }">
            <span title="" class="text-base font-bold text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50">
              Комнаты
            </span>
          </RouterLink>
          <RouterLink :to="{ name: 'reports' }">
            <span title="" class="text-base font-bold text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50">
              Отчёты
            </span>
          </RouterLink>
        </div>
        <div class="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-6">
          <TButton :to="{ name: 'signin' }" v-if="canShowButtons">
            Регистрация
          </TButton>
          <TButton :to="{ name: 'login' }" color="light" v-if="canShowButtons">
            Вход
          </TButton>
          <div 
            class="rounded-full bg-blue-200 flex justify-center items-center text-2xl font-bold cursor-pointer" 
            style="width: 50px; height: 50px;" 
            v-if="!canShowButtons"
            @click="toggleModal"
          >
            {{  user?.name?.[0] || 'U' }}
          </div>
        </div>
      </div>
    </div>
  </header>

  <TModal :width="500" v-if="canShowModal" @close="toggleModal">
    <div class="w-full rounded-2xl shadow p-3 flex justify-between mt-3">
      <div>
        <p class="text-gray-500 -mb-1">Группа:</p>
        <div class="flex items-center">
          <h1 class="text-xl">{{ group.name }} <span class="text-gray-500">({{ group?.users?.length || 0}} уч.)</span></h1>
        </div>
      </div>
      <div class="flex items-center font-bold text-gray-700">
        {{ group.code}}
      </div>
    </div>
    <div class="mt-4">
      <TBlock>
        <template #title>Загрузка фото</template>
        <ImageUploadComponent @save="toggleModal" />
      </TBlock>
      <div class="mt-4 flex justify-end">
        <TButton :to="{ name: 'signin' }" @click="toggleModal">Выйти</TButton>
      </div>
    </div>
  </TModal>
  <TPageLoader v-if="isLoading" />
</template>

<style>

</style>