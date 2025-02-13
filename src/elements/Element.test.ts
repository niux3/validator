import { describe, it, expect, vi, beforeEach } from "vitest"
import { Element } from "./Element"
import { ElementProperties } from "./Element.type"
import { ErrorState } from "./ErrorState"
import { SuccessState } from "./SuccessState"
import { NeutralState } from './NeutralState'


describe("Element Class", () => {
    let mockElement: HTMLElement
    let elementInstance: Element

    beforeEach(() => {
        mockElement = document.createElement("div")

        const properties: ElementProperties = {
            element: mockElement,
            id: { html: "testHtml", fo: "testFo", fi: "testFi" },
            params: "paramValue",
            state: "active",
            rules: "someRule",
            middleware: "middlewareFunction",
            mode: "testMode",
        }

        elementInstance = new Element(properties)
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
