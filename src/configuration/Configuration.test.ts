import { describe, it, expect } from "vitest"
import { Configuration } from './Configuration'

describe("Configuration", () => {
    it("should merge settings with default configuration", () => {
        const defaultConfig = { mode: "dark", debug: false }
        const params = { debug: true, version: "1.0.0" }

        const config = new Configuration(params, defaultConfig)
        expect(config.get()).toEqual({
            mode: "dark",
            debug: true,
            version: "1.0.0"
        })
    })

    it("should only use parameters if no _default is provided", () => {
        const params = { apiUrl: "https://api.example.com" }

        const config = new Configuration(params)
        expect(config.get()).toEqual(params)
    })

    it("should allow adding new values dynamically", () => {
        const config = new Configuration({})
        config.add("theme", "light")

        expect(config.get()).toEqual({ theme: "light" })
    })

    it("should not merge values if _default is not an object", () => {
        const params = { key: "value" }
        const config = new Configuration(params, "not an object" as any)

        expect(config.get()).toEqual(params)
    })
})
