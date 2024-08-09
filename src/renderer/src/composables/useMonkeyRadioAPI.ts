import { getCurrentInstance } from 'vue'

export const useMonkeyRadioAPI = (): typeof window.api.monkeyRadioAPI => {
  const instance = getCurrentInstance()
  if (!instance) throw new Error('useMonkeyRadioAPI must be called within a setup function')
  return instance.appContext.app.config.globalProperties.$monkeyRadioAPI
}
