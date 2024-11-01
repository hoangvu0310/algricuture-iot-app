import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import vi from './locales/vi.json'
import { LANGUAGE, setSetting } from '@/src/config/storage/settingStorage'

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
	await setSetting(LANGUAGE, lang)
}

export default i18next
