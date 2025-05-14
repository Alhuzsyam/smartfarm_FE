<template>
  <nav class="navbar navbar-expand-lg" style="z-index: 1">
    <div class="container-fluid">
      <!-- Logo atau brand bisa ditaruh di sini -->
      <!-- <a class="navbar-brand text-white" href="#">Monitoring System</a> -->

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-3 ico">
          <li class="nav-item">
            <a class="nav-link active text-white" aria-current="page" href="#">
              <i class="fa-solid fa-house"></i>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link text-white text-pixel" href="#">Dashboard</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link text-white" href="#">Analytics</a>
          </li> -->
        </ul>
        <ul class="navbar-nav details">
          <!-- ms-auto = dorong ke kanan -->
          <div class="dropdown me-3">
            <button
              class="btn d-flex align-items-center dropdown-toggle w-100"
              type="button"
              id="dropdownUser"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div class="d-flex align-items-center">
                <div
                  class="avatar-initials bg-primary text-white rounded-circle me-2 d-flex justify-content-center align-items-center"
                  style="width: 32px; height: 32px"
                >
                  UK
                </div>
                <div class="text-start">
                  <div class="fw-semibold text-white text-pixel" style="font-size: 12px">
                    {{ username }}
                  </div>
                  <div class="text-white small text-pixel" style="font-size: 10px">{{ roles }}</div>
                </div>
              </div>
            </button>

            <ul
              class="dropdown-menu dropdown-menu-end bg-white text-dark shadow mt-2 border-0"
              aria-labelledby="dropdownUser"
            >
              <!-- <li><a class="dropdown-item" href="#">Profile</a></li> -->
              <li class="text-pixel-sm">
                <RouterLink to="/dashboard/setting" class="dropdown-item" href="#">
                  Settings
                </RouterLink>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li class="text-pixel-sm">
                <a class="dropdown-item" href="#" @click.prevent="logout">Logout</a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container-fluid p-2">
    <div class="content">
      <div class="p-3">
        <div class="row align-items-center mb-3">
          <!-- Kolom Kiri: Judul -->
          <div class="col-12 col-md-6">
            <h5 class="text-pixel">Monitoring System</h5>
          </div>

          <!-- Kolom Kanan: Navigasi -->
          <div class="col-12 col-md-6 d-flex justify-content-md-end mt-2 mt-md-0">
            <div class="bg-light p-2 rounded">
              <ul class="nav">
                <li class="nav-item">
                  <RouterLink
                    to="/dashboard/monitor"
                    class="nav-link text-dark text-pixel"
                    style="font-size: 15px"
                    >Monitoring</RouterLink
                  >
                </li>
                <li class="nav-item">
                  <RouterLink
                    to="/dashboard/control"
                    class="nav-link text-dark text-pixel"
                    style="font-size: 15px"
                    href="#"
                    >Controlling</RouterLink
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const roles = ref('')
username.value = localStorage.getItem('loggedInUser')
roles.value = localStorage.getItem('roles')

const router = useRouter()

const logout = () => {
  localStorage.removeItem('loggedInUser')
  localStorage.removeItem('roles')
  localStorage.removeItem('api')
  localStorage.removeItem('token')
  router.push('/auth/login')
}
</script>

<style>
@media (max-width: 991.98px) {
  /* Untuk breakpoint "lg" ke bawah */
  .navbar-collapse {
    background-color: var(--bs-black);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: 15px;
    opacity: 70%;
  }
  .details {
    background: #3d3d3d;
    padding: 15px;
    color: black !important;
    opacity: 1;
    width: 100%;
    border-radius: 5px;
  }
  .ico {
    display: none;
  }

  .navbar-collapse .nav-link {
    color: #ffffff !important; /* Ubah warna teks agar kontras */
  }

  .navbar-collapse .fw-semibold {
    color: #ffffff !important; /* Warna nama */
  }

  .navbar-collapse .text-muted {
    color: #eaeaea !important; /* Warna lokasi */
  }
  .details:hover {
    background-color: #4edb81;
  }
}

.content {
  background: #4edb81;
  width: auto;
  height: auto;
  border-radius: 0.3rem;
  opacity: 70%;
}
.nav-link:hover {
  color: #4edb81 !important;
  background: black;
  border-radius: 10px;
}
.nav-link {
  font-weight: 900;
}

.card-style {
  background-color: #f0f0f0;
  border: 4px solid #4a43ec;
  border-radius: 0; /* kotak, no rounded */
  box-shadow: 4px 4px 0 #000; /* shadow kotak */
  font-family: 'Press Start 2P', cursive; /* pixel font */
  image-rendering: pixelated;
  text-transform: uppercase;
}

.card-style .card-title,
.card-style .card-text {
  color: #222;
  font-size: 12px;
  letter-spacing: 1px;
}

.card-style .card-text {
  font-size: 24px;
}

.card-style i {
  font-size: 48px;
  color: #0077cc;
}
.text-pixel {
  font-family: 'Press Start 2P', cursive; /* pixel font */
}
.text-pixel-sm {
  font-family: 'Press Start 2P', cursive; /* pixel font */
  font-size: 10px !important;
}
</style>
