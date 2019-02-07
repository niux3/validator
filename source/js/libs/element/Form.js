import Element from './Element';
import Field from '../element/Field';

export default class Form extends Element{
    constructor(props){
        super(props);
        this.__configuration = props.configuration;
        this.__fields = [];
        this.$el.querySelectorAll('.require').forEach(($require, k) => {
            this.addField($require);
        });
    }

    addField($field){
        let index = Object.keys(this.__configuration).indexOf($field.name),
            config = index !== -1 ? this.__configuration[ Object.keys(this.__configuration)[index] ] : {},
            property = {
                element : $field,
                id : `${this.id}_vfi${this.__fields.length}`,
                configuration : config
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
}
