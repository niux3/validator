import { Rules } from "../rules/Rules"
import { Middleware } from "./Middleware.type"

export interface AppConfiguration {
    options: {
        get: () => {
            selector: string
            fields: Record<string, any> // @TODO Remplacez `any` par un type plus spécifique si possible
        }
    }
    rules: Rules,
    middleware: Middleware
}