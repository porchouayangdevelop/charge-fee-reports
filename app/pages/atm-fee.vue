<script setup lang="ts">
import type {ApexOptions} from 'apexcharts';
import type {TableColumn} from '@nuxt/ui'

type ATM = {
  code: string
  description: string;
  count: string;
  amount: string;
  percentage: string;
}

const {formatCurrency, formatNumber} = useFeeData()

// ATM Fee specific data based on uploaded Excel
const atmFeeData = ref({
  totalAmount: 199913044,
  totalCount: 8,
  errorBreakdown: [
    {code: 'DD6045', description: 'Transaction Declined', count: 4500, amount: 117865044},
    {code: 'DD1452', description: 'Insufficient Balance', count: 2800, amount: 75930000},
    {code: 'DD1401', description: 'Card Expired', count: 890, amount: 5882000},
    {code: 'DD3082', description: 'Daily Limit Exceeded', count: 45, amount: 81000},
    {code: 'DD3083', description: 'Invalid PIN', count: 30, amount: 27000},
    {code: 'DD1001', description: 'Network Error', count: 15, amount: 123000},
    {code: 'DD7498', description: 'ATM Malfunction', count: 2, amount: 5000}
  ]
})

// Donut Chart for Error Distribution
const donutChartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'donut',
    height: 350
  },
  labels: atmFeeData.value.errorBreakdown.map(e => e.code),
  colors: ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6'],
  legend: {
    position: 'right',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif'
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toFixed(1) + '%'
    }
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return formatCurrency(val)
      }
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total ATM Fees',
            formatter: function () {
              return formatCurrency(atmFeeData.value.totalAmount)
            }
          }
        }
      }
    }
  }
}))

const donutSeries = computed(() => atmFeeData.value.errorBreakdown.map(e => e.amount))


// Table columns
const columns: TableColumn<ATM>[] = [
  // {key: 'code', label: 'Error Code'},
  // {key: 'description', label: 'Description'},
  // {key: 'count', label: 'Count'},
  // {key: 'amount', label: 'Total Amount'},
  // {key: 'percentage', label: 'Percentage'}
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({row}) => `${row.getValue('code')}`
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({row}) => `${row.getValue('description')}`
  },
  {
    accessorKey: 'count',
    header: 'Count',
    cell: ({row}) => `${row.getValue('count')}`
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({row}) => `${row.getValue('amount')}`
  },
  {
    accessorKey: 'percentage',
    header: 'Percentage',
    cell: ({row}) => `${row.getValue('percentage')}`
  }
]

const tableData = computed((): ATM[] =>
    atmFeeData.value.errorBreakdown.map(error => ({
      code: error.code,
      description: error.description,
      count: error.count.toLocaleString(),
      amount: formatCurrency(error.amount),
      percentage: ((error.amount / atmFeeData.value.totalAmount) * 100).toFixed(2) + '%'
    }))
)
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          ATM Fee Management
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          March 2025 - Error Summary & Analysis
        </p>
      </div>
      <div class="flex gap-2">
        <UButton icon="lucide-download" color="gray" variant="soft">
          Export Report
        </UButton>
        <UButton icon="lucide-upload" color="primary" variant="soft">
          Import Data
        </UButton>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard :ui="{ body: 'p-6' }">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total ATM Fees
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {{ formatCurrency(atmFeeData.totalAmount) }}
            </p>
          </div>
          <div class="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
            <UIcon name="lucide-landmark" class="w-6 h-6 text-green-600 dark:text-green-400"/>
          </div>
        </div>
      </UCard>

      <UCard :ui="{ body: 'p-6' }">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Error Types
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {{ atmFeeData.totalCount }}
            </p>
          </div>
          <div class="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg">
            <UIcon name="lucide-alert-triangle" class="w-6 h-6 text-amber-600 dark:text-amber-400"/>
          </div>
        </div>
      </UCard>

      <UCard :ui="{ body: 'p-6' }">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Transactions
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {{ atmFeeData.errorBreakdown.reduce((sum, e) => sum + e.count, 0).toLocaleString() }}
            </p>
          </div>
          <div class="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
            <UIcon name="lucide-activity" class="w-6 h-6 text-blue-600 dark:text-blue-400"/>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Donut Chart -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Fee Distribution by Error Code
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Breakdown of ATM fees by error type
              </p>
            </div>
            <UIcon name="lucide-pie-chart" class="w-5 h-5 text-gray-400"/>
          </div>
        </template>
        <ClientOnly>
          <apexchart
              type="donut"
              height="350"
              :options="donutChartOptions"
              :series="donutSeries"
          />
        </ClientOnly>
      </UCard>

      <!-- Top Errors Card -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Top Error Codes
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Highest impact error codes
              </p>
            </div>
            <UIcon name="lucide-list-ordered" class="w-5 h-5 text-gray-400"/>
          </div>
        </template>
        <div class="space-y-4">
          <div
              v-for="(error, index) in atmFeeData.errorBreakdown.slice(0, 5)"
              :key="error.code"
              class="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div class="flex items-center gap-3">
              <div
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                {{ index + 1 }}
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">
                  {{ error.code }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ error.description }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-gray-900 dark:text-white">
                {{ formatCurrency(error.amount) }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ error.count.toLocaleString() }} txns
              </p>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Detailed Table -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Complete Error Summary
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Detailed breakdown of all ATM fee errors
            </p>
          </div>
          <UInput
              icon="lucide-search"
              placeholder="Search errors..."
              class="w-64"
          />
        </div>
      </template>
      <UTable
          :columns="columns"
          :data="tableData"
          :ui="{
          th: { base: 'text-left' },
          td: { base: 'whitespace-nowrap' }
        }"
      >
        <template #code="{ row }">
          <UBadge color="gray" variant="soft">
            {{row.original.code}}
          </UBadge>
        </template>
        <template #percentage="{ row }">
          <span class="font-semibold text-primary">
            {{ row.original.percentage }}
          </span>
        </template>
      </UTable>
    </UCard>
  </div>
</template>