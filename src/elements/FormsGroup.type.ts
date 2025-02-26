import { Rules } from "../rules/Rules"

export interface AppConfiguration {
    options: {
        get: () => {
            selector: string
            fields: Record<string, any> // @TODO Remplacez `any` par un type plus spécifique si possible
        }
    }
    rules: Rules
}
