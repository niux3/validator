import { describe, it, expect } from "vitest"
import IsIncludes from "./IsIncludes"

describe("IsIncludes validation function", () => {
    it("should return true if value is in the list", () => {
        expect(IsIncludes("apple", ["banana", "apple", "cherry"])).toBe(true)
        expect(IsIncludes(3, [1, 2, 3, 4, 5])).toBe(true)
        expect(IsIncludes("a", "abcdef")).toBe(true)
    })

    it("should return false if value is not in the list", () => {
        expect(IsIncludes("grape", ["banana", "apple", "cherry"])).toBe(false)
        expect(IsIncludes(6, [1, 2, 3, 4, 5])).toBe(false)
        expect(IsIncludes("z", "abcdef")).toBe(false)
    })
})

