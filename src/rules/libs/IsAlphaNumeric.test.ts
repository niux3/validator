import { describe, it, expect } from "vitest"
import IsAlphaNumeric from './IsAlphaNumeric'


describe('IsAlphaNumeric validation function', () => {
    it('should return false for a string with non-Alphabetical Numeric characters', () => {
        expect(IsAlphaNumeric('abc@123')).toBe(false)
        expect(IsAlphaNumeric('abc!')).toBe(false)
        expect(IsAlphaNumeric('127.0.0.1')).toBe(false)
        expect(IsAlphaNumeric('Éléonore')).toBe(false)
        expect(IsAlphaNumeric('')).toBe(false)
    })

    it('should return true for a string with only Alphabetical Numeric characters', () => {
        expect(IsAlphaNumeric('abc123')).toBe(true)
        expect(IsAlphaNumeric('ABC')).toBe(true)
        expect(IsAlphaNumeric('AbC')).toBe(true)
    })
})
