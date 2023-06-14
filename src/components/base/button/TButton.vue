<template>
  <RouterLink
      :to="to"
      class="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 transition-all duration-200 rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      :class="buttonClasses"
      role="button"
  >
    <slot></slot>
  </RouterLink>
</template>
<script setup lang="ts">
import { computed } from 'vue';

// props & emits
export interface TButtonProps {
  color?: 'dark'|'light',
  to?: string | { name: string },
}

const props = withDefaults(defineProps<TButtonProps>(), {
  color: 'dark',
  to: '',
})

// computed
const buttonClasses = computed(() => [
    props.color === 'dark' ? 'text-white' : 'text-gray-900',
    props.color === 'dark' ? 'bg-gray-900' : 'bg-white',
    props.color === 'dark' ? '' : 'border-2 border-gray-900 box-border',
])
</script>