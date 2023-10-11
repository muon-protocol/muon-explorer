import { useMemo } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import { mediaWidthTemplates } from './breakpoints'
import { shadows } from './shadows'
import { palette } from './palette'

export default function ThemeProvider({ children }) {
	let themeMode = 'light'
	const isLight = themeMode === 'light'

	const theme = useMemo(
		() => ({
			palette: isLight ? palette.light : palette.dark,
			shadows: isLight ? shadows.light : shadows.dark,
			breakpoints: mediaWidthTemplates,
		}),
		[isLight]
	)

	return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
}
