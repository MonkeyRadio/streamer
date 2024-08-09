import type { App } from 'vue'

let monkeyRadioAPI: typeof window.api.monkeyRadioAPI

export const createMonkeyRadioAPI = () => ({
  install: (app: App) => {
    monkeyRadioAPI = window.api.monkeyRadioAPI
    app.config.globalProperties.$monkeyRadioAPI = monkeyRadioAPI
  }
})

export const getMonkeyRadioAPI = () => {
  if (!monkeyRadioAPI) {
    throw new Error('MonkeyRadioAPI plugin not installed')
  }
  return monkeyRadioAPI
}
