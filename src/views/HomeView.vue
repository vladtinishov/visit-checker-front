<script setup lang="ts">
import TSection from "@/components/base/section/TSection.vue";
import TButton from "@/components/base/button/TButton.vue";
import { onMounted } from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";

const usersStore = useUserStore()
const router = useRouter()
const { user } = storeToRefs(usersStore)
// hooks
onMounted(() => {
  if (!user.value.id) router.push({ name: 'login' })
})
</script>

<template>
  <TSection>
    <h1 class="text-8xl font-bold text-gray-800 text-center leading-none">
      <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500" data-v-1ba72d52="">Visit Checker</span><br>
      Учёт посещений
    </h1>
    <p class="text-center text-2xl text-gray-500 mt-10">Решение для получения статистики посещений и отчётов</p>
    <div class="flex justify-center mt-10">
      <TButton :to="{ name: 'signin'}">
        Создать аккаунт
      </TButton>
    </div>
  </TSection>
</template>
