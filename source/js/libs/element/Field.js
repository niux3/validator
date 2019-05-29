import Element from './Element';

export default class Field extends Element{
    constructor(props){
        super(props);
        this.__configuration = props.configuration;
        this.__state = {
            success : false,
            error : false,
            message : null
        };
        this.__switchRequireAttribute();
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
            this.__state = val;
        }
    }

    update(obj, i, callback){
        return callback(this, i);
    }

    clean(){
        for(let item in this.__state){
            if(item !== "message" && this.__state[item] === true){
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
    */
    displayState(){
        let selectorState = `.error[data-name="field_${this.$el.name}"], .success[data-name="field_${this.$el.name}"]`;
        for(let item in this.__state){
            if(item !== 'message' && this.__state[item]){
                this.$el.classList.add(item);
                this.__state.message = this.__state.message !== null? this.__state.message : '';

                if(this.__configuration.hasOwnProperty('target') && this.$el.closest('form').querySelector(this.__configuration['target'][item])){
                    this.$el.closest('form').querySelectorAll(this.__configuration['target'][item]).forEach(($target) =>{
                        //return this.__displayMessage($target, $target.querySelectorAll(selectorState).length, 'beforeend', item);
                        if($target.querySelectorAll(selectorState).length > 0) return;
                        if(this.__state.message !== ""){
                            $target.insertAdjacentHTML('beforeend', this.__getTemplateMessage( item, this.id ,this.$el.name, this.__state.message ))
                        }
                    });
                }else{
                    //return this.__displayMessage($target, $target.querySelectorAll(selectorState).length, 'beforeend', item);
                    if(this.$el.parentNode.querySelectorAll(selectorState).length > 0) return;
                    if(this.__state.message !== ""){
                        this.$el.insertAdjacentHTML('afterend', this.__getTemplateMessage( item, this.id,this.$el.name, this.__state.message ));
                    }
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
        if(this.$el.type === 'checkbox' || (this.$el.nodeName.toLowerCase() === 'select' && this.$el.hasAttribute('multiple'))  || this.$el.type === "radio"){
            if((this.$el.nodeName.toLowerCase() === 'select')){
                this.$el.querySelectorAll('option').forEach(($option)=>{
                    if($option.selected){
                        checks.push($option.value);
                    }
                });
            }else{
                document.getElementsByName(this.$el.name).forEach(($input) =>{
                    if($input.checked){
                        checks.push($input.value);
                    }
                });
            }

            fieldValue = checks;
        }else{
            fieldValue = this.$el.value.trim();
        }

        rulesInNode.forEach((ruleInNode) =>{
            for(let key in defaultRules){
                if( key === ruleInNode && defaultRules[key](fieldValue, this.__configuration[key])){
                    this.__state.error = true;
                    this.__state.message = this.__configuration[key]['error'];
                }

                if(!this.__state.error){
                    this.__state.success = true;
                    if(this.__configuration[key] !== undefined && this.__configuration[key].hasOwnProperty('success')){
                        this.__state.message = this.__configuration[key]['success'];
                    }
                }else{
                    this.__state.success = false;
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

    __switchRequireAttribute(){
        if(this.$el.hasAttribute('required')){
            this.$el.removeAttribute('required');
            this.$el.classList.add('require');
        }
    }

    __displayMessage(target, targetLen, position, state){
        if(targetLen > 0) return;
        if(this.__state.message !== ""){
            target.insertAdjacentHTML(position, this.__getTemplateMessage( state, this.id,this.$el.name, this.__state.message ));
        }
    }
}
