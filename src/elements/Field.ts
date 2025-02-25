import '../helpers'
import { ElementHTML } from './ElementHTML'
import { ElementHTMLProperties } from './ElementHTML.type'
import { FieldObserver } from './FieldObserver.interface'
import { FieldValueFactory } from './fieldValue/FieldValueFactory'


/**
 * Represents a form field extending ElementHTML.
*/
export class Field extends ElementHTML implements FieldObserver{
    /**
     * Creates an instance of Field.
     * @param {ElementHTMLProperties} props - The properties of the field element.
    */
    constructor(props:ElementHTMLProperties){
        super(props)
        this.id.html = `vfo${this.id.fo}__vfi${this.id.fi}`
        this.switchRequireAttribute()

        if([undefined, null].some(e => this.params === e)){
            this.getParamsFromHTML()
        }
    }

    /**
     * Updates a field by cleaning it, validating it, and displaying its state.
     * If a callback function is provided, it is executed after the update.
     *
     * @param {Field} field - The field to be updated.
     * @param {number} [i] - An optional index that can be passed to the callback function.
     * @param {Function} [callback] - An optional callback function to execute after the update.
     *                                It receives the updated field and the index (if provided) as parameters.
     *
     * @example
     * // Example usage without a callback
     * update(myField);
     *
     * // Example usage with a callback
     * update(myField, 1, (field, index) => {
     *   console.log(`Field ${index} updated:`, field);
     * });
    */
    update(field:Field, i?:number, callback:Function|undefined=undefined){
        field.clean().validate().displayState()
        if(callback !== undefined){
            callback(field, i)
        }
    }

    /**
     * Validates the field value based on predefined rules.
     * @returns {Field} The current instance of the field.
    */
    validate(): Field {
        let defaultRules = this.rules.get(),
            extractor = FieldValueFactory.getExtractor(this.$el),
            fieldValue = extractor.extractValue(this.$el),
            resultValid:{ status: boolean; message: string }[] = [],
            rulesList = this.getRulesList()

        if(rulesList){
            for(let ruleInNode of rulesList){
                for(let key in defaultRules){
                    if(key === ruleInNode){
                        let isValid = defaultRules[key](fieldValue, this.params[key]),
                            row = {
                                status: isValid,
                                message: this.params[key][isValid? 'success' : 'error']
                            }
                        resultValid.push(row)
                    }
                }
            }
        }

        if (resultValid.every(e => e.status === true)) {
            this.successState()
            this.state.message = resultValid.rfind(e => e.status)?.message || ''
        } else {
            this.errorState()
            this.state.message = resultValid.rfind(e => !e.status)?.message || ''
        }
        return this
    }

    /**
     * Displays the validation state message.
    */
    displayState(): void{
        let id = this.id.html!,
            cls = this.state.toString(),
            dataname = this.$el.name,
            msg = this.state.message,
            paramsTarget:{target:HTMLElement|null, mode:InsertPosition} = {target:null, mode:'beforeend'}

        if(this.params.hasOwnProperty('target')){
            paramsTarget = {target: document.querySelector(this.params['target'][this.state.toString()]), mode: 'beforeend'}
        }else{
            paramsTarget = {target: this.$el, mode: 'afterend'}
        }
        if(this.id.html){
            paramsTarget.target?.insertAdjacentHTML(paramsTarget.mode, this.getTemplate(cls, id, dataname, msg))
        }
    }

    /**
     * Cleans the field by resetting its state and removing any existing message.
     * @returns {Field} The current instance of the field.
    */
    clean(): Field{
        this.resetState()
        if(document.getElementById(this.id.html!) !== null){
            document.getElementById(this.id.html!)?.remove()
        }
        return this
    }

    private getParamsFromHTML():void{
        let config = {},
            nullableValues = [undefined, null],
            rulesInNode = this.$el.dataset.validateRules?.trim().replace(/\s+/g, ' ').split(' ')

        if(rulesInNode === undefined){
            throw new Error(`this.params is empty (field name : ${this.$el.name})`)
        }

        rulesInNode.forEach(rule =>{
            let targetMessage:{error?: string, success?: string} = {},
                optionsRules:{error: string, params?: string, success?:string} = {error: ''}

            config[rule] = {}

            if(nullableValues.every(e => this.$el.dataset.validateTargetError !== e)){
                targetMessage['error'] = this.$el.dataset.validateTargetError
            }

            if(nullableValues.every(e => this.$el.dataset.validateTargetSuccess !== e)){
                targetMessage['success'] = this.$el.dataset.validateTargetSuccess
            }

            if(['success', 'error'].some(e => targetMessage.hasOwnProperty(e))){
                config['target'] = targetMessage
            }

            if(this.$el.getAttribute(`data-validate-${rule}-args`) !== null){
                // @ts-ignore
                optionsRules['params'] = this.$el.getAttribute(`data-validate-${rule}-args`).trim()
            }

            if(this.$el.getAttribute(`data-success-${rule}`) !== null){
                // @ts-ignore
                optionsRules["success"] = this.$el.getAttribute(`data-success-${rule}`).trim()
            }

            if(this.$el.getAttribute(`data-error-${rule}`) === null){
                throw new Error(`field ${this.$el.name} doesn't have error message for this rule : ${rule}`)
            }
            // @ts-ignore
            optionsRules["error"] = this.$el.getAttribute(`data-error-${rule}`).trim()

            config[ rule ] = optionsRules;
        })
        this.params = config
    }
    
    /**
     * Toggles the required attribute on the field element.
     * If required, it removes the attribute and adds a 'require' class.
     * @private
    */
    private switchRequireAttribute(): void{
        if(this.$el.hasAttribute('required')){
            this.$el.removeAttribute('required')
            this.$el.classList.add('require')
        }
    }

    /**
     * Retrieves the list of validation rules applied to the field.
     * @private
     * @returns {string[] | void} An array of rule names or undefined in case of an error.
    */
    private getRulesList(): string[]|void{
        try{
            if([undefined, null].some(e => this.params === e)){
                throw new Error(`this.params is empty (field name : ${this.$el.name})`)
            }
            let rulesList:string[] = [],
                hasEmpty = false
            for(let rule of Object.keys(this.params)){
                let trimRule = rule.trim().replace(/\s+/g, ' ')
                if(trimRule !== 'target'){
                    if(rule === 'isempty'){
                        hasEmpty = true
                    }else{
                        rulesList = [...rulesList, rule]
                    }
                }
            }
            if(hasEmpty){
                rulesList = [...rulesList, 'isempty']
            }
            return rulesList
        }catch(e){
            console.error(e)
        }
    }

    /**
     * Generates an HTML template for displaying validation messages.
     * @private
     * @param {string} cls - The CSS class for the message container.
     * @param {string} id - The unique identifier for the message element.
     * @param {string} dataname - The name of the associated field.
     * @param {string} msg - The validation message to display.
     * @returns {string} The HTML string representing the validation message.
    */
    private getTemplate(cls:string, id:string, dataname:string, msg:string):string{
        return `<span id="${id}" data-name="field_${dataname}" class="${cls}">${msg}</span>`;
    }
}
