import { FieldValueExtractor } from "./FieldValueExtractor.interface"


export class MultipleSelectValueExtractor implements FieldValueExtractor {
    extractValue($el: HTMLSelectElement): string[] {
        let values: string[] = [];
        $el.querySelectorAll('option').forEach(($option: any) => {
            if ($option.selected) values.push($option.value);
        });
        return values;
    }
}
