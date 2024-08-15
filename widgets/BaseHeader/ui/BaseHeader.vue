<template>
  <Menubar>
    <router-link
      v-for="route in router.options.routes"
      :key="route.path"
      :to="route.path"
    >
      {{ route.name }}
    </router-link>
  </Menubar>
</template>

<script setup lang="ts">
import { useRouter } from '#vue-router'

const router = useRouter()
</script>

<style scoped lang="scss"></style>
