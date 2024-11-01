/** @type {import('tailwindcss').Config} */
const colors = require('./src/constants/colors.ts')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				ptsans: ['PTSans-Regular'],
				'ptsans-bold': ['PTSans-Bold'],
				'ptsans-italic': ['PTSans-Italic'],
				'ptsans-boldItalic': ['PTSans-BoldItalic'],
			},
			colors: {
				...colors,
			},
		},
	},
	plugins: [],
}
