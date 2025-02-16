import { MultipleSelectValueExtractor } from "./MultipleSelectValueExtractor"
import { CheckboxRadioValueExtractor } from "./CheckboxRadioValueExtractor"
import { DefaultValueExtractor } from "./DefaultValueExtractor"


type extractors = {[key:string]:MultipleSelectValueExtractor|CheckboxRadioValueExtractor}
const multipleSelectValueExtractor = new MultipleSelectValueExtractor()
const checkboxRadioValueExtractor = new CheckboxRadioValueExtractor()
const defaultValueExtractor = new DefaultValueExtractor()

export class FieldValueFactory {
    private static extractors:extractors = {
        'select[multiple]' : multipleSelectValueExtractor,
        'input:checkbox': checkboxRadioValueExtractor,
        'input:radio': checkboxRadioValueExtractor
    }

    static getExtractor($el: HTMLElement): any {
        if ($el instanceof HTMLSelectElement && $el.hasAttribute('multiple')) {
            return this.extractors['select[multiple]']
        }
        if ($el instanceof HTMLInputElement) {
            return this.extractors[`input:${$el.type}`] || defaultValueExtractor
        }
        return defaultValueExtractor
    }
}
