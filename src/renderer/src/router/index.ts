import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@renderer/layouts/DefaultLayout.vue'
import HomeView from '@renderer/views/HomeView.vue'

import 'vue-router'
import NotFoundView from '@renderer/views/NotFoundView.vue'
import { i18n } from '@renderer/i18n/i18n'
import { authenticationRoutes } from '@renderer/router/authentication.router'
import { getMonkeyRadioAPI } from '@renderer/plugins/monkeyRadioAPI'
import { useUserStore } from '@renderer/stores/user.store'
import { useRadioStore } from '@renderer/stores/radio.store'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    navVisible?: boolean
    roles: string[]
  }
}

export const routes: readonly RouteRecordRaw[] = [
  {
    meta: { title: 'root', roles: [] },
    path: '/',
    redirect: '/home',
    children: [
      {
        name: 'home',
        meta: {
          title: 'home',
          roles: ['authenticated', 'streamer']
        },
        path: '/home',
        component: HomeView,
        children: []
      }
    ],
    component: DefaultLayout
  },
  ...authenticationRoutes,
  {
    name: 'notFound',
    meta: { title: 'notFound', roles: [] },
    path: '/:pathMatch(.*)*',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  const api = getMonkeyRadioAPI()
  const userStore = useUserStore()
  const radioStore = useRadioStore()

  if (to.name !== 'setServer' && !(await userStore.getServerUrl())) {
    console.log('no server url', await userStore.getServerUrl())
    next({ name: 'setServer' })
    return
  }

  try {
    if (!userStore.isAuthenticated && !!(await userStore.getToken())) {
      userStore.user = await api.auth.login({ token: await userStore.getToken() })
      if (!userStore.hasRole('streamer')) {
        userStore.logout()
      }
    }
  } catch (e) {
    userStore.logout()
  }

  if (
    to.meta.roles.includes('authenticated') &&
    (!userStore.isAuthenticated || !userStore.hasRole('streamer'))
  ) {
    next({ name: 'login', query: { redirect: from.fullPath } })
    return
  }
  for (const role of to.meta.roles) {
    if (role !== 'authenticated' && (!userStore.hasRole(role) || !userStore.hasRole('streamer'))) {
      next({ name: 'notFound' })
      return
    }
  }

  if (to.meta.roles.includes('authenticated') && userStore.isAuthenticated)
    radioStore.updates(await api.radio.readAll())

  next()
})

router.afterEach((to) => {
  document.title = `${i18n.global.t(`appName`)} - ${i18n.global.t(`views.${to.meta.title}.title`)}`
})

export default router
