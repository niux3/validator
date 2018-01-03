import { Element } from './Element';

class Form extends Element{
    constructor($el = null){
        super($el);
        this.__fields = [];
    }

    update(){
        console.log("update form");
    }

    addField(Field){
        this.__fields.push(Field);
    }

    getFields(){
        return this.__fields;
    }

    rmField(index){
        this.__fields.splice(index,1);
    }

    __notify(){
        this.__fields.forEach((field)=>{
            field.update();
        });
    }
}

export { Form }
