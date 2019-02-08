import Element from './Element';

export default class Field extends Element{
    constructor(props){
        super(props);
        this.__configuration = props.configuration;
        this.state = {
            success : false,
            error : false,
            message : null
        };
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
        return callback(this, i);
    }

    clean(){
        for(let item in this.state){
            if(item !== "message" && this.state[item] === true){
                this.resetState();
                this.$el.classList.remove(item);

                if(document.getElementById(this.id) !== null){
                    let $stateMessage = document.getElementById(this.id);
                    $stateMessage.parentNode.removeChild($stateMessage);
                }
            }
        }

        return this;
    }

    /*
    * show state
    * @param field is a attribute of Form object
    */
    displayState(){
        let selectorState = `.error[data-name="field_${this.$el.name}"], .success[data-name="field_${this.$el.name}"]`;
        for(let item in this.state){
            if(item !== 'message' && this.state[item]){
                this.$el.classList.add(item);
                this.state.message = this.state.message !== null? this.state.message : '';

                if(this.__configuration.hasOwnProperty('target')){
                    if(this.$el.closest('form').querySelector(this.__configuration['target'][item])){
                        this.$el.closest('form').querySelectorAll(this.__configuration['target'][item]).forEach(($target) =>{
                            if($target.querySelectorAll(selectorState).length > 0) return;
                            $target.insertAdjacentHTML('beforeend', this.__getTemplateMessage( item, this.id ,this.$el.name, this.state.message ))
                        });
                    }
                }else{
                    if(this.$el.parentNode.querySelectorAll(selectorState).length > 0) return;
                    this.$el.insertAdjacentHTML('afterend', this.__getTemplateMessage( item, this.id,this.$el.name, this.state.message ));
                }
            }
        }

        return this;
    }

    /*
    * check validity field
    * @param field is a attribute of Form object
    */
    validate(rules){
        let defaultRules = rules.get(),
            rulesInNode = this.__getRulesList(),
            fieldValue,
            checks = [];

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
                if( key === ruleInNode && defaultRules[key](fieldValue, this.__configuration[key])){
                    this.state.error = true;
                    this.state.message = this.__configuration[key]['message'];
                }

                if(!this.state.error){
                    this.state.success = true;
                }else{
                    this.state.success = false;
                }
            }
        });

        return this;
    }

    /*
    * return
    * @param field is a attribute of Form object
    */
    __getTemplateMessage(cls, id, dataname, msg){
        return `<span id="${id}" data-name="field_${dataname}" class="${cls}">${msg}</span>`;
    }

    /*
    * manage rules list
    * @param field is a attribute of Form object
    *
    * @return object
    */
    __getRulesList(){
        let notempty = false,
            rulesList = [];

        for(let item in this.__configuration){
            item = item.trim().replace(/\s+/g, ' ');
            if(item !== "target"){
                if(item === "notempty"){
                    notempty = true;
                }else{
                    rulesList.push(item);
                }
            }
        }

        if(notempty){
            rulesList.push('notempty');
        }

        return rulesList;
    }
}
