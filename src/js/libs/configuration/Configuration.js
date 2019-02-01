import ConfigFromHTML from "./ConfigFromHTML";

export default class Configuration{
    constructor(params){
        let configDefault = {
            'selector' : 'form',
            'mode' : 'html'
        };
        
        this.__configuration = this.__replace(configDefault, params);
        if(this.__configuration.mode === 'html'){
            this.__configuration = new ConfigFromHTML(this.__configuration);
        }
        return this;
    }

    __replace(arr){
        let i = 0,
            p = '',
            argl = arguments.length,
            retObj;

        if (argl < 2) {
            throw new Error('There should be at least 2 arguments passed to array_replace_recursive()')
        }

        // Although docs state that the arguments are passed in by reference,
        // it seems they are not altered, but rather the copy that is returned
        // So we make a copy here, instead of acting on arr itself
        if (Object.prototype.toString.call(arr) === '[object Array]') {
            retObj = []
            for (p in arr) {
              retObj.push(arr[p])
            }
        } else {
            retObj = {}
            for (p in arr) {
              retObj[p] = arr[p]
            }
        }

        for (i = 1; i < argl; i++) {
            for (p in arguments[i]) {
                if (retObj[p] && typeof retObj[p] === 'object') {
                    retObj[p] = array_replace_recursive(retObj[p], arguments[i][p])
                } else {
                    retObj[p] = arguments[i][p]
                }
            }
        }

        return retObj
    }

    add(key, value){
        this.__configuration[key] = value;
    }

    get(){
        return this.__configuration;
    }

    getNameKey(name){
        return this.get()['fields'][name];
    }

    /*
    * manage rules list
    * @param field is a attribute of Form object
    *
    * @return object
    */
    getRulesList(field){
        let rulesInField = this.getNameKey(field.$el.name);
        let notempty = false;
        let rulesList = [];

        for(let item in rulesInField){
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

export { Configuration }
