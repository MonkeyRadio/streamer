<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useMonkeyRadioAPI } from '@renderer/composables/useMonkeyRadioAPI'
import { useUserStore } from '@renderer/stores/user.store'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const api = useMonkeyRadioAPI()
const userStore = useUserStore()

const setServerInputs = reactive({
  valid: false,
  serverUrl: ''
})

const loading = ref<boolean>(false)

const error = reactive({
  show: false,
  message: ''
})

const login = async () => {
  if (!setServerInputs.valid) return
  loading.value = true
  try {
    const cleanServerUrl = setServerInputs.serverUrl.replace(/http(s?):\/\//g, '')
    await userStore.setServerUrl(cleanServerUrl)
    await api.changeServerUrl(cleanServerUrl)
    await api.health.checkHealth()
    await router.push({ name: 'login', query: route.query })
  } catch (e) {
    console.error(e)
    error.show = true
    error.message = 'cannotConnect'
    await userStore.setServerUrl('')
  }
  loading.value = false
}

const required = (v: string) => !!v || 'Required.'

onMounted(async () => {
  if (await userStore.getServerUrl()) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div>
    <VCard class="pa-5">
      <VCardTitle class="mb-5">{{ $t('views.setServer.title') }}</VCardTitle>
      <VForm v-model="setServerInputs.valid" @submit.prevent="login">
        <VTextField
          v-model="setServerInputs.serverUrl"
          :label="$t('views.setServer.form.serverUrl')"
          prepend-inner-icon="mdi-server-outline"
          :rules="[required]"
          autofocus
        />
        <VBtn class="mt-3" block type="submit" :loading="loading">{{
          $t('views.setServer.actions.next')
        }}</VBtn>
      </VForm>
    </VCard>
    <VDialog v-model="error.show">
      <VCard class="v-col-12 v-col-md-6 v-col-lg-4 mx-auto pa-5">
        <VCardTitle class="mb-5">{{ $t('views.setServer.messages.error') }}</VCardTitle>
        <VCardText>{{ $t(`views.setServer.messages.${error.message}`) }}</VCardText>
        <VBtn class="mt-5" block @click="error.show = false">
          {{ $t('views.setServer.messages.close') }}
        </VBtn>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss"></style>
