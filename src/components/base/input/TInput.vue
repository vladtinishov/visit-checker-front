<template>
  <div class="inline-flex" :class="containerClasses">
    <label v-if="label" for="my-input" class="text-gray-500" :class="labelClasses">{{ label }}</label>
    <input
      id="my-input"
      class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
      :min="inputMin"
      :max="max"
    />
  </div>
</template>
<script setup lang="ts">
import {computed, ref, toRefs, watch} from 'vue';
import dayjs from "dayjs";

// props & emits
export interface TInputProps {
  dir?: 'row'|'column',
  placeholder?: string,
  label?: string,
  type?: 'text' | 'email' | 'password' | 'date' | 'time',
  modelValue?: string,
  min?: any,
  max?: any,
  disablePast?: boolean
}

const props = withDefaults(defineProps<TInputProps>(), {
  dir: 'column',
  placeholder: '',
  label: '',
  type: 'text',
  modelValue: '',
  min: '',
  max: '',
  disablePast: false,
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref('')
// computed
const containerClasses = computed(() => [
    props.dir === 'column' ? 'flex-col' : 'flex-row  items-center',
])

const labelClasses = computed(() => [
    props.dir === 'column' ? 'mb-1 ml-4' : 'mr-2',
])

const inputMin = computed(() => {
  if (props.min) return props.min
  if (props.disablePast) {
    if (props.type === 'date') return dayjs().format('YYYY-MM-DD')
    else if (props.type === 'time') return dayjs().format('HH:mm')
  }
  return ''
})

// methods


// hooks
watch(
    () => props.modelValue,
    (newValue) => {
      inputValue.value = newValue;
    }
);

watch(
    inputValue,
    (newValue) => {
      emit('update:modelValue', newValue);
    }
);
</script>