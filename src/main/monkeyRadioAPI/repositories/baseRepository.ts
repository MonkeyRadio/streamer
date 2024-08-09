import { MonkeyRadioAPI, BaseRepository as BaseRepositoryT } from '@monkey-radio/api-client'
import { IpcMain } from 'electron'

export abstract class BaseRepository<T extends object = object> {
  protected constructor(
    protected readonly resource: string,
    private instance: MonkeyRadioAPI,
    private ipcMain: IpcMain
  ) {}

  public bind() {
    const handler: BaseRepositoryT<T> = this.instance[this.resource.split('.').pop() as string]
    if (!handler) {
      throw new Error('Invalid resource name')
    }

    this.ipcMain.handle(`${this.resource}.readAll`, async () => {
      return handler.readAll()
    })
    this.ipcMain.handle(`${this.resource}.read`, async (_, id: string) => {
      if (!id) throw new Error('Invalid ID')
      return handler.read(id)
    })
    this.ipcMain.handle(`${this.resource}.create`, async (_, data: T) => {
      if (!data) throw new Error('Invalid data')
      return handler.create(data)
    })
    this.ipcMain.handle(`${this.resource}.update`, async (_, id: string, data: T) => {
      if (!id || !data) throw new Error('Invalid ID or data')
      return handler.update(id, data)
    })
    this.ipcMain.handle(`${this.resource}.delete`, async (_, id: string) => {
      if (!id) throw new Error('Invalid ID')
      return handler.delete(id)
    })
  }
}
