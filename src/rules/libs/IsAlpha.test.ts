import { describe, it, expect } from "vitest"
import IsAlpha from './IsAlpha'


describe('IsAlpha validation function', () => {
    it('should return false for a string with non-Alphabetical characters', () => {
        expect(IsAlpha('abc123')).toBe(false)
        expect(IsAlpha('abc!')).toBe(false)
        expect(IsAlpha('123')).toBe(false)
        expect(IsAlpha('')).toBe(false)
    })

    it('should return true for a string with only Alphabetical characters', () => {
        expect(IsAlpha('abc')).toBe(true)
        expect(IsAlpha('ABC')).toBe(true)
        expect(IsAlpha('AbC')).toBe(true)
    })
})
