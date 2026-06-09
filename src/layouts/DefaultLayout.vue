<script setup lang="ts">
import { RouterView } from 'vue-router'
import CesiumMap from '@/components/CesiumMap.vue'

defineOptions({ name: 'DefaultLayout' })
</script>

<template>
  <CesiumMap />
  <RouterView />
</template>
