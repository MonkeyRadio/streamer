import { defineStore } from 'pinia'
import type { User } from '@monkey-radio/api-client'

interface UserStore {
  user?: User
}

const apiStore = {
  get(key: string) {
    return window.electron.ipcRenderer.invoke('apiStore.get', key)
  },
  set<T>(key: string, value: T) {
    return window.electron.ipcRenderer.invoke('apiStore.set', key, value)
  },
  delete(key: string) {
    return window.electron.ipcRenderer.invoke('apiStore.delete', key)
  }
}

export const useUserStore = defineStore('user', {
  state: (): UserStore => {
    return {
      user: undefined
    }
  },
  actions: {
    async setUser(token: string, user: User) {
      await apiStore.set('token', token)
      this.user = user
    },
    async getToken() {
      return apiStore.get('token')
    },
    async logout() {
      await apiStore.delete('token')
      console.log(await apiStore.get('token'))
      this.user = undefined
    },
    async setServerUrl(serverUrl: string) {
      await this.logout()
      if (!serverUrl) await apiStore.delete('serverUrl')
      else await apiStore.set('serverUrl', serverUrl)
    },
    async getServerUrl() {
      return apiStore.get('serverUrl')
    }
  },
  getters: {
    isAuthenticated: (state) => {
      return state.user !== undefined
    },
    hasRole: (state) => (role: string) => {
      if (!state.user?.roles.length) return false
      return state.user.roles.includes(role) || state.user.roles.includes('administrator')
    },
    hasScope: (state) => (scope: string) => {
      if (!state.user?.scopes.length) return false
      return state.user.scopes.includes(scope) || state.user.scopes.includes('*')
    },
    getUserRole(state) {
      if (!state.user?.roles.length) return ''
      return state.user?.roles[state.user?.roles.length - 1]
    }
  }
})
