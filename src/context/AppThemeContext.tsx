import React, { createContext, useEffect, useState } from 'react'
import { getTheme, setTheme, ThemeOptions } from '@/src/config/storage/SettingStorage'
import { Appearance, ColorSchemeName } from 'react-native'

type AppThemeContextProps = {
	isDarkMode: boolean
	updateThemeSetting: (theme: string) => void
}

export const AppThemeContext = createContext<AppThemeContextProps>({
	isDarkMode: false,
	updateThemeSetting: () => {},
})

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
	const [themeSetting, setThemeSetting] = useState<string>(ThemeOptions.light)
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
	const [systemTheme, setSystemTheme] = useState<ColorSchemeName>(Appearance.getColorScheme())

	const loadTheme = async () => {
		const themeSetting = await getTheme()
		setThemeSetting(themeSetting || ThemeOptions.light)
		if (themeSetting === ThemeOptions.system) {
			setIsDarkMode(systemTheme === ThemeOptions.dark)
		} else {
			setIsDarkMode(themeSetting === ThemeOptions.dark)
		}
	}

	const updateThemeSetting = async (newThemeSetting: string) => {
		await setTheme(newThemeSetting)
		setIsDarkMode(newThemeSetting === ThemeOptions.dark)
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
		<AppThemeContext.Provider value={{ isDarkMode, updateThemeSetting }}>
			{children}
		</AppThemeContext.Provider>
	)
}
