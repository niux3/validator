import { describe, it, expect } from "vitest"
import IsBetweenLength from "./IsBetweenLength"


describe("IsBetweenLength validation function", () => {
    it("should return true if the value is within the range", () => {
        expect(IsBetweenLength("value", "1;10")).toBe(true)
        expect(IsBetweenLength("Python is the best", "10;100")).toBe(true)
    })

    it("should return false if the value is equal to or outside the range", () => {
        expect(IsBetweenLength("o", "1;10")).toBe(false) // Min inclus
        expect(IsBetweenLength("1234567890", "1;10")).toBe(false) // Max inclus
        expect(IsBetweenLength("", "1;10")).toBe(false) // En dessous
        expect(IsBetweenLength("Python is the best", "1;10")).toBe(false) // Au-dessus
    })
})
