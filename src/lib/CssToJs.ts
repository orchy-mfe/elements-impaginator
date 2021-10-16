import camelCase from 'lodash.camelcase'

export const styleConverter = (style: string = '') => style
    .split(';')
    .map((value: string) => value.trim())
    .filter(Boolean)
    .reduce((acc, currentElement) => {
        const [key, value] = currentElement.split(":")
        // @ts-ignore
        acc[camelCase(key)] = value.trim()
        return acc
    }, {})
