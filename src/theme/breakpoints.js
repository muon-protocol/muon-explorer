import { css } from 'styled-components'

const BREAK_POINTS = {
	xs: 576,
	sm: 768,
	md: 992,
	lg: 1200,
	xl: 1440,
}

export const mediaWidthTemplates = Object.keys(BREAK_POINTS).reduce((accumulator, size) => {
	accumulator[size] = (a, b, c) => css`
		@media (max-width: ${BREAK_POINTS[size]}px) {
			${css(a, b, c)}
		}
	`
	return accumulator
}, {})
