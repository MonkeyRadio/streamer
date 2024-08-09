<script setup lang="ts">
import { useMonkeyRadioAPI } from '@renderer/composables/useMonkeyRadioAPI'
import { useRadioStore } from '@renderer/stores/radio.store'
import { useUserStore } from '@renderer/stores/user.store'
import { asyncComputed } from '@vueuse/core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const radioStore = useRadioStore()
const monkeyRadioAPI = useMonkeyRadioAPI()

const router = useRouter()

const serverUrl = asyncComputed<string>(async () => await userStore.getServerUrl(), '')

type SettingItem = {
  icon?: string
  title: string
  link: boolean
  click?: () => void
  vIf?: boolean | (() => boolean)
}

const { t } = useI18n()

const settings = computed<
  {
    title: string
    items: SettingItem[]
  }[]
>(() => [
  {
    title: t('panels.settings.radio.title'),
    items: [
      {
        title: radioStore.selectedRadio?.name ?? '',
        link: false,
        vIf: () => radioStore.radios.size > 1
      },
      {
        icon: 'mdi-sync-circle',
        title: t('panels.settings.radio.changeRadio'),
        link: true,
        click: () => {
          radioStore.selectedRadioId = null
        },
        vIf: () => radioStore.radios.size > 1
      }
    ]
  },
  {
    title: t('panels.settings.account.title'),
    items: [
      {
        title: userStore.user?.nickname ?? '',
        link: false,
        vIf: () => !!userStore.user?.nickname
      },
      {
        icon: 'mdi-location-exit',
        title: t('panels.settings.account.logout'),
        link: true,
        click: async () => {
          await monkeyRadioAPI.auth.logout()
          await userStore.logout()
          await router.push({ name: 'login' })
        }
      }
    ]
  },
  {
    title: t('panels.settings.server.title'),
    items: [
      {
        title: `${t('panels.settings.server.url')} : ${serverUrl.value}`,
        link: false
      },
      {
        icon: 'mdi-sync-circle',
        title: t('panels.settings.server.changeServer'),
        link: true,
        click: async () => {
          await userStore.setServerUrl('')
          router.push({ name: 'setServer' })
        }
      }
    ]
  }
])

const vIf = (item: SettingItem) => {
  if (item.vIf === undefined) return true
  if (typeof item.vIf === 'function') return item.vIf()
  return item.vIf
}
</script>

<template>
  <VList v-for="(key, index) in settings" :key="index">
    <VListItemSubtitle class="mb-3 text-uppercase">{{ key.title }}</VListItemSubtitle>

    <VListItem
      v-for="(item, i) in key.items"
      v-show="vIf(item)"
      :key="i"
      :link="item.link"
      color="primary"
      rounded="xl"
      @click="item.click"
    >
      <template #prepend>
        <VIcon :style="{ opacity: !!item.icon ? 1 : 0 }" :icon="item.icon"></VIcon>
      </template>
      <VListItemTitle>{{ item.title }}</VListItemTitle>
    </VListItem>
  </VList>
</template>
