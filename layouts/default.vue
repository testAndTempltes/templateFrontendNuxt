<template>
  <main>
    <BaseHeader/>
    <slot />
  </main>
</template>

<script setup lang="ts">
import { BaseHeader } from '~/widgets/BaseHeader'
</script>
