<template>
  <div class="row">
    <div class="row mt-3">
      <div class="col-12 col-sm-6 d-flex justify-content-start mb-0 mt-md-0">
        <div class="bg-light p-2 rounded">
          <div class="d-flex flex-row justify-content-start gap-2">
            <RouterLink
              to="/dashboard/setting"
              class="btn btn-success text-pixel"
              style="font-size: 10px"
            >
              API setting
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div v-if="showWarning" class="alert alert-warning mt-4" role="alert">
        <h4 class="alert-heading">Warning !</h4>
        <p>Please Pair your Hardware First.</p>
        <hr />
        <p class="mb-0">
          Please check your settings to obtain the API key, then configure your hardware to upload
          data.
        </p>
      </div>

      <!-- Only show this if displayData has data -->
      <div v-if="displayData && displayData.length > 0">
        <!-- Data display section -->
        <div class="row">
          <div
            :class="`${columnClass} mb-3 mb-sm-0 mt-3`"
            v-for="(item, index) in displayData"
            :key="index"
          >
            <div class="card p-3 card-style h-100">
              <div class="row align-items-center h-100">
                <div class="col-8 col-sm-7">
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <h2 class="card-text">{{ item.value }}</h2>
                  </div>
                </div>
                <div class="col-4 col-sm-5 d-flex justify-content-center align-items-center">
                  <i :class="item.icon" style="font-size: 40px"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="row mt-3">
          <div class="col-12 col-sm-6 d-flex justify-content-start mb-0 mt-md-0">
            <div class="bg-light p-2 rounded">
              <div class="d-flex flex-row justify-content-start gap-2">
                <button
                  class="btn btn-success text-pixel"
                  style="font-size: 10px"
                  @click="downloadData"
                >
                  Download Data
                </button>
                <button
                  class="btn btn-danger text-pixel"
                  style="font-size: 10px"
                  @click="deleteData"
                >
                  Remove all data
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="row mt-3">
          <div class="col-12">
            <div
              class="card p-4"
              style="background-color: #1f1f1f; border-radius: 16px; height: auto"
            >
              <h4 class="text-white">Sensor Chart</h4>
              <div style="height: 440px; max-width: 100%; overflow-x: auto">
                <Line v-if="chartData" :data="chartData" :options="chartOptions" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { Line } from 'vue-chartjs'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
)

const displayData = ref([])
const chartData = ref(null)
const columnClass = ref('col-sm-3')
const intervalId = ref(null)
// const apicode = ref(null)
const showWarning = ref(false)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, labels: { color: '#fff' } },
    title: { display: false },
  },
  elements: {
    line: {
      tension: 0.3,
      borderWidth: 3,
    },
    point: {
      radius: 4,
      backgroundColor: '#ffd700',
      borderColor: '#000',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: { color: '#ffffff' },
      grid: { color: '#444' },
    },
    y: {
      ticks: { color: '#ffffff' },
      grid: { color: '#444' },
      beginAtZero: true,
    },
  },
}

const fetchSensorData = async () => {
  const token = localStorage.getItem('token')
  const apiKey = localStorage.getItem('api')
  const rawRoles = localStorage.getItem('roles')

  if (!token || !apiKey || !rawRoles) return

  let roles = []
  try {
    const parsed = JSON.parse(rawRoles)
    roles = Array.isArray(parsed) ? parsed : [parsed]
  } catch (e) {
    roles = [rawRoles]
  }

  const isWatering = roles.includes('watering')
  columnClass.value = isWatering ? 'col-sm-4' : 'col-sm-3'

  try {
    // const latest = await axios.get(`http://localhost:8086/api/sensor/latest?code=${apiKey}`)
    // const history = await axios.get(`http://localhost:8086/api/sensor/allbycode?code=${apiKey}`)
    const latest = await axios.get(`http://34.41.43.239:8086/api/sensor/latest?code=${apiKey}`)
    const history = await axios.get(`http://34.41.43.239:8086/api/sensor/allbycode?code=${apiKey}`)
    // showWarning.value = !displayData.value || displayData.value.length === 0
    const data = latest.data.payload
    const apicode = data.code
    console.log(apicode)
    const historyData = history.data.payload || []

    const getValue = (val, suffix = '') => (val != null ? `${val}${suffix}` : '-')
    showWarning.value = false
    displayData.value = isWatering
      ? [
          {
            title: 'Humidity Value',
            value: getValue(data.airHumidity, '%'),
            icon: 'fa-solid fa-water',
          },
          {
            title: 'Lux Value',
            value: getValue(data.lightIntensity, ' lux'),
            icon: 'fa-regular fa-lightbulb',
          },
          {
            title: 'Temp Value',
            value: getValue(data.airTemperature, '°'),
            icon: 'fa-solid fa-temperature-three-quarters',
          },
        ]
      : [
          {
            title: 'Soil Temp',
            value: getValue(data.soilTemperature, '°'),
            icon: 'fa-solid fa-temperature-low',
          },
          {
            title: 'Soil Moisture',
            value: getValue(data.soilMoisture, '%'),
            icon: 'fa-solid fa-water',
          },
          {
            title: 'Soil pH',
            value: getValue(data.soilPh),
            icon: 'fa-solid fa-vial',
          },
          {
            title: 'Soil Conductivity',
            value: getValue(data.soilConductivity),
            icon: 'fa-solid fa-bolt',
          },
          {
            title: 'Nitrogen',
            value: getValue(data.nitrogen),
            icon: 'fa-solid fa-leaf',
          },
          {
            title: 'Phosphorus',
            value: getValue(data.phosphorus),
            icon: 'fa-solid fa-flask',
          },
          {
            title: 'Potassium',
            value: getValue(data.potassium),
            icon: 'fa-solid fa-atom',
          },
        ]

    const labels = historyData.map((entry) =>
      new Date(entry.timestamp).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    )

    const datasets = []

    if (isWatering) {
      datasets.push(
        {
          label: 'Humidity',
          data: historyData.map((d) => d.airHumidity),
          borderColor: '#00ffff',
          backgroundColor: 'rgba(0,255,255,0.2)',
          fill: true,
        },
        {
          label: 'Lux',
          data: historyData.map((d) => d.lightIntensity),
          borderColor: '#ff6347',
          backgroundColor: 'rgba(255,99,71,0.2)',
          fill: true,
        },
        {
          label: 'Temperature',
          data: historyData.map((d) => d.airTemperature),
          borderColor: '#ffcc00',
          backgroundColor: 'rgba(255,204,0,0.2)',
          fill: true,
        },
      )
    } else {
      datasets.push(
        {
          label: 'Soil Temp',
          data: historyData.map((d) => d.soilTemperature),
          borderColor: '#0096c7',
          backgroundColor: 'rgba(0,150,199,0.2)',
          fill: true,
        },
        {
          label: 'Soil Moisture',
          data: historyData.map((d) => d.soilMoisture),
          borderColor: '#48cae4',
          backgroundColor: 'rgba(72,202,228,0.2)',
          fill: true,
        },
        {
          label: 'Soil pH',
          data: historyData.map((d) => d.soilPh),
          borderColor: '#90e0ef',
          backgroundColor: 'rgba(144,224,239,0.2)',
          fill: true,
        },
        {
          label: 'Conductivity',
          data: historyData.map((d) => d.soilConductivity),
          borderColor: '#ade8f4',
          backgroundColor: 'rgba(173,232,244,0.2)',
          fill: true,
        },
        {
          label: 'Nitrogen',
          data: historyData.map((d) => d.nitrogen),
          borderColor: '#caf0f8',
          backgroundColor: 'rgba(202,240,248,0.2)',
          fill: true,
        },
        {
          label: 'Phosphorus',
          data: historyData.map((d) => d.phosphorus),
          borderColor: '#8ecae6',
          backgroundColor: 'rgba(142,202,230,0.2)',
          fill: true,
        },
        {
          label: 'Potassium',
          data: historyData.map((d) => d.potassium),
          borderColor: '#219ebc',
          backgroundColor: 'rgba(33,158,188,0.2)',
          fill: true,
        },
      )
    }

    chartData.value = { labels, datasets }
  } catch (error) {
    console.error('Failed to fetch sensor data:', error)
  }
}

onMounted(() => {
  fetchSensorData()
  intervalId.value = setInterval(fetchSensorData, 1000) // Refresh tiap 10 detik
})

onBeforeUnmount(() => {
  clearInterval(intervalId.value)
})
const downloadData = async () => {
  const apiKey = localStorage.getItem('api')
  const rawRoles = localStorage.getItem('roles')
  if (!apiKey || !rawRoles) return

  let roles = []
  try {
    const parsed = JSON.parse(rawRoles)
    roles = Array.isArray(parsed) ? parsed : [parsed]
  } catch (e) {
    roles = [rawRoles]
  }

  const isWatering = roles.includes('watering')

  try {
    const res = await axios.get(`http://localhost:8086/api/sensor/allbycode?code=${apiKey}`)
    const data = res.data.payload || []

    let worksheetData
    if (isWatering) {
      worksheetData = data.map((entry) => ({
        Timestamp: entry.timestamp,
        'Humidity (%)': entry.airHumidity,
        'Light (lux)': entry.lightIntensity,
        'Temperature (°C)': entry.airTemperature,
      }))
    } else {
      worksheetData = data.map((entry) => ({
        Timestamp: entry.timestamp,
        'Soil Temp (°C)': entry.soilTemperature,
        'Soil Moisture (%)': entry.soilMoisture,
        'Soil pH': entry.soilPh,
        Conductivity: entry.soilConductivity,
        Nitrogen: entry.nitrogen,
        Phosphorus: entry.phosphorus,
        Potassium: entry.potassium,
      }))
    }

    const worksheet = XLSX.utils.json_to_sheet(worksheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sensor Data')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const fileName = isWatering ? 'watering_data.xlsx' : 'soil_data.xlsx'
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), fileName)
  } catch (err) {
    console.error('Failed to download data:', err)
  }
}
const deleteData = async () => {
  const apiKey = localStorage.getItem('api')
  if (!apiKey) return

  try {
    const response = await axios.delete(
      `http://localhost:8086/api/sensor/deletebycode?code=${apiKey}`,
    )
    if (response.status === 200) {
      alert('Data successfully deleted!')

      // Refresh page setelah data dihapus
      window.location.reload() // Halaman akan di-refresh
    } else {
      alert('Failed to delete data.')
    }
  } catch (error) {
    console.error('Error deleting data:', error)
    alert('Failed to delete data.')
  }
}
onMounted(() => {
  // Delay 3 detik sebelum cek dan tampilkan alert jika data kosong
  setTimeout(() => {
    if (!displayData.value || displayData.value.length === 0) {
      showWarning.value = true
    }
  }, 1000)
})
</script>

<style scoped>
.text-white {
  color: white;
}
.card::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.card::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 4px;
}
</style>
