import { defineStore } from 'pinia'
import type { Radio } from '@monkey-radio/api-client'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

interface RadioStore {
  radios: Map<string, Radio>
  selectedRadioId: RemovableRef<string | null>
}

export const useRadioStore = defineStore('radio', {
  state: (): RadioStore => {
    return {
      radios: new Map(),
      selectedRadioId: useLocalStorage<string>('selectedRadioId', null)
    }
  },
  actions: {
    set(radio: Radio) {
      this.radios.set(radio.id, radio)
    },
    get(id: string) {
      return this.radios.get(id)
    },
    remove(id: string) {
      this.radios.delete(id)
    },
    clear() {
      this.radios.clear()
    },
    updates(radios: Radio[]) {
      radios.forEach((radio) => {
        this.set(radio)
      })
    },
    selectRadio(radioId: string) {
      if (this.radios.has(radioId)) this.selectedRadioId = radioId
    }
  },
  getters: {
    selectedRadio: (state): Radio | undefined => {
      if (state.selectedRadioId && state.radios.has(state.selectedRadioId))
        return state.radios.get(state.selectedRadioId)
      if (state.radios.size == 1) return state.radios.values().next().value
      return undefined
    }
  }
})
