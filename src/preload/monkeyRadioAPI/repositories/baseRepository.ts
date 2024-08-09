import { ipcRenderer } from 'electron'

export const BaseRepository = <T extends object = object>(resource: string) => ({
  async readAll(): Promise<T[]> {
    return ipcRenderer.invoke(`${resource}.readAll`)
  },
  async read(id: string): Promise<T> {
    return ipcRenderer.invoke(`${resource}.read`, id)
  },
  async create(data: T): Promise<T> {
    return ipcRenderer.invoke(`${resource}.create`, data)
  },
  async update(id: string, data: T): Promise<T> {
    return ipcRenderer.invoke(`${resource}.update`, id, data)
  },
  async delete(id: string): Promise<void> {
    return ipcRenderer.invoke(`${resource}.delete`, id)
  }
})
