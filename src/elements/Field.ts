import { ElementHTML } from './ElementHTML'
import { ElementHTMLProperties } from './ElementHTML.type'
import { FieldValueFactory } from './fieldValue/FieldValueFactory'
import {
    SuccessState,
    ErrorState
} from './state'


export class Field extends ElementHTML{

    constructor(props:ElementHTMLProperties){
        super(props)
        this.switchRequireAttribute()
    }

    validate(): void {
        let rulesInNode = this.getRulesList(),
            defaultRules = this.rules?.get(),
            extractor = FieldValueFactory.getExtractor(this.$el),
            fieldValue = extractor.extractValue(this.$el),
            isValid:boolean[] = []

        rulesInNode?.forEach(ruleInNode =>{
            for(let key in defaultRules){
                if(key === ruleInNode){
                    isValid.push(defaultRules[key](fieldValue, this.params[this.$el.name][key]))
                }
            }
        })
        if (isValid.every(e => e === true)) {
            this.setState(new SuccessState(this))
        } else {
            this.setState(new ErrorState(this))
        }
    }
    
    private switchRequireAttribute(){
        if(this.$el.hasAttribute('required')){
            this.$el.removeAttribute('required')
            this.$el.classList.add('require')
        }
    }

    private getRulesList(){
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
}
