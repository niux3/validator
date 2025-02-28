import { describe, it, expect } from "vitest"
import IsBoolean from "./IsBoolean"


describe("IsBoolean validation function", () => {
    it("should return true if the value is true or 1", () => {
        expect(IsBoolean("true")).toBe(true)
        expect(IsBoolean("1")).toBe(true)
        expect(IsBoolean(true)).toBe(true)
        expect(IsBoolean(1)).toBe(true)
    })

    it("should return false if the value is false or 0", () => {
        expect(IsBoolean("123")).toBe(false)
        // @ts-ignore
        expect(IsBoolean({"a": 1})).toBe(false)
        // @ts-ignore
        expect(IsBoolean([])).toBe(false)
        expect(IsBoolean(NaN)).toBe(false)
        expect(IsBoolean(Infinity)).toBe(false)
    })
})
