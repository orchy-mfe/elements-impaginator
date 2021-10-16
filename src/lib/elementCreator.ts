const rowStyle = 'display: flex; flex-direction: column'
const columnStyle = 'display: flex; flex-direction: row'

const baseElements = ['row', 'column']

const createDiv = (initialStyle: string) => {
    const divElement = document.createElement('div')
    divElement.setAttribute('style', initialStyle)
    return divElement
}

type BaseItemType = "column" | "row"

const baseItemFactory = (kind: BaseItemType) => {
    const style = kind === "column" ? columnStyle : rowStyle
    return createDiv(style)
}

const customElementFactory = (elementName: string) => {
    return document.createElement(elementName)
}

export const elementCreator = (elementName: string) => {
    const isBaseElement = baseElements.includes(elementName)
    return isBaseElement ? baseItemFactory(elementName as BaseItemType) : customElementFactory(elementName)
}
