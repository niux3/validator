import { ElementHTML } from './ElementHTML'
import { ElementHTMLProperties } from './ElementHTML.type'
import { FieldValueFactory } from './fieldValue/FieldValueFactory'


export class Field extends ElementHTML{
    constructor(props:ElementHTMLProperties){
        super(props)
        this.id.html = `vfo${this.id.fo}__vfi${this.id.fi}`
        this.switchRequireAttribute()
    }

    validate(): Field {
        let defaultRules = this.rules.get(),
            extractor = FieldValueFactory.getExtractor(this.$el),
            fieldValue = extractor.extractValue(this.$el),
            resultValid:object[] = []

        for(let ruleInNode of this.getRulesList()){
            for(let key in defaultRules){
                if(key === ruleInNode){
                    let isValid = defaultRules[key](fieldValue, this.params[this.$el.name][key]),
                        row:{status:boolean, message:string} = {
                            status: isValid,
                            message: this.params[this.$el.name][key][isValid? 'success' : 'error']
                        }
                    resultValid.push(row)
                }
            }
        }

        if (resultValid.every(e => e.status === true)) {
            this.successState()
            this.state.message = this.findLast(resultValid, e => e.status).message || ''
        } else {
            this.errorState()
            this.state.message = this.findLast(resultValid, e => !e.status).message || ''
        }
        return this
    }

    displayState(): void{
        let id = this.id.html,
            cls = this.state.toString(),
            dataname = this.$el.name,
            msg = this.state.message,
            paramsTarget:{target:HTMLElement, mode:string} = {}

        if(this.params[this.$el.name].hasOwnProperty('target')){
            paramsTarget = {target: document.querySelector(this.params[this.$el.name]['target'][this.state.toString()]), mode: 'beforeend'}
        }else{
            paramsTarget = {target: this.$el, mode: 'afterend'}
        }
        paramsTarget.target.insertAdjacentHTML(paramsTarget.mode, this.getTemplate(cls, id, dataname, msg))
        console.log(this.getTemplate(cls, id, dataname, msg))
    }

    clean(): Field{
        this.resetState()
        if(document.getElementById(this.id.html) !== null){
            document.getElementById(this.id.html).remove()
        }
        return this
    }
    
    private switchRequireAttribute(): void{
        if(this.$el.hasAttribute('required')){
            this.$el.removeAttribute('required')
            this.$el.classList.add('require')
        }
    }

    private getRulesList(): string[]|void{
        try{
            if(this.params === undefined){
                throw new Error('this.params is undefined')
            }
            let rulesList:string[] = [],
                hasEmpty = false
            for(let rule of Object.keys(this.params[this.$el.name])){
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

    private getTemplate(cls:string, id:string, dataname:string, msg:string):string{
        return `<span id="${id}" data-name="field_${dataname}" class="${cls}">${msg}</span>`;
    }

    private findLast(array:any[], callback:any){
        let data = array.filter(callback)
        return data[data.length - 1]
    }
}
