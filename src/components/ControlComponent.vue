<template>
  <!-- Petunjuk Umum -->
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title text-pixel">Control Panel</h5>

      <!-- Tampilkan tombol Add Relay HANYA kalau relay belum ada -->
      <button
        v-if="!relayExists"
        class="btn btn-success text-pixel"
        style="font-size: 10px"
        @click="addRelay"
      >
        <i class="fa-solid fa-plus"></i> Add Relay
      </button>

      <!-- Tampilkan kontrol HANYA kalau relay sudah ada -->
      <div v-if="relayExists" class="container my-4">
        <div class="row align-items-center">
          <div class="col-md-6 mb-3 mb-md-0 text-center">
            <img
              :src="imageSrc"
              alt="Ilustrasi koneksi hardware"
              class="img-fluid rounded shadow-sm"
              style="max-width: 300px; height: auto"
            />
            <p class="text-pixel mt-3">{{ roles }} Control</p>
          </div>
          <div class="col-md-6">
            <ol class="mb-0 text-pixel-sm">
              <div class="row">
                <div class="col-md-6">
                  <button
                    type="button"
                    class="btn btn-success text-pixel"
                    style="
                      background: #52ada5;
                      height: 80px;
                      color: white;
                      font-weight: bolder;
                      font-size: 15px;
                      padding: 10px;
                      border: 5px #acacac solid;
                    "
                    @click="toggleRelay(true)"
                  >
                    Turn ON
                  </button>
                </div>
                <div class="col-md-6">
                  <button
                    type="button"
                    class="btn btn-danger text-pixel"
                    style="
                      background: var(--bs-danger);
                      height: 80px;
                      color: white;
                      font-weight: bolder;
                      font-size: 15px;
                      padding: 10px;
                      border: 5px #acacac solid;
                    "
                    @click="toggleRelay(false)"
                  >
                    Turn OFF
                  </button>
                </div>
              </div>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const relayExists = ref(false)
const code = localStorage.getItem('api') || 'RELAY001'
const roles = localStorage.getItem('roles') || '' // ambil roles dari localStorage

// Tentukan source gambar berdasarkan roles
const imageSrc = computed(() => {
  return roles === 'watering'
    ? new URL('../assets/relay.png', import.meta.url).href
    : new URL('../assets/relay2.png', import.meta.url).href
})

const checkRelay = async () => {
  try {
    // const res = await axios.get('http://localhost:8086/api/relay/getByCode', {
    const res = await axios.get('http://34.41.43.239:8086/api/relay/getByCode', {
      params: { code },
    })
    relayExists.value = !!res.data.payload
  } catch (err) {
    console.error('Gagal memeriksa relay:', err)
    relayExists.value = false
  }
}

const addRelay = async () => {
  const payload = {
    code: code,
    val: false,
  }

  try {
    const response = await axios.post('http://localhost:8086/api/relay/save', payload)
    console.log('Relay created:', response.data)
    alert('Relay berhasil dibuat!')
    relayExists.value = true
  } catch (error) {
    console.error('Gagal membuat relay:', error)
    alert('Gagal membuat relay')
  }
}

onMounted(() => {
  checkRelay()
})
const toggleRelay = async (val) => {
  try {
    const response = await axios.put(
      `http://localhost:8086/api/relay/updateValByCode`,
      {},
      {
        params: {
          code,
          val,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )
    console.log('Relay updated:', response.data)
    alert(`Relay berhasil di-${val ? 'aktifkan' : 'nonaktifkan'}.`)
  } catch (error) {
    console.error('Gagal mengubah status relay:', error)
    alert('Gagal mengubah status relay.')
  }
}
</script>
