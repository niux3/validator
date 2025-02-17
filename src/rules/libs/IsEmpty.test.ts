import { describe, expect, it } from "vitest"
import IsEmpty from "./IsEmpty"


describe("IsEmpty", () => {
    it("should return true for non-empty strings", () => {
        expect(IsEmpty("Hello")).toBe(true)
        expect(IsEmpty("0")).toBe(true) // Un chiffre est un caractère
    })

    it("should return false for empty strings", () => {
        expect(IsEmpty(" ")).toBe(false) // Une espace est un caractère
        expect(IsEmpty("")).toBe(false)
    })

    it("should return false for null or undefined values", () => {
        expect(IsEmpty(null)).toBe(false)
        expect(IsEmpty(undefined)).toBe(false)
    })
})
