import { describe, expect, it } from "vitest"
import IsDate from './IsDate'

describe("IsDate", () => {
    it("should validate a correct date", () => {
        expect(IsDate("2024-02-12")).toBe(true) // Valid date
        expect(IsDate("2000-02-29")).toBe(true) // Leap year
    })

    it("should reject an invalid date", () => {
        expect(IsDate("2024-13-01")).toBe(false) // Invalid month
        expect(IsDate("2024-02-30")).toBe(false) // Invalid day
        expect(IsDate("0000-02-10")).toBe(false) // Invalid year
    })

    it("should reject an incorrect format", () => {
        expect(IsDate("12-02-2024")).toBe(false) // Wrong format
        expect(IsDate("2024/02/12")).toBe(false) // Wrong separator
        expect(IsDate("20240212")).toBe(false) // No separators
    })

    it("should return false for empty or null values", () => {
        expect(IsDate("")).toBe(false)
        // @ts-ignore
        expect(IsDate(null)).toBe(false)
        // @ts-ignore
        expect(IsDate(undefined)).toBe(false)
    })
})

