import { describe, expect, it } from "vitest"
import IsEmail from "./IsEmail"

describe("IsEmail", () => {
    it("should validate a correct email", () => {
        expect(IsEmail("test@example.com")).toBe(true) // Valid email
        expect(IsEmail("user.name+tag+sorting@example.com")).toBe(true) // Valid email with special characters
        expect(IsEmail("test123@domain.co.uk")).toBe(true) // Valid email with country code domain
    })

    it("should reject an invalid email", () => {
        expect(IsEmail("plainaddress")).toBe(false) // No '@' symbol
        expect(IsEmail("@missingusername.com")).toBe(false) // Missing username
        expect(IsEmail("username@.com")).toBe(false) // Invalid domain
        expect(IsEmail("username@domain..com")).toBe(false) // Double dot in domain
    })

    it("should reject email with invalid characters", () => {
        expect(IsEmail("username@domain!com")).toBe(false) // Invalid character in domain
        expect(IsEmail("user name@domain.com")).toBe(false) // Space in email
        expect(IsEmail("username@do#main.com")).toBe(false) // Invalid character in domain
    })
})
