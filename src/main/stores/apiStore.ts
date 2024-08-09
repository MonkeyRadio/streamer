import { IpcMain } from 'electron'
import ElectronStore from 'electron-store'

type ApiStoreT = {
  token: string
  serverUrl: string
}

class ApiStore {
  private store: ElectronStore<ApiStoreT>

  public constructor() {
    this.store = new ElectronStore<ApiStoreT>({})
  }

  public get token(): string {
    return this.store.get('token', '')
  }

  public set token(token: string) {
    this.store.set('token', token)
  }

  public get serverUrl(): string {
    return this.store.get('serverUrl', '')
  }

  public set serverUrl(serverUrl: string) {
    this.store.set('serverUrl', serverUrl)
  }

  public bind(ipcMain: IpcMain) {
    ipcMain.handle('apiStore.get', (_, key) => {
      return this.store.get(key)
    })

    ipcMain.handle('apiStore.set', (_, key, value) => {
      return this.store.set(key, value)
    })

    ipcMain.handle('apiStore.delete', (_, key) => {
      return this.store.delete(key)
    })
  }
}

const apiStore = new ApiStore()

export const useApiStore = () => {
  return apiStore
}
