import Element from './Element';
import Field from '../element/Field';

export default class Form extends Element{
    constructor(props){
        super(props);

        this.__fields = [];
        this.$el.querySelectorAll(this.__getSelectorRequiresFields()).forEach(($require, k) => {
            this.addField($require);
        });
    }

    addField($field){
        this.state[this.id.fo].fields[this.__fields.length] = {};
        let index = Object.keys(this.params).indexOf($field.name),
            config = index !== -1 ? this.params[ Object.keys(this.params)[index] ] : {},
            props = {
                element : $field,
                id : {
                    html : `${this.id.html}_vfi${this.__fields.length}`,
                    fo : this.id.fo,
                    fi : this.__fields.length,
                },
                params : config,
                state : this.state,
                rules : this.rules,
                middleware : this.middleware                
            };
        this.__fields.push(new Field(props));
    }

    getFields(){
        return this.__fields;
    }

    rmField(index){
        this.__fields[index].clean();
        delete this.__fields[index];
    }

    notify(callback){
        this.__fields.forEach((field, i)=>{
            field.update(field, i, callback);
        });
    }

    __getSelectorRequiresFields(){
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
