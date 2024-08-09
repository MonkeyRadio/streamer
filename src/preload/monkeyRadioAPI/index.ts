import { ipcRenderer } from 'electron'
import { AuthenticationRepository } from './repositories/authentication'
import { HealthCheckRepository } from './repositories/healthCheck'
import { RadioRepository } from './repositories/radio'

export class MonkeyRadioAPI {
  public auth = AuthenticationRepository
  public radio = RadioRepository
  public health = HealthCheckRepository

  public changeServerUrl = (serverUrl: string) => {
    return ipcRenderer.invoke('monkeyRadioAPI.changeServerUrl', serverUrl)
  }
}
