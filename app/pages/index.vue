<script setup lang="ts">
import type {ApexOptions} from 'apexcharts';

const {getCurrentMonthData, getPieChartsData, getTrendData, formatCurrency, formatNumber} = useFeeData();

// PieCharts
const pieChartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'pie',
    height: 380,
    animations: {
      enabled: true,
      easing: 'easeInOut',
      speed: 800
    }
  },
  labels: getPieChartsData.value.labels,
  colors: getPieChartsData.value.colors,
  legend: {
    position: 'bottom',
    fontsize: '14px',
    fontFamily: 'Inter, sans-serif',
    markers: {
      width: 12,
      height: 12,
      radius: 12
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toFixed(1) + '%'
    },
    style: {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return formatCurrency(val)
      }
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        height: 300
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
}))

// Line Chart Configuration for Trends
const lineChartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'line',
    height: 350,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  },
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  xaxis: {
    categories: getTrendData.value.categories,
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      }
    }
  },
  yaxis: {
    labels: {
      formatter: function (val: number) {
        return formatNumber(val)
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return formatCurrency(val)
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif'
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 4
  }
}))

// Bar Chart Configuration for Comparison
const barChartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: true
    }
  },
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: getPieChartsData.value.labels,
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      }
    }
  },
  yaxis: {
    labels: {
      formatter: function (val: number) {
        return formatNumber(val)
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return formatCurrency(val)
      }
    }
  },
  legend: {
    show: false
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 4
  }
}))


// Stats cards data
const statsCards = computed(() => [
  {
    title: 'SMS Fee',
    amount: getCurrentMonthData.value.smsFee,
    icon: 'lucide-message-circle',
    color: 'blue',
    trend: '+12.5%',
    trendUp: true
  },
  {
    title: 'ATM Fee',
    amount: getCurrentMonthData.value.atmFee,
    icon: 'lucide-landmark',
    color: 'success',
    trend: '+8.2%',
    trendUp: true
  },
  {
    title: 'UPI Fee',
    amount: getCurrentMonthData.value.upiFee,
    icon: 'lucide-smartphone',
    color: 'amber',
    trend: '+15.3%',
    trendUp: true
  },
  {
    title: 'VISA Fee',
    amount: getCurrentMonthData.value.visaFee,
    icon: 'lucide-credit-card',
    color: 'red',
    trend: '-2.1%',
    trendUp: false
  }
])


</script>

<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Charge Fee Report Dashboard
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Monthly fee analytics and trends - {{
            new Date().toLocaleDateString('en-US', {month: 'long', year: 'numeric'})
          }}
        </p>
      </div>
      <div class="flex gap-2">
        <UButton icon="lucide-download" color="info" variant="soft">
          Export
        </UButton>
        <UButton icon="lucide-refresh-cw" color="primary" variant="soft">
          Refresh
        </UButton>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard
          v-for="(stat, index) in statsCards"
          :key="index"
          :ui="{ body: 'p-6' }"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ stat.title }}
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {{ formatCurrency(stat.amount) }}
            </p>
            <div class="flex items-center gap-1 mt-2">
              <UIcon
                  :name="stat.trendUp ? 'lucide-trending-up' : 'lucide-trending-down'"
                  :class="stat.trendUp ? 'text-green-500' : 'text-red-500'"
                  class="w-4 h-4"
              />
              <span
                  :class="stat.trendUp ? 'text-green-500' : 'text-red-500'"
                  class="text-sm font-medium"
              >
                {{ stat.trend }}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          </div>
          <div
              :class="`bg-${stat.color}-100 dark:bg-${stat.color}-900/20 p-3 rounded-lg`"
          >
            <UIcon
                :name="stat.icon"
                :class="`text-${stat.color}-600 dark:text-${stat.color}-400`"
                class="w-6 h-6"
            />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Total Summary Card -->
    <UCard :ui="{ body: 'p-6' }">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Total Monthly Fees
          </h3>
          <p class="text-3xl font-bold text-primary mt-2">
            {{ formatCurrency(getCurrentMonthData.total) }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Combined revenue from all fee types
          </p>
        </div>
        <UIcon name="lucide-wallet" class="w-16 h-16 text-primary opacity-20"/>
      </div>
    </UCard>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Pie Chart -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Fee Distribution
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Current month breakdown by fee type
              </p>
            </div>
            <UIcon name="lucide-pie-chart" class="w-5 h-5 text-gray-400"/>
          </div>
        </template>
        <ClientOnly>
          <apexchart
              type="pie"
              height="380"
              :options="pieChartOptions"
              :series="getPieChartsData.series"
          />
        </ClientOnly>
      </UCard>

      <!-- Bar Chart -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Fee Comparison
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Side-by-side comparison of all fees
              </p>
            </div>
            <UIcon name="lucide-bar-chart-3" class="w-5 h-5 text-gray-400"/>
          </div>
        </template>
        <ClientOnly>
          <apexchart
              type="bar"
              height="350"
              :options="barChartOptions"
              :series="[{ name: 'Amount', data: getPieChartsData.series }]"
          />
        </ClientOnly>
      </UCard>
    </div>

    <!-- Line Chart - Full Width -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Fee Trends
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Historical trends across all fee types
            </p>
          </div>
          <UIcon name="lucide-trending-up" class="w-5 h-5 text-gray-400"/>
        </div>
      </template>
      <ClientOnly>
        <apexchart
            type="line"
            height="350"
            :options="lineChartOptions"
            :series="getTrendData.series"
        />
      </ClientOnly>
    </UCard>

    <!-- Quick Actions -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h3>
      </template>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NuxtLink to="/sms-fee">
          <UButton
              icon="lucide-message-circle"
              color="warning"
              variant="soft"
              block
              class="cursor-pointer"
          >
            SMS Fees
          </UButton>
        </NuxtLink>
        <NuxtLink to="/atm-fee">
          <UButton
              icon="lucide-landmark"
              color="success"
              variant="soft"
              block
              class="cursor-pointer"
          >
            ATM Fees
          </UButton>
        </NuxtLink>
        <NuxtLink to="/upi-fee">
          <UButton
              icon="lucide-smartphone"
              color="info"
              variant="soft"
              block
              class="cursor-pointer"
          >
            UPI Fees
          </UButton>
        </NuxtLink>
        <NuxtLink to="/visa-fee">
          <UButton
              icon="lucide-credit-card"
              color="error"
              variant="soft"
              block
              class="cursor-pointer"
          >
            VISA Fees
          </UButton>
        </NuxtLink>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
:deep(.apexcharts-canvas) {
  margin: 0 auto;
}
</style>
