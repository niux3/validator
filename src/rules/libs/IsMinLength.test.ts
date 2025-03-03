import { describe, expect, it } from "vitest"
import IsMinLength from "./IsMinLength"

describe("IsMinLength", () => {
  it("should return true if the string length is greater than the required minimum as a string", () => {
    expect(IsMinLength("abcdef", "5")).toBe(true)
  })

  it("should return false if the string length is equal to the required minimum as a string", () => {
    expect(IsMinLength("abcde", "5")).toBe(false)
  })

  it("should return true if the string length is greater than the required minimum as a number", () => {
    expect(IsMinLength("abcdef", 5)).toBe(true)
  })

  it("should return false if the string length is equal to the required minimum as a string", () => {
    expect(IsMinLength("abcde", 5)).toBe(false)
  })
})
