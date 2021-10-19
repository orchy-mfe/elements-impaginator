import {BehaviorSubject, Subject} from "rxjs";

const oldDefine = window.customElements.define

window.customElements.define = function (name, constructor, options) {
    webComponentsCatalogue.add(name)
    observableCatalogue.next(webComponentsCatalogue)
    Reflect.apply(oldDefine, window.customElements, arguments)
}

const webComponentsCatalogue: Set<string> = new Set<string>()

export const observableCatalogue: Subject<Set<string>> = new BehaviorSubject<Set<string>>(webComponentsCatalogue)

export const registerCustomElement = (webComponentEntryPoint: string) => {
    import(/* webpackIgnore: true */ webComponentEntryPoint)
}
