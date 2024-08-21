<template>
  <Menubar :model="myRoutes">
    <template #item="{ item, props }">
      <NuxtLink v-if="item" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span>{{ item.label }}</span>
        </a>
      </NuxtLink>
    </template>
    <template #end>
      <LanguageSwitcher />
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LanguageSwitcher } from '~/features/LanguageSwitcher'

const router = useRouter()

const prepareRoutes = (): Array<object> => {
  return router.options.routes.map((route) => {
    return {
      label: route.name,
      route: route.path,
      disabled: false
    }
  })
}

const myRoutes = prepareRoutes()
</script>

<style scoped lang="scss"></style>
