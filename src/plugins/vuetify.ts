import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export const TEMA_STORAGE_KEY = 'nfe-search:tema'

function temaSalvo(): string {
  try {
    const tema = localStorage.getItem(TEMA_STORAGE_KEY)
    return tema === 'light' || tema === 'dark' ? tema : 'system'
  } catch {
    return 'system'
  }
}

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: temaSalvo(),
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#2353c5',
          secondary: '#0f7c7e',
          background: '#f4f6fb',
          surface: '#ffffff',
          'surface-light': '#eef1f8',
          success: '#1b7f4f',
          info: '#2a6fdb',
          warning: '#b86e00',
          error: '#c62828',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#8fb2ff',
          secondary: '#5cc8c4',
          background: '#0e1320',
          surface: '#161c2c',
          'surface-light': '#1f2738',
          success: '#5fd39a',
          info: '#8ab8ff',
          warning: '#ffb95c',
          error: '#ff8a80',
        },
      },
    },
  },
  defaults: {
    VCard: { rounded: 'xl', elevation: 0, border: true },
    VBtn: { rounded: 'lg' },
    VChip: { rounded: 'lg' },
    VAlert: { rounded: 'lg' },
    VTextField: { variant: 'outlined', rounded: 'lg' },
    VSelect: { variant: 'outlined', rounded: 'lg' },
    VAutocomplete: { variant: 'outlined', rounded: 'lg' },
  },
})
