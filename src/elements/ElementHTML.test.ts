import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ElementHTML } from './ElementHTML'
import { ElementHTMLProperties } from './ElementHTML.type'
import { Rules } from '../rules/Rules'
import {
    NeutralState,
    SuccessState,
    ErrorState
} from './state'


describe('Element Class', () => {
    let mockElement: HTMLInputElement
    let elementInstance: ElementHTML

    beforeEach(() => {
        mockElement = document.createElement("input")

        const properties: ElementHTMLProperties = {
            element: mockElement,
            id: { html:"vfo0__vfi0", fo:0, fi:0},
            params: "paramValue",
            state: new NeutralState(null as any), // État temporaire
            rules: new Rules(),
            middleware: "middlewareFunction",
            mode: "testMode",
        }

        elementInstance = new ElementHTML(properties)
        // Mettre à jour l'état avec l'instance correcte
        // @ts-ignore
        elementInstance.setState(new NeutralState(elementInstance))
    })

    it("must correctly initialize properties", () => {
        expect(elementInstance).toBeDefined()
        expect(elementInstance["id"].html).toBe("vfo0__vfi0")
        expect(elementInstance["params"]).toBe("paramValue")
        expect(elementInstance["state"]).toBeInstanceOf(NeutralState)
    })

    it("must correctly set a new state", () => {
        const successState = new SuccessState(elementInstance)
        // @ts-ignore
        elementInstance.setState(successState)

        expect(elementInstance["state"]).toBeInstanceOf(SuccessState)
        expect(mockElement.classList.contains("success")).toBe(true)
        expect(mockElement.classList.contains("error")).toBe(false)

        const errorState = new ErrorState(elementInstance)
        // @ts-ignore
        elementInstance.setState(errorState)

        expect(elementInstance["state"]).toBeInstanceOf(ErrorState)
        expect(mockElement.classList.contains("error")).toBe(true)
        expect(mockElement.classList.contains("success")).toBe(false)
    })

    it("must reset state to NeutralState", () => {
        const errorState = new ErrorState(elementInstance)
        // @ts-ignore
        elementInstance.setState(errorState)

        expect(elementInstance["state"]).toBeInstanceOf(ErrorState)

        // @ts-ignore
        elementInstance.resetState()

        expect(elementInstance["state"]).toBeInstanceOf(NeutralState)
        expect(mockElement.classList.contains("error")).toBe(false)
        expect(mockElement.classList.contains("success")).toBe(false)
    })

    it("must attach an event correctly", () => {
        const mockCallback = vi.fn()
        elementInstance.on("click", mockCallback)

        // Simuler un clic
        mockElement.dispatchEvent(new Event("click"))

        expect(mockCallback).toHaveBeenCalled()
    })
})
