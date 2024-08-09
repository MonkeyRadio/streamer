import type { HealthCheckResponse } from '@monkey-radio/api-client'
import { ipcRenderer } from 'electron'

const resource = 'monkeyRadioAPI.healthCheck'

export const HealthCheckRepository = {
  async checkHealth(): Promise<HealthCheckResponse> {
    return ipcRenderer.invoke(`${resource}.checkHealth`)
  }
}
