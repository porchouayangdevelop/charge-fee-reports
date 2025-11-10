<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'lucide-layout-dashboard',
    to: '/',
  },
  {
    label: 'Fee Types',
    icon: 'lucide-wallet',
    children: [
      {
        label: 'SMS',
        icon: 'lucide-message-circle',
        to: '/sms-fee',
        description: 'Upload SMS fee to charge fee of the monthly and process to report'
      },
      {
        label: 'ATM',
        icon: 'lucide-landmark',
        to: '/atm-fee',
        description: 'Upload ATM fee to charge fee of the monthly and process to report'
      },
      {
        label: 'UPI',
        icon: 'lucide-smartphone',
        to: '/upi-fee',
        description: 'Upload UPI fee to charge fee of the monthly and process to report'
      },
      {
        label: 'VISA',
        icon: 'lucide-credit-card',
        to: '/visa-fee',
        description: 'Upload VISA fee to charge fee of the monthly and process to report'
      }
    ]
  },
  {
    label: 'reports',
    icon: 'lucide-bar-chart-3',
    to: '/report',
  }
])


</script>

<template>
  <div>
    <UPageHeader>
      <UNavigationMenu
          :items="items" class="flex justify-center" :ui="{
          item:'flex flex-col'

      }"/>


    </UPageHeader>
    <u-main>
      <u-container>
        <slot/>
      </u-container>
    </u-main>
    <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-auto">
      <UContainer class="py-6">
        <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Charge Fee Reports. All rights reserved.</p>
          <p>Last updated: {{ new Date().toLocaleDateString() }}</p>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<style scoped>
:deep(*) {
  scrollbar-width: thin;
  scrollbar-color: rgb(156 163 175) transparent;
}

:deep(*::-webkit-scrollbar) {
  width: 8px;
  height: 8px;
}

:deep(*::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(*::-webkit-scrollbar-thumb) {
  background-color: rgb(156 163 175);
  border-radius: 4px;
}

:deep(*::-webkit-scrollbar-thumb:hover) {
  background-color: rgb(107 114 128);
}
</style>
