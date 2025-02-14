import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ElementHTML } from './ElementHTML'
import { ElementHTMLProperties } from './ElementHTML.type'
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
            id: { html: "testHtml", fo: "testFo", fi: "testFi" },
            params: "paramValue",
            state: new NeutralState(null as any), // État temporaire
            rules: "someRule",
            middleware: "middlewareFunction",
            mode: "testMode",
        }

        elementInstance = new ElementHTML(properties)
        // Mettre à jour l'état avec l'instance correcte
        elementInstance.setState(new NeutralState(elementInstance))
    })

    it("must correctly initialize properties", () => {
        expect(elementInstance).toBeDefined()
        expect(elementInstance["id"].html).toBe("testHtml")
        expect(elementInstance["params"]).toBe("paramValue")
        expect(elementInstance["state"]).toBeInstanceOf(NeutralState)
    })

    it("must correctly set a new state", () => {
        const successState = new SuccessState(elementInstance)
        elementInstance.setState(successState)

        expect(elementInstance["state"]).toBeInstanceOf(SuccessState)
        expect(mockElement.classList.contains("success")).toBe(true)
        expect(mockElement.classList.contains("error")).toBe(false)

        const errorState = new ErrorState(elementInstance)
        elementInstance.setState(errorState)

        expect(elementInstance["state"]).toBeInstanceOf(ErrorState)
        expect(mockElement.classList.contains("error")).toBe(true)
        expect(mockElement.classList.contains("success")).toBe(false)
    })

    it("must reset state to NeutralState", () => {
        const errorState = new ErrorState(elementInstance)
        elementInstance.setState(errorState)

        expect(elementInstance["state"]).toBeInstanceOf(ErrorState)

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
