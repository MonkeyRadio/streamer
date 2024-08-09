<script setup lang="ts">
import { defineModel } from 'vue'

const value = defineModel<boolean>()

defineProps({
  title: String
})
</script>

<template>
  <VDialog v-model="value" transition="dialog-bottom-transition" fullscreen>
    <VCard>
      <VToolbar>
        <VBtn icon="mdi-close" @click="value = false"></VBtn>

        <VToolbarTitle>{{ title }}</VToolbarTitle>
      </VToolbar>
      <div class="mx-5 my-3">
        <slot></slot>
      </div>
    </VCard>
  </VDialog>
</template>
