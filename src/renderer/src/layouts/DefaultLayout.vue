<script setup lang="ts">
import { useUserStore } from '@renderer/stores/user.store'
import DecoratedOutlineLogo from '@renderer/components/icons/DecoratedOutlineLogo.vue'
import { useRadioStore } from '@renderer/stores/radio.store'
import PanelComponent from '@renderer/components/PanelComponent.vue'
import { ref } from 'vue'
import SettingsPanel from '@renderer/panels/SettingsPanel.vue'

const userStore = useUserStore()
const radioStore = useRadioStore()

const settingPanel = ref<boolean>(false)
</script>

<template>
  <div v-if="radioStore.selectedRadio">
    <VAppBar>
      <DecoratedOutlineLogo :logo-size="'48px'"></DecoratedOutlineLogo>
      <VSpacer />
      <VBtn v-if="userStore.user" icon="mdi-cog" @click="settingPanel = true">
        <VIcon>mdi-cog</VIcon>
      </VBtn>
    </VAppBar>
    <VMain class="ma-3 ma-md-5 ma-lg-10">
      <RouterView />
    </VMain>
    <PanelComponent v-model="settingPanel" :title="$t('layouts.default.settings')">
      <SettingsPanel />
    </PanelComponent>
  </div>

  <div v-else class="d-flex flex-column h-100 mx-10 justify-center align-center">
    <VSpacer />
    <DecoratedOutlineLogo />
    <VSpacer />
    <VRow class="w-100 justify-center">
      <VCol class="v-col-12 v-col-lg-4">
        <h4 class="text-center">{{ $t('layouts.default.selectRadio') }}</h4>
        <VList rounded="lg" slim>
          <VListItem
            v-for="radio in radioStore.radios.values()"
            :key="radio.id"
            link
            rounded="lg"
            @click="radioStore.selectedRadioId = radio.id"
          >
            <VListItemTitle class="text-center">{{ radio.name }}</VListItemTitle>
          </VListItem>
        </VList>
      </VCol>
    </VRow>
    <VSpacer />
    <VSpacer />
    <VSpacer />
  </div>
</template>

<style lang="scss" scoped>
.head-title {
  margin-right: 0.25rem;
  & > * {
    margin: 0;
    line-height: 1;
    font-weight: bold;
  }
}

.page-title {
  font-weight: bold;
}
</style>
