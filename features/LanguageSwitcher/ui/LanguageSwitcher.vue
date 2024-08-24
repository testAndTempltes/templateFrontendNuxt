<template>
  <div class="card flex justify-center">
    <WSelect
      :modelValue="selectedCountry"
      :options="countries"
      class="w-full md:w-56"
      optionLabel="name"
      placeholder="Select a Country"
      @change="changeLanguage"
    >
      <template #value="slotProps">
        <div v-if="slotProps.props.value" class="flex gap-2 items-center">
          <img
            :alt="slotProps.props.value.label"
            :src="`https://flagcdn.com/w20/${slotProps.props.value.code.toLowerCase()}.webp`"
            style="width: 18px"
          />
          <div>{{ slotProps.props.value.name }}</div>
        </div>
      </template>
      <template #option="slotProps">
        <div class="flex gap-2 items-center">
          <img
            :alt="slotProps.props.option.label"
            :src="`https://flagcdn.com/w20/${slotProps.props.option.code.toLowerCase()}.webp`"
            style="width: 18px"
          />
          <div>{{ slotProps.props.option.name }}</div>
        </div>
      </template>
    </WSelect>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { WSelect } from '~/shared/components/WSelect'

const { setLocale, t } = useI18n()

const selectedCountryIndex = ref(0)

const selectedCountry = computed<object>(() => {
  return countries.value[selectedCountryIndex.value]
})

type ICountry = {
  lang: string
}

const countries = computed<Array<ICountry>>(() => [
  {
    name: t('language.en'),
    code: 'gb',
    lang: 'en'
  },
  {
    name: t('language.ru'),
    code: 'ru',
    lang: 'ru'
  }
])

type LanguageEvent = {
  value: {
    lang: string
  }
}

function changeLanguage(event: LanguageEvent): void {
  setLocale(event.value?.lang)
  selectedCountryIndex.value = countries.value.findIndex(
    (subItem: ICountry): boolean => {
      return event.value.lang === subItem.lang
    }
  )
}
</script>

<style scoped lang="scss"></style>
