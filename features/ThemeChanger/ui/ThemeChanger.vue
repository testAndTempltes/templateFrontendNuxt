<template>
  <div class="card flex justify-center">
    <WSelect v-model="colorMode.preference" :options="thems" />
  </div>
</template>

<script setup lang="ts">
import { WSelect } from '~/shared/components/WSelect'
import { useColorMode } from '#imports'
import { ref } from 'vue'

const colorMode = useColorMode()

const thems = ref(['system', 'light', 'dark', 'sepia'])
</script>

<style scoped lang="scss"></style>
