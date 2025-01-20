import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import vi from './locales/vi.json'
import { setLanguage } from '@/src/config/storage/SettingStorage'

i18next.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	fallbackLng: 'en',
	resources: {
		en: { translation: en },
		vi: { translation: vi },
	},
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
})

export const changeAppLanguage = async (lang: string) => {
	await i18next.changeLanguage(lang)
	await setLanguage(lang)
}

export default i18next
