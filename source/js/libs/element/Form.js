import Element from './Element';
import Field from '../element/Field';

export default class Form extends Element{
    constructor($el = null){
        super($el);
        this.__fields = [];
        this.$el.querySelectorAll('.require').forEach(($require, k) => {
            this.addField($require);
        });
    }

    addField($field){
        this.__fields.push(new Field($field));
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
