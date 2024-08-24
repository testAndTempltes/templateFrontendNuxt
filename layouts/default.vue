<template>
  <div class="layout">
    <BaseHeader />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { BaseHeader } from '~/widgets/BaseHeader'
</script>

<style lang="scss" scoped>
@import '@/app/style/main.scss';

.layout {
  background: $color-bg;
  min-height: 100vh;
}
</style>
