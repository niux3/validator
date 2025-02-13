import { describe, it, expect } from "vitest"
import IsBetween from "./IsBetween"


describe("IsBetween validation function", () => {
    it("should return true if the value is within the range", () => {
        expect(IsBetween("5", "1;10")).toBe(true)
        expect(IsBetween("50", "10;100")).toBe(true)
        expect(IsBetween("99", "50;100")).toBe(true)
    })

    it("should return false if the value is equal to or outside the range", () => {
        expect(IsBetween("1", "1;10")).toBe(false) // Min inclus
        expect(IsBetween("10", "1;10")).toBe(false) // Max inclus
        expect(IsBetween("0", "1;10")).toBe(false) // En dessous
        expect(IsBetween("100", "1;10")).toBe(false) // Au-dessus
    })

    it("should handle edge cases", () => {
        expect(IsBetween("-5", "-10;0")).toBe(true) // Nombres négatifs
        expect(IsBetween("0", "-10;10")).toBe(true) // Zero dans l'intervalle
        expect(IsBetween("abc", "1;10")).toBe(false) // Valeur non numérique
        expect(IsBetween("5", "10;1")).toBe(false) // Mauvais ordre min/max
    })
})
