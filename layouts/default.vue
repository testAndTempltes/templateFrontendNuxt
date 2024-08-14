<template>
  <main>
    <BaseHeader />
    <slot />
  </main>
</template>

<script setup lang="ts">
import BaseHeader from '~/widgets/ui/BaseHeader.vue'
</script>
