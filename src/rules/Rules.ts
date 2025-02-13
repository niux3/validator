import { ValidationRule } from './Rules.type'
import * as LibRules from './libs'


export class Rules{
    private rulesList: { [key: string]: ValidationRule } = {}

    constructor(){
        for(let [name, method] of Object.entries(LibRules)){
            this.rulesList[name.toLowerCase()] = method
        }
    }

    /*
    * Get the list of rules
    * @return {Object} List of rules
    */
    get(): { [key: string]: ValidationRule } {
        return this.rulesList
    }

    /*
    * Add or update a rule
    * @param {string} key rule name
    * @param {ValidationRule} rule validate function
    */
    set(key: string, rule: ValidationRule): void {
        if (typeof rule === 'function') {
            this.rulesList[key] = rule
        } else {
            console.warn(`The rule ${key} isn't a function.`)
        }
    }
}
