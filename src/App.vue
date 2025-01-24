<template>
  <a-config-provider :theme="theme">
    <router-view />
  </a-config-provider>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/app.ts'

const appStore = useAppStore()
const { theme } = storeToRefs(appStore)
</script>
<style scoped lang="scss"></style>
