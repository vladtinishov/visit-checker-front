<template>
  <label for="slct" class="select text-gray-500 ml-4 mb-3">
    {{ label }}:
    <select id="slct" required :value="modelValue"  @input="$emit('update:modelValue', $event.target.value)">
      <option value="" disabled selected>{{ placeholder }}</option>
      <option v-for="option in options" :value="option.value" :key="option.value">{{ option.title }}</option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
export interface SelectOption {
  value: string | number,
  title: string
}

export interface TSelectProps {
  placeholder?: string,
  label?: string,
  modelValue?: string,
  options: SelectOption[]
}

const props = withDefaults(defineProps<TSelectProps>(), {
  placeholder: '',
  label: '',
  modelValue: '',
})

const isOpen = ref(false);
const selectedOption = ref('');

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option) {
  selectedOption.value = option;
  isOpen.value = false;
}

</script>

<style scoped>
.select {
  position: relative;
  min-width: 200px;
}
.select svg {
  position: absolute;
  right: 12px;
  top: calc(50% - 3px);
  width: 10px;
  height: 6px;
  stroke-width: 2px;
  stroke: #9098a9;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
}
.select select {
  -webkit-appearance: none;
  padding: 7px 40px 7px 12px;
  width: 100%;
  border: 1px solid #e8eaed;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 3px -2px #9098a9;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  transition: all 150ms ease;
}
.select select:required:invalid {
  color: #5a667f;
}
.select select option {
  color: #223254;
}
.select select option[value=""][disabled] {
  display: none;
}
.select select:focus {
  outline: none;
  border-color: #07f;
  box-shadow: 0 0 0 2px rgba(0,119,255,0.2);
}
.select select:hover + svg {
  stroke: #07f;
}
</style>
