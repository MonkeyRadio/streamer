import { MonkeyRadioAPI, type Radio } from '@monkey-radio/api-client'
import { IpcMain } from 'electron'
import { BaseRepository } from './baseRepository'

export class RadioRepository extends BaseRepository<Radio> {
  public constructor(instance: MonkeyRadioAPI, ipcMain: IpcMain) {
    super('monkeyRadioAPI.radio', instance, ipcMain)
  }
}
