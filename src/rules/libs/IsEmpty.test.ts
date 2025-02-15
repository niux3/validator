import { describe, expect, it } from "vitest"
import IsEmpty from "./IsEmpty"


describe("IsEmpty", () => {
    it("should return false for non-empty strings", () => {
        expect(IsEmpty("Hello")).toBe(false)
        expect(IsEmpty("0")).toBe(false) // Un chiffre est un caractère
    })

    it("should return true for empty strings", () => {
        expect(IsEmpty(" ")).toBe(true) // Une espace est un caractère
        expect(IsEmpty("")).toBe(true)
    })

    it("should return false for null or undefined values", () => {
        expect(IsEmpty(null)).toBe(false)
        expect(IsEmpty(undefined)).toBe(false)
    })
})
