<script setup lang="ts">
import TButton from '../base/button/TButton.vue';
import TInput from '../base/input/TInput.vue';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

// props & emits
const emit = defineEmits(['save'])

// refs & vars
const fileInput = ref();
const userStore = useUserStore()

// methods
const uploadPhoto = async () => {
  const file = fileInput?.value?.files?.[0];
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append('photo', file);

  await userStore.sendPhoto(formData);

  emit('save')
};
</script>

<template>
  <div style="width: 300px; overflow: hidden;">
    <input type="file" ref="fileInput" />
  </div>
  <div class="mt-5">
    <TButton @click="uploadPhoto">Сохранить</TButton>
  </div>
</template>