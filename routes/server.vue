<template>
  <div>
    {{ serverData }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const serverData = ref()

const fetchData = async () => {
  $fetch('/api/test')
    .then((res) => {
      console.log(res)
      serverData.value = res
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  fetchData()
})
</script>
