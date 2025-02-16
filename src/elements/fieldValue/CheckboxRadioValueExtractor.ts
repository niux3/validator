import { FieldValueExtractor } from "./FieldValueExtractor.interface"


export class CheckboxRadioValueExtractor implements FieldValueExtractor {
    extractValue($el: HTMLInputElement): string[] {
        let values: string[] = [];
        document.getElementsByName($el.name).forEach(($input: any) => {
            if ($input.checked) values.push($input.value);
        });
        return values;
    }
}
