import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function useSearch({ inputValue, delay, searchFunc, callback }) {

    const dispatch = useDispatch()

    useEffect(() => {
        if (inputValue) {
            const delayDebounceFn = setTimeout(() => {
                dispatch(searchFunc())
            }, delay)

            return () => clearTimeout(delayDebounceFn)
        }
        else {
            dispatch(callback())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, inputValue, delay])
}
