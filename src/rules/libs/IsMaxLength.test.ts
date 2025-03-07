import { describe, it, expect } from "vitest"
import IsMaxLength from "./IsMaxLength"

describe("isMaxLength", () => {
    // Test 1: Longueur inférieure au maximum
    it("should return true if the length is less than the max", () => {
        expect(IsMaxLength("Hello", 10)).toBe(true)
    })

    // Test 2: Longueur égale au maximum
    it("should return false if the length is equal to the max", () => {
        expect(IsMaxLength("Hello", 5)).toBe(false)
    })

    // Test 3: Longueur supérieure au maximum
    it("should return false if the length is greater than the max", () => {
        expect(IsMaxLength("Hello", 3)).toBe(false)
    })

    // Test 4: Erreur si `args` n'est pas un nombre valide
    it("should throw an error if args is not a valid number", () => {
        expect(() => IsMaxLength("Hello", "abc")).toThrow(
            'The params of method "is max length" must be a number'
        )
    })

    // Test 5: Erreur si `args` est un nombre négatif
    it("should throw an error if args is a negative number", () => {
        expect(() => IsMaxLength("Hello", -5)).toThrow(
            'The params of method "is max length" must be a number'
        )
    })

    // Test 6: Cas où `args` est une chaîne représentant un nombre
    it("should work if args is a string representing a number", () => {
        expect(IsMaxLength("Hello", "10")).toBe(true)
    })
})
