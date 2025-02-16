import { FieldValueExtractor } from "./FieldValueExtractor.interface"


export class DefaultValueExtractor implements FieldValueExtractor {
    extractValue($el: HTMLInputElement): string {
        return $el.value.trim()
    }
}
