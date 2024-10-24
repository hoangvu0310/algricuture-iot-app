/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				ptsans: ['PTSans-Regular'],
				'ptsans-bold': ['PTSans-Bold'],
				'ptsans-italic': ['PTSans-Italic'],
				'ptsans-boldItalic': ['PTSans-BoldItalic'],
			},
			colors: {
				white: '#FFFFFF',
				black: '#000000',
				primary: '#4BA26A',
				light: {
					grey1: '#B0ABAB',
					grey2: '#9A9595',
					grey3: '#333333',
					grey4: '#262626',
					grey5: '#696767',
				},
				dark: {
					grey1: '#B0ABAB',
				},
			},
		},
	},
	plugins: [],
}
