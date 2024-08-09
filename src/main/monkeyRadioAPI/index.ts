import { MonkeyRadioAPI as api } from '@monkey-radio/api-client'
import { AuthenticationRepository } from './repositories/authentication'
import { IpcMain } from 'electron'
import { RadioRepository } from './repositories/radio'
import { useApiStore } from '../stores/apiStore'
import { HealthCheckRepository } from './repositories/healthCheck'

export class MonkeyRadioAPIHandler {
  private instance: api | undefined

  public constructor(serverUrl: string) {
    const urls = this.getServerUrls(serverUrl)
    this.instance = new api({
      baseUrl: urls.baseUrl,
      diffusionUrl: urls.diffusionUrl
    })
  }

  private getServerUrls(serverUrl: string) {
    return {
      baseUrl: `https://api.${serverUrl}`,
      diffusionUrl: `https://diffusion.${serverUrl}`
    }
  }

  public changeServerUrl(serverUrl: string) {
    if (!this.instance) {
      throw new Error('MonkeyRadioAPI instance not initialized')
    }
    const serverUrls = this.getServerUrls(serverUrl)
    console.log('Changing server URL to', serverUrls)
    this.instance.changeOpts(serverUrls)
  }

  public bind(ipcMain: IpcMain) {
    if (!this.instance) {
      throw new Error('MonkeyRadioAPI instance not initialized')
    }
    const apiStore = useApiStore()

    this.instance.events.on('tokenRenewed', (token) => {
      apiStore.token = token
      ipcMain.emit('monkeyRadioAPI.tokenRenewed', token)
    })

    ipcMain.handle('monkeyRadioAPI.changeServerUrl', (_, serverUrl: string) => {
      this.changeServerUrl(serverUrl)
    })

    new AuthenticationRepository(this.instance, ipcMain).bind()
    new RadioRepository(this.instance, ipcMain).bind()
    new HealthCheckRepository(this.instance, ipcMain).bind()
  }
}
