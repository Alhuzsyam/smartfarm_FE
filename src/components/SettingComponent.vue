<template>
  <div class="container py-4">
    <h4 class="text-pixel text-center mb-4">🔧 Hardware API Connection Setting</h4>

    <!-- Ilustrasi Gambar Full Width Responsive -->

    <!-- Petunjuk Umum -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">📘 Cara Menggunakan API</h5>
        <div class="container my-4">
          <div class="row align-items-center">
            <div class="col-md-6 mb-3 mb-md-0 text-center">
              <img
                src="../assets/setting.png"
                alt="Ilustrasi koneksi hardware"
                class="img-fluid rounded shadow-sm"
                style="max-width: 300px; height: auto"
              />
            </div>
            <div class="col-md-6">
              <ol class="mb-0 text-pixel-sm">
                <li>Pastikan perangkat keras Anda terhubung ke internet.</li>
                <li>Gunakan endpoint sesuai kebutuhan (insert sensor / kontrol relay).</li>
                <li>Masukkan API key Anda sebagai otorisasi.</li>
              </ol>

              <div class="p-2 mt-4">
                <h5 class="text-pixel">Your Api Key</h5>
                <code>api key : {{ apiKey }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Endpoint Insert Sensor -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">🌱 Insert Data Sensor</h5>
        <p><strong>Endpoint:</strong></p>
        <!-- <code>POST http://localhost:8086/api/sensor/create</code> -->
        <code>POST http://43.165.198.49:8086/api/sensor/create</code>

        <p class="mt-3"><strong>Payload JSON:</strong></p>
        <pre class="bg-light p-3 rounded small">
{
  "timestamp": "2025-01-03T15:30:00",
  "lightIntensity": 20,
  "airTemperature": 10,
  "airHumidity": 10,
  "soilTemperature": 10,
  "soilMoisture": 28,
  "soilConductivity": 110,
  "soilPh": 20,
  "nitrogen": 40,
  "phosphorus": 15,
  "potassium": 21,
  <span style="color: red;">"code": "{{ apiKey }}"</span>
}
        </pre>
      </div>
    </div>

    <!-- Endpoint Control Relay -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">⚡ Control Relay</h5>
        <p><strong>Endpoint:</strong></p>
        <code>POST http://localhost:8080/api/relay/control?ApiKey={{ apiKey }}</code>

        <p class="mt-3"><strong>Payload JSON:</strong></p>
        <pre class="bg-light p-3 rounded small">
{
  "status": true
}
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Reaktifitas
const data = ref(null)
const token = localStorage.getItem('token')
const apiKey = localStorage.getItem('api')

// Ambil data sensor saat komponen dimount
onMounted(async () => {
  try {
    const response = await axios.get(`http://43.165.198.49:8086/api/sensor/latest?code=${apiKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    data.value = response.data.payload
    console.log(data.value)
  } catch (error) {
    console.error('Gagal mengambil data sensor:', error)
  }
})
</script>

<style scoped>
.text-pixel {
  font-family: 'Press Start 2P', cursive; /* pixel font */
}
.setting-img {
  max-height: 300px;
}
pre {
  font-size: 0.85rem;
  overflow-x: auto;
}
code {
  background-color: #f5f5f5;
  padding: 4px 6px;
  border-radius: 4px;
  display: inline-block;
}
</style>
