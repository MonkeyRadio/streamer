<script setup lang="ts">
import OutlineLogo from '@renderer/components/icons/OutlineLogo.vue'
import { useRouter } from 'vue-router'

withDefaults(
  defineProps<{
    logoSize?: string
  }>(),
  {
    logoSize: '60px'
  }
)

const router = useRouter()

const goToHome = () => {
  router.push({
    name: 'dashboard'
  })
}
</script>

<template>
  <div class="d-flex align-center my-2 cursor-pointer no-select" @click="goToHome">
    <OutlineLogo :width="logoSize" :height="logoSize"></OutlineLogo>
    <div class="d-flex flex-column ga-0 head-title">
      <h4 class="font-bold ma-0">{{ $t('appName') }}</h4>
      <p class="font-bold">{{ $t('subName') }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.head-title {
  margin-right: 0.25rem;
  & > * {
    margin: 0;
    line-height: 1;
    font-weight: bold;
  }
}
</style>
