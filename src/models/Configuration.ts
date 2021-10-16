export type Configuration = {
    type: 'row' | 'column' | 'element',
    content?: Configuration[],
    tag?: string,
    url?: string,
    properties?: any,
    attributes?: any
}
