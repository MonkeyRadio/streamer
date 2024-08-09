import type { I18nDefinition } from '@renderer/i18n/i18n'

export const en: I18nDefinition = {
  appName: 'MonkeyRadio',
  subName: 'Streamer',
  layouts: {
    default: {
      selectRadio: 'Select a radio',
      settings: 'Settings',
      server: 'Server',
      changeServer: 'Change server'
    }
  },
  views: {
    home: {
      title: 'Home'
    },
    notFound: {
      title: 'Page not found',
      headline: '404',
      action: 'Back to home',
      text: 'The page you are looking for does not exist.'
    },
    login: {
      title: 'Login',
      form: {
        nickname: 'Nickname',
        password: 'Password'
      },
      actions: {
        login: 'Login'
      },
      messages: {
        error: 'An error occurred.',
        wrongCredentials: 'Incorrect nickname or password.',
        notAuthorized: 'Your account is not authorized to access this app.',
        close: 'Close'
      }
    },
    setServer: {
      title: 'Server configuration',
      form: {
        serverUrl: 'Server URL'
      },
      actions: {
        next: 'Next'
      },
      messages: {
        close: 'Close',
        error: 'An error occurred.',
        cannotConnect: "Can't connect to server URL."
      }
    }
  },
  panels: {
    settings: {
      account: {
        title: 'Account',
        logout: 'Logout'
      },
      radio: {
        title: 'Radio',
        changeRadio: 'Change radio'
      },
      server: {
        title: 'Server',
        changeServer: 'Change server',
        url: 'URL'
      }
    }
  },
  glossary: {
    auth: {
      login: 'Login',
      logout: 'Logout'
    },
    connecting: 'Connecting to server...'
  },
  components: {}
}
