<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <VEmptyState
    :headline="$t('views.notFound.headline')"
    :title="$t('views.notFound.title')"
    :text="$t('views.notFound.text')"
    image="/large.svg"
    :action-text="$t('views.notFound.action')"
    @click:action="() => router.push('/')"
  />
</template>

<style scoped lang="scss"></style>
