<template>
  <div class="AuthComponent">
    <div class="container-fluid">
      <div class="row">
        <!-- Left Side -->
        <div class="col-md-7 d-none d-md-flex align-items-center justify-content-center login-left">
          <div class="">
            <h1 class="text-pixel">
              Smart Farming <i class="fa-solid fa-seedling" style="font-size: 40px"></i>
            </h1>
            <p class="">Power by Polinema</p>
            <h4 class="mt-5 text-pixel">Automate Your Garden</h4>
            <p class="mt-2" style="width: 30rem">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolore eveniet,
              quasi, corrupti laborum blanditiis hic id eligendi in quia rerum voluptatem itaque
              voluptas cupiditate! Distinctio dolor sapiente quasi inventore.
            </p>
            <p class="small">
              © 2025 IoT Project for Garden Automation 🪴 by Lab AI All rights reserved
            </p>
          </div>
        </div>

        <!-- Right Side -->
        <!-- <LoginComponent /> -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.login-left {
  background: linear-gradient(to bottom right, #4f46e5, #63f198);
  color: white;
  padding: 60px;
  height: 100vh;
}

.login-right {
  padding: 60px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  width: 100%;
  max-width: 400px;
  margin: auto;
}
</style>
