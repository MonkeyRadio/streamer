import { Radio } from '@monkey-radio/api-client'
import { BaseRepository } from './baseRepository'

const resource = 'monkeyRadioAPI.radio'

export const RadioRepository = {
  ...BaseRepository<Radio>(resource)
}
