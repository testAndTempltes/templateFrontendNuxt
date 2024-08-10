<template>
  <div class="wrapper">
    <div class="container">
      <h1 class="title">
        {{ $t('welcome') }}
      </h1>

      <Button label="Submit" />

      <Button class="button" @click="increment">Count is: {{ count }}</Button>
      <Knob v-model="value5" :step="10" />
      <Button @click="setLocale('en')">{{ $t('language.en') }}</Button>
      <Button @click="setLocale('ru')">{{ $t('language.ru') }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Knob from 'primevue/knob'

import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

// eslint-disable-next-line no-undef
const count = ref(1)

const { setLocale } = useI18n()

const increment = () => {
  count.value += 1
}
</script>

<style scoped lang="scss">
.container {
  color: aliceblue;
  box-sizing: border-box;
  flex-flow: column wrap;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.link {
  background: linear-gradient(45deg, #9c20aa 33%, #fb3570);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #0b2349;
}

.wrapper {
  background: black;
}
</style>
