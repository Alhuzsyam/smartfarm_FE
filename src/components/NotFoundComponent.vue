<template>
  <div class="notfound-page d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h1 class="text-pixel text-white">
        <i class="fa-solid fa-seedling" style="font-size: 40px"></i> 404 NOT FOUND
      </h1>
    </div>
  </div>
</template>

<script setup>
defineProps({})
</script>

<style scoped>
.notfound-page {
  background: url('https://images.alphacoders.com/113/thumb-1920-1130469.png') no-repeat center
    center;
  background-size: cover;
  height: 100vh;
}

.notfound-card {
  background-color: rgba(255, 255, 255, 0.9); /* putih semi transparan */
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
}
</style>
