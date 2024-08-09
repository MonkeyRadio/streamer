<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useMonkeyRadioAPI } from '@renderer/composables/useMonkeyRadioAPI'
import { useUserStore } from '@renderer/stores/user.store'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const api = useMonkeyRadioAPI()
const userStore = useUserStore()

const loginInputs = reactive({
  valid: false,
  nickname: '',
  password: ''
})

const loading = ref<boolean>(false)

const error = reactive({
  show: false,
  message: ''
})

const login = async () => {
  if (!loginInputs.valid) return
  loading.value = true
  try {
    const loginResponse = await api.auth.login({
      nickname: loginInputs.nickname,
      password: loginInputs.password
    })
    if (
      !loginResponse.roles.includes('streamer') &&
      !loginResponse.roles.includes('administrator')
    ) {
      error.show = true
      error.message = 'notAuthorized'
      loading.value = false
      loginInputs.password = ''
      api.auth.logout()
      return
    }
    await userStore.setUser(loginResponse.token, loginResponse)
    if (route.query.redirect) {
      await router.push(route.query.redirect as string)
    } else {
      await router.push({ name: 'home' })
    }
  } catch (e) {
    error.show = true
    error.message = 'wrongCredentials'
    loginInputs.password = ''
  }
  loading.value = false
}

const required = (v: string) => !!v || 'Required.'

onMounted(() => {
  if (userStore.user) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div>
    <VCard class="pa-5">
      <VCardTitle class="mb-5">{{ $t('views.login.title') }}</VCardTitle>
      <VForm v-model="loginInputs.valid" @submit.prevent="login">
        <VTextField
          v-model="loginInputs.nickname"
          :label="$t('views.login.form.nickname')"
          prepend-inner-icon="mdi-account"
          :rules="[required]"
          autofocus
        />
        <VTextField
          v-model="loginInputs.password"
          type="password"
          :label="$t('views.login.form.password')"
          prepend-inner-icon="mdi-lock"
          :rules="[required]"
        />
        <VBtn class="mt-3" block type="submit" :loading="loading">{{
          $t('views.login.actions.login')
        }}</VBtn>
      </VForm>
    </VCard>
    <VDialog v-model="error.show">
      <VCard class="v-col-12 v-col-md-6 v-col-lg-4 mx-auto pa-5">
        <VCardTitle class="mb-5">{{ $t('views.login.messages.error') }}</VCardTitle>
        <VCardText>{{ $t(`views.login.messages.${error.message}`) }}</VCardText>
        <VBtn class="mt-5" block @click="error.show = false">
          {{ $t('views.login.messages.close') }}
        </VBtn>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped lang="scss"></style>
