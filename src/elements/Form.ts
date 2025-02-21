import { ElementHTML } from './ElementHTML'
import { ElementHTMLProperties } from './ElementHTML.type'
import { FormSubject } from './FormSubject.interface'
import { Field } from './Field'


export class Form extends ElementHTML implements FormSubject{
    protected fields:Field[] = []
    /**
     * Creates an instance of Field.
     * @param {ElementHTMLProperties} props - The properties of the field element.
    */
    constructor(props:ElementHTMLProperties){
        super(props)

        for(let [indexField, $field] of Object.entries(this.$el.querySelectorAll(this.getSelectorRequiresFields()))){
            this.register(parseInt(indexField, 10), $field)
        }
    }

    register(indexField:number, $field:Element|HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement):void{
        let params = {
            element:$field,
            id:{
                fo:this.id.fo,
                fi: indexField
            },
            rules: this.rules,
            params: this.params
        }
        this.fields = [...this.fields, new Field(params)]
    }

    unregister(field:Field):void{
        this.fields = this.fields.filter(f => f.$el !== field.$el)
    }

    notify(callback:Function){
        this.fields.forEach((field, i) =>{
            field.update(field, i, callback)
        })
        let method = this.fields.every(f => f.state.toString() === 'success')? 'success' : 'error'
        this[`${method}State`]()
    }


    private getSelectorRequiresFields(){
        let fieldType = [
            'input',
            'textarea',
            'select',
        ];
        return fieldType.map((input)=>{
            return `${input}.require,${input}[required]`;
        }).join(',');
    }
}
