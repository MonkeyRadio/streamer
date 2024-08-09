import { createI18n } from 'vue-i18n'
import { en } from '@renderer/i18n/en'
import { fr } from '@renderer/i18n/fr'

type Languages = 'en' | 'fr'

export const i18n = createI18n<[I18nDefinition], Languages>({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    en,
    fr
  }
})

export interface I18nDefinition {
  appName: string
  subName: string
  views: {
    home: {
      title: string
    }
    notFound: {
      title: string
      headline: string
      text: string
      action: string
    }
    login: {
      title: string
      form: {
        nickname: string
        password: string
      }
      actions: {
        login: string
      }
      messages: {
        error: string
        wrongCredentials: string
        notAuthorized: string
        close: string
      }
    }
    setServer: {
      title: string
      form: {
        serverUrl: string
      }
      messages: {
        close: string
        error: string
        cannotConnect: string
      }
      actions: {
        next: string
      }
    }
  }
  components: object
  layouts: {
    default: {
      selectRadio: string
      settings: string
      server: string
      changeServer: string
    }
  }
  panels: {
    settings: {
      account: {
        title: string
        logout: string
      }
      radio: {
        title: string
        changeRadio: string
      }
      server: {
        title: string
        url?: string
        changeServer: string
      }
    }
  }
  glossary: {
    auth: {
      login: string
      logout: string
    }
    connecting: string
  }
}
