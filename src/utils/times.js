// => 12:39:49
export const timeFormat = (value) => {
    const newValue = value ? value * 1000 : null
    const date = new Date(newValue).toLocaleTimeString('en-US', { hour12: false })

    return date
}

// => 22Nov, 03:29:32
export const dateTimeFormat = (value) => {
    const newValue = value ? value * 1000 : null
    const month = new Date(newValue).toLocaleDateString('en-US', { month: 'short' })
    const day = new Date(newValue).getDay()
    const time = timeFormat(value)

    return `${day} ${month}, ${time}`
}

// => 22Nov 2022
export const dateFormat = (value) => {
    const newValue = value ? value * 1000 : null
    const month = new Date(newValue).toLocaleDateString('en-US', { month: 'short' })
    const day = new Date(newValue).getDay()
    const year = new Date(newValue).getFullYear()

    return `${day} ${month} ${year}`
}

// => Nov 2022
export const shortDateFormat = (value) => {
    const newValue = value ? value * 1000 : null
    const month = new Date(newValue).toLocaleDateString('en-US', { month: 'short' })
    const year = new Date(newValue).getFullYear()

    return `${month} ${year}`
}