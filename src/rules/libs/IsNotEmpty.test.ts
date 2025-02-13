import { describe, expect, it } from "vitest"
import IsNotEmpty from "./IsNotEmpty"


describe("IsNotEmpty", () => {
    it("should return true for non-empty strings", () => {
        expect(IsNotEmpty("Hello")).toBe(true)
        expect(IsNotEmpty("0")).toBe(true) // Un chiffre est un caractère
    })

    it("should return false for empty strings", () => {
        expect(IsNotEmpty(" ")).toBe(false) // Une espace est un caractère
        expect(IsNotEmpty("")).toBe(false)
    })

    it("should return false for null or undefined values", () => {
        expect(IsNotEmpty(null)).toBe(false)
        expect(IsNotEmpty(undefined)).toBe(false)
    })
})
