<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { VApp } from 'vuetify/components'
import { useUserStore } from './stores/user.store'
import { useMonkeyRadioAPI } from './composables/useMonkeyRadioAPI'

const loaded = ref<boolean>(false)

const userStore = useUserStore()
const api = useMonkeyRadioAPI()
const router = useRouter()

onMounted(async () => {
  if (await userStore.getServerUrl()) {
    try {
      await api.health.checkHealth()
      loaded.value = true
    } catch (e) {
      await userStore.setServerUrl('')
      loaded.value = true
      await router.push({ name: 'setServer' })
    }
  } else {
    loaded.value = true
  }
})
</script>

<template>
  <VApp>
    <RouterView v-if="loaded" />
    <div v-if="!loaded" class="d-flex flex-column justify-center align-center h-100">
      <VProgressCircular indeterminate />
      <h5 class="mt-5">{{ $t('glossary.connecting') }}</h5>
    </div>
  </VApp>
</template>

<style lang="scss" scoped></style>
