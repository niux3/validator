import Element from './Element';
import Field from '../element/Field';

export default class Form extends Element{
    constructor(props){
        super(props);

        this.__configuration = props;
        this.__fields = [];
        this.$el.querySelectorAll(this.__getSelectorRequiresFields()).forEach(($require, k) => {
            this.addField($require);
        });
    }

    addField($field){
        this.__configuration.state[this.__configuration.indexForm].fields[this.__fields.length] = {};

        let index = Object.keys(this.__configuration.params).indexOf($field.name),
            config = index !== -1 ? this.__configuration.params[ Object.keys(this.__configuration.params)[index] ] : {},
            property = {
                element : $field,
                id : `${this.id}_vfi${this.__fields.length}`,
                params : config,
                indexForm : this.__configuration.indexForm,
                indexField : this.__fields.length,
                state : this.__configuration.state,
                rules : this.__configuration.rules,
                middleware : this.__configuration.middleware                
            };
        this.__fields.push(new Field(property));
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
