<template>
  <div class="fixed flex top-0 left-0 bottom-0 right-0 justify-center items-center">
    <div :class="$style.overlay"></div>
    <div class="z-30">
      <TLoader />
    </div>
  </div>
</template>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

</style>
<script setup lang="ts">
import TLoader from "@/components/base/loader/TLoader.vue";
</script>