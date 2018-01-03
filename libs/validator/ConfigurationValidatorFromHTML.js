import { ConfigurationValidatorFromObject } from './ConfigurationValidatorFromObject';

class ConfigurationValidatorFromHTML extends ConfigurationValidatorFromObject{
    constructor(options){
        super(options);
        this.__requireEls();
        return this;
    }

    __requireEls(){
        this.configuration['fields'] = {};
        document.querySelectorAll('.require').forEach(($require) =>{
            this.__paramsRulesNode($require);
        });
    }

    __paramsRulesNode($field){
        $field.getAttribute('data-validationrules').trim().replace(/\s+/g, ' ').split(' ').forEach((rule)=>{
            if(this.configuration['fields'][ $field.name ] === undefined){
                this.configuration['fields'][ $field.name ] = {};
            }
            this.configuration['fields'][ $field.name ][ rule ]  = {};

            //params message
            var targetMsg = {};
            if($field.getAttribute('data-targeterror') !== null){
                targetMsg['error'] = $field.getAttribute('data-targeterror');
            }

            if($field.getAttribute('data-targetsuccess') !== null){
                targetMsg['success'] = $field.getAttribute('data-targetsuccess');
            }

            if(targetMsg.hasOwnProperty('error') || targetMsg.hasOwnProperty('success')){
                this.configuration['fields'][ $field.name ]['target'] = targetMsg;
            }

            //params rule
            var optionsRules = {};
            if($field.getAttribute('data-validation' + rule) !== null){
                optionsRules["params"] = $field.getAttribute('data-validation' + rule).trim();
            }
            optionsRules["message"] = $field.getAttribute('data-error' + rule).trim();

            this.configuration['fields'][ $field.name ][ rule ] = optionsRules;
        });
    }
}

export { ConfigurationValidatorFromHTML }
