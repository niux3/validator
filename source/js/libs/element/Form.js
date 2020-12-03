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
        let config = {};
        switch(this.mode){
            case 'object':
                let index = Object.keys(this.params).indexOf($field.name);
                config = index !== -1 ? this.params[ Object.keys(this.params)[index] ] : {};
                break;
            case 'html':
                $field.getAttribute('data-validationrules').trim().replace(/\s+/g, ' ').split(' ').forEach((rule)=>{
                    config[ rule ]  = {};

                    //params message
                    var targetMsg = {};
                    if($field.getAttribute('data-targeterror') !== null){
                        targetMsg['error'] = $field.getAttribute('data-targeterror');
                    }

                    if($field.getAttribute('data-targetsuccess') !== null){
                        targetMsg['success'] = $field.getAttribute('data-targetsuccess');
                    }

                    if(targetMsg.hasOwnProperty('error') || targetMsg.hasOwnProperty('success')){
                        config['target'] = targetMsg;
                    }

                    //params rule
                    var optionsRules = {};
                    if($field.getAttribute('data-validation' + rule + 'args') !== null){
                        optionsRules['params'] = $field.getAttribute('data-validation' + rule + 'args').trim();
                    }
                    if($field.getAttribute('data-success' + rule) !== null){
                        optionsRules["success"] = $field.getAttribute('data-success' + rule).trim();
                    }
                    optionsRules["error"] = $field.getAttribute('data-error' + rule).trim();

                    config[ rule ] = optionsRules;
                });
                break;
        }



        let props = {
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
