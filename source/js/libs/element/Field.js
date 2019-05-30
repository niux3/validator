import Element from './Element';

export default class Field extends Element{
    constructor(props){
        super(props);
        this.__configuration = props;

        let state = {
            success : false,
            error : false,
            message : null
        };
        this.__configuration.state[this.__configuration.indexForm].fields[this.__configuration.indexField] = state
        this.__switchRequireAttribute();
    }

    resetState(){
        this.setState({
            success : false,
            error : false,
            message : null
        });
    }

    setState(val){
        if(typeof val === "object"){
            this.__configuration.state[this.__configuration.indexForm].fields[this.__configuration.indexField] = val;
        }
    }

    update(obj, i, callback){
        return callback(this, i);
    }

    clean(){
        let state = this.__configuration.state[this.__configuration.indexForm].fields[this.__configuration.indexField];
        for(let item in state){
            if(item !== "message" && state[item] === true){
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
        let selectorState = `.error[data-name="field_${this.$el.name}"], .success[data-name="field_${this.$el.name}"]`,
            state = this.__configuration.state[this.__configuration.indexForm].fields[this.__configuration.indexField],
            params = this.__configuration.params;
        for(let item in state){
            if(item !== 'message' && state[item]){
                this.$el.classList.add(item);
                state.message = state.message !== null? state.message : '';

                if(params.hasOwnProperty('target') && this.$el.closest('form').querySelector(params['target'][item])){
                    this.$el.closest('form').querySelectorAll(params['target'][item]).forEach(($target) =>{
                        //return this.__displayMessage($target, $target.querySelectorAll(selectorState).length, 'beforeend', item);
                        if($target.querySelectorAll(selectorState).length > 0) return;
                        if(state.message !== ""){
                            $target.insertAdjacentHTML('beforeend', this.__getTemplateMessage( item, this.id ,this.$el.name, state.message ))
                        }
                    });
                }else{
                    //return this.__displayMessage($target, $target.querySelectorAll(selectorState).length, 'beforeend', item);
                    if(this.$el.parentNode.querySelectorAll(selectorState).length > 0) return;
                    if(state.message !== ""){
                        this.$el.insertAdjacentHTML('afterend', this.__getTemplateMessage( item, this.id,this.$el.name, state.message ));
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
    validate(){
        let defaultRules = this.__configuration.rules.get(),
            state = this.__configuration.state[this.__configuration.indexForm].fields[this.__configuration.indexField],
            rulesInNode = this.__getRulesList(),
            middleware = this.__configuration.middleware,
            params = this.__configuration.params,
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
                if( key === ruleInNode && defaultRules[key](fieldValue, params[key])){
                    state.error = true;
                    state.message = params[key]['error'];
                    if(middleware.fieldOnError !== null){
                        middleware.fieldOnError(this.$el);
                    }
                }

                if(!state.error){
                    state.success = true;
                    if(params[key] !== undefined && params[key].hasOwnProperty('success')){
                        state.message = params[key]['success'];
                    }
                    if(middleware.fieldOnSuccess !== null){
                        middleware.fieldOnSuccess(this.$el);
                    }
                }else{
                    state.success = false;
                }
            }
        });
        this.__configuration.state[this.__configuration.indexForm].fields[this.__configuration.indexField]  = state;
        this.__checkFormSuccess();

        return this;
    }

    __checkFormSuccess(){
        let fieldsState = this.__configuration.state[this.__configuration.indexForm].fields,
            formSuccess = true;
        fieldsState.forEach((stateField) => {
            if(stateField.error){
                formSuccess = false;
            }
        })
        this.__configuration.state[this.__configuration.indexForm].success = formSuccess;
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

        for(let item in this.__configuration.params){
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
        if(this.__configuration.state[this.__configuration.indexForm].fields[this.__configuration.indexField].message !== ""){
            target.insertAdjacentHTML(position, this.__getTemplateMessage( state, this.id,this.$el.name, this.__configuration.state[this.__configuration.indexForm].fields[this.__configuration.indexField].message ));
        }
    }
}
