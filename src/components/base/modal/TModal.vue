<template>
  <div class="modal-container">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-content" :style="{ width: `${width}px` }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// props & emits
export interface TModalProps {
  width: number
}

defineProps<TModalProps>()
const emit = defineEmits(['close'])

// methods
const closeModal = () => {
  emit('close')
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  max-width: 100%;
  overflow: auto;
  z-index: 999;
}
</style>
