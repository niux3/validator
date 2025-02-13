import { describe, it, expect, vi, beforeEach } from "vitest"
import { Element } from "./Element"
import { ElementProperties } from "./Element.type"

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
    })

    it("must attach an event correctly", () => {
        const mockCallback = vi.fn()
        elementInstance.on("click", mockCallback)

        // Simuler un clic
        mockElement.dispatchEvent(new Event("click"))

        expect(mockCallback).toHaveBeenCalled()
    })
})
