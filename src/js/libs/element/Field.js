import Element from './Element';

export default class Field extends Element{
    constructor($el = null){
        super($el);
        this.state = {
            success : false,
            error : false,
            message : null
        };
        this.multipleData = false;
    }

    resetState(){
        this.setState({
            sucess : false,
            error : false,
            message : null
        });
    }

    setState(val){
        if(typeof val === "object"){
            this.state = val;
        }
    }

    update(obj, i, callback){
        //console.log('field update >>>', obj, i, obj === this);

        return callback(this, i);
    }

    clean(){
        for(let item in this.state){
            if(item !== "message" && this.state[item] === true){
                this.resetState();
                this.$el.classList.remove(item);

                if(document.getElementById(`${this.$el.name}_statemessage`) !== null){
                    let $errorMessage = document.getElementById(`${this.$el.name}_statemessage`);
                    $errorMessage.parentNode.removeChild($errorMessage);
                }
            }
        }
    }

    /*
    * show state
    * @param field is a attribute of Form object
    */
    displayState(configuration){
        if(document.getElementById(`${this.$el.name}_statemessage`)){
            return;
        }
        for(let item in this.state){
            if(item !== 'message' && this.state[item]){
                this.$el.classList.add(item);
                this.state.message = this.state.message !== null? this.state.message : '';

                if(configuration.get()['fields'][this.$el.name].hasOwnProperty('target')){
                    if(this.$el.closest('form').querySelector(configuration.getNameKey(this.$el.name)['target'][item])){
                        this.$el.closest('form').querySelectorAll(configuration.getNameKey(this.$el.name)['target'][item]).forEach(($target) =>{
                            $target.insertAdjacentHTML('beforeend', this.__getTemplateMessage( item, this.$el.name , this.state.message ))
                        });
                    }
                }else{
                    this.$el.insertAdjacentHTML('afterend', this.__getTemplateMessage( item, this.$el.name, this.state.message ));
                }
            }
        }
    }

    /*
    * check validity field
    * @param field is a attribute of Form object
    */
    validate(configuration, rules){
        let defaultRules = rules.get();
        let rulesInNode = configuration.getRulesList(this);
        let fieldValue;
        let checks = [];

        //field is a group of checkbox or multiple choices or radio ?
        if(this.$el.name.indexOf('[]') !== -1 || this.$el.type === "radio"){
            document.getElementsByName(this.$el.name).forEach(($input) =>{
                if($input.checked){
                    checks.push($input.value);
                }
            });
            fieldValue = checks;
        }else{
            fieldValue = this.$el.value.trim();
        }

        rulesInNode.forEach((ruleInNode) =>{
            for(let key in defaultRules){
                if( key === ruleInNode && defaultRules[key](fieldValue, configuration.getNameKey(this.$el.name)[key])){
                    this.state.error = true;
                    this.state.message = configuration.getNameKey(this.$el.name)[key]['message'];
                }

                if(!this.state.error){
                    this.state.success = true;
                }else{
                    this.state.success = false;
                }
            }
        });
    }

    /*
    * return
    * @param field is a attribute of Form object
    */
    __getTemplateMessage(cls, id, msg){
        return `<span id="${id}_statemessage" class="${cls}">${msg}</span>`;
    }
}
