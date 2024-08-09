import type { I18nDefinition } from '@renderer/i18n/i18n'

export const fr: I18nDefinition = {
  appName: 'MonkeyRadio',
  subName: 'Streamer',
  layouts: {
    default: {
      selectRadio: 'Sélectionner une radio',
      settings: 'Réglages',
      server: 'Serveur',
      changeServer: 'Changer de serveur'
    }
  },
  views: {
    home: {
      title: 'Accueil'
    },
    notFound: {
      title: 'Page introuvable',
      headline: '404',
      action: "Retour à l'accueil",
      text: "La page que vous cherchez n'existe pas."
    },
    login: {
      title: 'Connexion',
      form: {
        nickname: 'Pseudo',
        password: 'Mot de passe'
      },
      actions: {
        login: 'Connexion'
      },
      messages: {
        error: 'Une erreur est survenue.',
        wrongCredentials: 'Pseudo ou mot de passe incorrect.',
        notAuthorized: "Votre compte n'est pas autorisé à accéder à cette application.",
        close: 'Fermer'
      }
    },
    setServer: {
      title: 'Configuration du serveur',
      form: {
        serverUrl: 'URL du serveur'
      },
      actions: {
        next: 'Suivant'
      },
      messages: {
        close: 'Fermer',
        error: 'Une erreur est survenue.',
        cannotConnect: "Impossible de se connecter à l'URL du serveur."
      }
    }
  },
  panels: {
    settings: {
      account: {
        title: 'Compte',
        logout: 'Déconnexion'
      },
      radio: {
        title: 'Radio',
        changeRadio: 'Changer de radio'
      },
      server: {
        title: 'Serveur',
        changeServer: 'Changer de serveur'
      }
    }
  },
  glossary: {
    auth: {
      login: 'Connexion',
      logout: 'Déconnexion'
    },
    connecting: 'Connexion au serveur...'
  },
  components: {}
}
