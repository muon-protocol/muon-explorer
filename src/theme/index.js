import { useMemo } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import { mediaWidthTemplates } from './breakpoints'
import { palette } from './palette'

export default function ThemeProvider({ children }) {
	const theme = useMemo(
		() => ({
			palette: palette[process.env.NETWORK],
			breakpoints: mediaWidthTemplates,
		}),
		[]
	)

	return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
}
