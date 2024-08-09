<script setup lang="ts">
import DecoratedOutlineLogo from '@renderer/components/icons/DecoratedOutlineLogo.vue'
import { useUserStore } from '@renderer/stores/user.store'
import { asyncComputed } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const showChangeServer = computed(() => route.name !== 'setServer')
const serverUrl = asyncComputed(async () => await userStore.getServerUrl(), '')

const changeServer = async () => {
  await userStore.setServerUrl('')
  await router.push({ name: 'setServer' })
}
</script>

<template>
  <div class="d-flex flex-column h-100 mx-10 justify-center align-center">
    <VSpacer />
    <DecoratedOutlineLogo />
    <VSpacer />
    <VRow class="w-100 justify-center">
      <VCol class="v-col-12 v-col-lg-4">
        <RouterView />
      </VCol>
    </VRow>
    <VSpacer />
    <div v-if="showChangeServer" class="d-flex flex-column align-center">
      <div class="text-centered">{{ $t('layouts.default.server') }} : {{ serverUrl }}</div>
      <VBtn class="mt-2" variant="text" @click="changeServer">{{
        $t('layouts.default.changeServer')
      }}</VBtn>
    </div>
    <VSpacer v-else />
    <VSpacer />
  </div>
</template>

<style scoped lang="scss"></style>
