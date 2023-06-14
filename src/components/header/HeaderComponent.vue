<script lang="ts" setup>

import LogoComponent from "@/components/Logo/LogoComponent.vue";
import TButton from "@/components/base/button/TButton.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";

const route = useRoute()
const userStore = useUserStore()

const { isAdmin } = storeToRefs(userStore)

// computed
const canShowButtons = computed(() => ['home', 'login', 'signin'].includes(route?.name?.toString() || ''))
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
          <RouterLink :to="{ name: 'reports' }" v-if="isAdmin">
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
        </div>
      </div>
    </div>
  </header>
</template>

<style>

</style>