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
const router = useRouter()

const { user, isLoading: isUserLoading } = storeToRefs(useUserStore())

// methods
const login = async () => {
  await usersStore.login()
  await router.push({ name: 'main' })
}

</script>

<template>
  <TSection>
    <h1 class="text-3xl font-bold text-gray-800 text-center">Авторизация</h1>
    <div class="flex justify-center">
      <form class="inline-flex flex-col mt-8">
        <TInput label="Логин" placeholder="ivan_ivanov" class="mr-2" v-model="user.login" />
        <TInput label="Пароль" type="password" v-model="user.password" />
        <div class="mt-10">
          <TButton @click="login">
            Войти
          </TButton>
        </div>
      </form>
    </div>
  </TSection>
  <TPageLoader v-if="isUserLoading" />
</template>


