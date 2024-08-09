import { MonkeyRadioAPI } from '@monkey-radio/api-client'
import { IpcMain } from 'electron'

export class AuthenticationRepository {
  public constructor(
    private instance: MonkeyRadioAPI,
    private ipcMain: IpcMain
  ) {}

  private readonly resource = 'monkeyRadioAPI.authentication'

  public bind() {
    this.ipcMain.handle(`${this.resource}.login`, async (_, opts) => {
      return this.instance.auth.login(opts)
    })

    this.ipcMain.handle(`${this.resource}.logout`, async () => {
      return this.instance.auth.logout()
    })

    this.ipcMain.handle(`${this.resource}.me`, async () => {
      return this.instance.auth.me()
    })
  }
}
