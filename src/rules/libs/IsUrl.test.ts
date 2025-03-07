import { describe, it, expect } from "vitest"
import IsUrl from "./IsUrl"

describe("IsUrl", () => {
    // Test 1: URL HTTP valide
    it("should return true for a valid HTTP URL", () => {
        expect(IsUrl("https://www.example.com")).toBe(true)
    })

    // Test 2: URL HTTPS valide
    it("should return true for a valid HTTPS URL", () => {
        expect(IsUrl("https://example.com")).toBe(true)
    })

    // Test 3: URL avec sous-domaine valide
    it("should return true for a valid URL with subdomain", () => {
        expect(IsUrl("https://sub.example.com")).toBe(true)
    })

    // Test 4: URL sans protocole (valide)
    it("should return true for a URL without protocol", () => {
        expect(IsUrl("www.example.com")).toBe(true)
    })

    // Test 5: Chaîne de caractères malformée (invalide)
    it("should return false for a malformed string", () => {
        expect(IsUrl("example")).toBe(false)
    })

    // Test 6: URL avec chemin valide
    it("should return true for a valid URL with path", () => {
        expect(IsUrl("https://example.com/path")).toBe(true)
    })

    // Test 7: URL avec paramètres valides
    it("should return true for a valid URL with query parameters", () => {
        expect(IsUrl("https://example.com?param=value")).toBe(true)
    })
})
