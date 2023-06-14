<template>
  <div :class="$style.content" class="p-5">
    <div class="text-xl font-bold mb-4" v-if="isHeaderPassed">
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<style module>
.content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  max-width: 100%;
  overflow: auto;
  z-index: 999;
}
</style>

<script setup>
import {computed, useSlots} from "vue";

const slots = useSlots()

// computed
const isHeaderPassed = computed(() => slots.title)
</script>