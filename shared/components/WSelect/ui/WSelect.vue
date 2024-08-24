<template>
  <Select>
    <template #value="slotProps">
      <slot name="value" :props="{ ...slotProps }"></slot>
    </template>
    <template #option="slotProps">
      <slot name="option" :props="{ ...slotProps }"></slot>
    </template>
  </Select>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
