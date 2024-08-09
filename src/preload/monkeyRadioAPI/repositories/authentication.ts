import type { LoginDataResponse, LoginOpts, User } from '@monkey-radio/api-client'
import { ipcRenderer } from 'electron'

const resource = 'monkeyRadioAPI.authentication'

export const AuthenticationRepository = {
  async login<T extends LoginOpts>(opts: T): Promise<LoginDataResponse<T>> {
    return ipcRenderer.invoke(`${resource}.login`, opts)
  },
  async logout(): Promise<void> {
    return ipcRenderer.invoke(`${resource}.logout`)
  },
  async me(): Promise<User> {
    return ipcRenderer.invoke(`${resource}.me`)
  }
}
