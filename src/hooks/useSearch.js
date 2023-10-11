import { useEffect } from 'react'

export default function useSearch({ inputValue, delay, searchFunc }) {
	useEffect(() => {
		if (inputValue) {
			const delayDebounceFn = setTimeout(() => {
				searchFunc()
			}, delay)

			return () => clearTimeout(delayDebounceFn)
		} else {
			searchFunc()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue, delay])
}
