import { MonkeyRadioAPI } from '@monkey-radio/api-client'
import { IpcMain } from 'electron'

export class HealthCheckRepository {
  public constructor(
    private instance: MonkeyRadioAPI,
    private ipcMain: IpcMain
  ) {}

  private readonly resource = 'monkeyRadioAPI.healthCheck'

  public bind() {
    this.ipcMain.handle(`${this.resource}.checkHealth`, async () => {
      return this.instance.health.checkHealth()
    })
  }
}
