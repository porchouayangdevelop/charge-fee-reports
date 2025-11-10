<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'home',
    icon: 'lucide-house',
    to: '/'
  },
  {
    label: 'FeesType',
    icon: 'lucide-biohazard',
    children: [
      {
        label: 'sms',
        icon: 'lucide-message-circle',
        to: '/sms-fee',
        description: 'sms fee'
      },
      {
        label: 'atm',
        icon: 'lucide-building-2',
        to: '/atm-fee'
      },
      {
        label: 'upi',
        icon: 'lucide-globe-lock',
        to: '/upi-fee'
      },
      {
        label: 'visa',
        icon: 'lucide-circle-dollar-sign',
        to: '/visa-fee'
      }
    ]
  },
  {
    label: 'reports',
    icon: 'lucide-binoculars',
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
  </div>
</template>

<style scoped></style>
