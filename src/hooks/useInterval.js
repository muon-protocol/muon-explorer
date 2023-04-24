import { useEffect, useRef } from 'react'

export default function useInterval({ deps, delay, func }) {

    const interval = useRef(null)

    useEffect(() => {
        interval.current = setInterval(() => {
            func()
        }, delay)

        return () => clearInterval(interval.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, delay])
}
