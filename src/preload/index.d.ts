import { ElectronAPI } from '@electron-toolkit/preload'
import type { API } from './types/api'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
