export default class ConfigurationFromHTML{
    constructor(options){
        this.__configuration = options;
        this.__requireEls();
        
        return this.__configuration;
    }

    __requireEls(){
        this.__configuration['fields'] = {};
        document.querySelectorAll('[data-validationrules]').forEach(($require) =>{
            this.__paramsRulesNode($require);
        });
    }

    __paramsRulesNode($field){
        $field.getAttribute('data-validationrules').trim().replace(/\s+/g, ' ').split(' ').forEach((rule)=>{
            if(this.__configuration['fields'][ $field.name ] === undefined){
                this.__configuration['fields'][ $field.name ] = {};
            }
            this.__configuration['fields'][ $field.name ][ rule ]  = {};

            //params message
            var targetMsg = {};
            if($field.getAttribute('data-targeterror') !== null){
                targetMsg['error'] = $field.getAttribute('data-targeterror');
            }

            if($field.getAttribute('data-targetsuccess') !== null){
                targetMsg['success'] = $field.getAttribute('data-targetsuccess');
            }

            if(targetMsg.hasOwnProperty('error') || targetMsg.hasOwnProperty('success')){
                this.__configuration['fields'][ $field.name ]['target'] = targetMsg;
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

            this.__configuration['fields'][ $field.name ][ rule ] = optionsRules;
        });
    }
}
