import { describe, expect, it } from "vitest"
import IsNotEmpty from "./IsNotEmpty"


describe("IsEmpty", () => {
    it("should return true for non-empty strings", () => {
        expect(IsNotEmpty("Hello")).toBe(true)
        expect(IsNotEmpty("0")).toBe(true)
    })

    it("should return true for non-empty array", () => {
        expect(IsNotEmpty(['a', 'b', 'c'])).toBe(true)
        expect(IsNotEmpty([1, 2, 3])).toBe(true)
    })

    it("should return false for empty strings", () => {
        expect(IsNotEmpty(" ")).toBe(false) // Une espace est un caractère
        expect(IsNotEmpty("")).toBe(false)
    })

    it("should return false for null or undefined values", () => {
        // @ts-ignore
        expect(IsNotEmpty(null)).toBe(false)
        // @ts-ignore
        expect(IsNotEmpty(undefined)).toBe(false)
    })
})
