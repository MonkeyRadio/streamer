import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@renderer/views/Authentication/LoginView.vue'
import SetServerView from '@renderer/views/Authentication/SetServerView.vue'
import AuthenticationLayout from '@renderer/layouts/AuthenticationLayout.vue'

export const authenticationRoutes: readonly RouteRecordRaw[] = [
  {
    meta: { title: 'auth', roles: [] },
    path: '/auth',
    redirect: '/auth/login',
    children: [
      {
        name: 'setServer',
        meta: { title: 'setServer', roles: [] },
        path: '/set-server',
        component: SetServerView
      },
      {
        meta: { title: 'login', roles: [] },
        name: 'login',
        path: 'login',
        component: LoginView
      }
    ],
    component: AuthenticationLayout
  }
]
