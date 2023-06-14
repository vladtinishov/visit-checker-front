<template>
  <div class="list-container">
    <button @click="toggleList" class="toggle-button">{{ isOpen ? 'Close List' : 'Open List' }}</button>
    <transition name="fade">
      <ul v-if="isOpen" class="item-list">
        <li v-for="item in items" :key="item.id" class="list-item">{{ item.name }}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isOpen = ref(false);
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ];

    const toggleList = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      isOpen,
      items,
      toggleList
    };
  }
};
</script>

<style>
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.toggle-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.item-list {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.list-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
