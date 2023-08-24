import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// => 12:39:49
export const timeFormat = (value) => {
    const newValue = value ? value * 1000 : null
    const date = new Date(newValue).toLocaleTimeString('en-GB', { hour12: false })

    return date
}

// => 22Nov, 03:29:32
export const dateTimeFormat = (value) => {
    const newValue = value ? value * 1000 : null
    const month = new Date(newValue).toLocaleDateString('en-GB', { month: 'short' })
    const day = new Date(newValue).getDate()
    const time = timeFormat(value)

    return `${day} ${month}, ${time}`
}

// => 22Nov 2022
export const dateFormat = (value) => {
    const newValue = value ? value * 1000 : null
    const month = new Date(newValue).toLocaleDateString('en-GB', { month: 'short' })
    const day = new Date(newValue).getDate()
    const year = new Date(newValue).getFullYear()

    return `${day} ${month} ${year}`
}

// => Nov 2022
export const shortDateFormat = (value) => {
    const newValue = value ? value * 1000 : null
    const month = new Date(newValue).toLocaleDateString('en-GB', { month: 'short' })
    const year = new Date(newValue).getFullYear()

    return `${month} ${year}`
}

// => Nov-3-2020 03:29:32
export const fullFormat = (value) => {
    const newValue = value ? value * 1000 : null
    const year = new Date(newValue).getFullYear()
    const month = new Date(newValue).toLocaleDateString('en-GB', { month: 'short' })
    const day = new Date(newValue).getDate()
    const time = timeFormat(value)

    return `${month}-${day}-${year} ${time}`
}

// day js

export const fromNow = (value) => {
    return dayjs(value * 1000).fromNow()
}

export const dateDiff = (value1, value2) => {
    const a = dayjs(value1 * 1000)
    return dayjs(value2 * 1000).to(a, true)
}