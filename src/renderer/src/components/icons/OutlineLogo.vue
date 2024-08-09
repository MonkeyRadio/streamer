<script setup lang="ts">
import BaseLogo from '@renderer/components/icons/BaseLogo.vue'

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    color?: string
  }>(),
  {
    width: '64px',
    height: '64px',
    color: '#9d5762'
  }
)
</script>

<template>
  <BaseLogo class="outline-logo" v-bind="props" />
</template>

<style scoped lang="scss">
.outline-logo {
  aspect-ratio: 1/1;
  width: v-bind('width');
  height: v-bind('height');
  min-width: v-bind('width');
  min-height: v-bind('height');
  margin: 0.5rem;
  background: v-bind('color');
  border-radius: 100%;
  padding: 1%;
  transition: all 0.2s ease-in-out;
}
</style>
