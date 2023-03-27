import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

export default function useInterval({ deps, delay, func }) {

    const dispatch = useDispatch()

    const interval = useRef(null)

    useEffect(() => {
        interval.current = setInterval(() => {
            dispatch(func())
        }, delay)

        return () => clearInterval(interval.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, delay, dispatch])
}
