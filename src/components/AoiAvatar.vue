<script setup lang="ts">
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <div class="avatar-wrapper">
    <img :src="`${baseUrl}aoi-want-to-eat.png`" alt="Aoi avatar" />
  </div>
</template>

<style scoped>
.avatar-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}
.avatar-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
