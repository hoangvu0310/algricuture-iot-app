import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSetting, setSetting, THEME, ThemeOptions } from '@/src/config/storage/settingStorage'
import { Appearance, ColorSchemeName } from 'react-native'

type AppThemeContextProps = {
	theme: string
	themeSetting: string
	updateThemeSetting: (theme: string) => void
}

const AppThemeContext = createContext<AppThemeContextProps>({
	theme: ThemeOptions.light,
	themeSetting: 'light',
	updateThemeSetting: () => {},
})

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
	const [themeSetting, setThemeSetting] = useState<string>('light')
	const [theme, setTheme] = useState<string>(ThemeOptions.light)
	const [systemTheme, setSystemTheme] = useState<ColorSchemeName>(Appearance.getColorScheme())

	const loadTheme = async () => {
		const themeSetting = await getSetting(THEME)
		setThemeSetting(themeSetting || 'light')
		if (themeSetting === 'system') {
			setTheme(systemTheme === 'dark' ? 'dark' : 'light')
		} else {
			setTheme(themeSetting || 'light')
		}
	}

	const updateThemeSetting = async (newThemeSetting: string) => {
		await setSetting(THEME, newThemeSetting)
		setTheme(newThemeSetting)
	}

	useEffect(() => {
		loadTheme()
		const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
			setSystemTheme(colorScheme)
		})

		return () => {
			themeListener.remove()
		}
	}, [systemTheme, themeSetting])

	return (
		<AppThemeContext.Provider value={{ theme, themeSetting, updateThemeSetting }}>
			{children}
		</AppThemeContext.Provider>
	)
}

export const useAppTheme = () => {
	return useContext(AppThemeContext)
}
