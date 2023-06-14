<template>
  <div class="border-2 border-gray-800" :class="$style.spinner">
  </div>
</template>

<style module>
.spinner {
  border-left: none;
  border-top: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>