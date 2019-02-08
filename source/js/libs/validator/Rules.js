export default class Rules{
    constructor(){
        this.__rulesList = {
            'boolean'       : (...args)=>{
                return !new RegExp("^0|1|true|false$").test(args[0]);
            },
            'notempty'      : (...args)=>{
                return parseInt(args[0].length, 10) === 0;
            },
            'email'         : (...args)=>{
                return !new RegExp("^([a-z0-9]+[-._]?[a-z0-9]+)+@([a-z0-9]+[-._]?[a-z0-9]+)+\.[a-z]{2,}$").test(args[0]);
            },
            'alphanumeric'  : (...args)=>{
                return !new RegExp('^[a-z0-9]+$').test(args[0]);
            },
            'numeric'       : (...args)=>{
                return !new RegExp('^[0-9]+$').test(args[0]);
            },
            'float'         : (...args)=>{
                return !new RegExp('^[0-9]+(\.|,)[0-9]+$').test(args[0]);
            },
            'alpha'         : (...args)=>{
                return !new RegExp('^[a-zA-Z]+$').test(args[0]);
            },
            'url'           : (...args)=>{
                return !new RegExp('^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})$').test(args[0]);
            },
            'ipv4'          : (...args)=>{
                return !new RegExp('^([0-2][0-5][0-9]\.){3}[0-2][0-5][0-9]$').test(args[0]);
            },
            'min'           : (...args)=>{
                return parseInt(args[0], 10) < parseInt(args[1]['params'], 10);
            },
            'max'           : (...args)=>{
                return parseInt(args[0], 10) > parseInt(args[1]['params'], 10);
            },
            'between'       : (...args)=>{
                let params = args[1].split(';');
                return  args[0] > parseInt(params[0], 10) || args[0] < parseInt(params[1], 10);
            },
            'maxlength'     : (...args)=>{
                return parseInt(args[0].length, 10) > parseInt(args[1]['params'], 10);
            },
            'minlength'     : (...args)=>{
                return parseInt(args[0].length, 10) < parseInt(args[1]['params'], 10) ;
            },
            'betweenlength' : (...args)=>{
                let params = args[0].split(';');
                return  args[0].length < params[0] || args[0].length > params[1];
            },
            'equalto'       : (...args)=>{
                let params = args[1]['params'];
                if(document.querySelector(params)){
                    if(args[0] !== document.querySelector(params).value.trim()){
                        return true;
                    }
                }else{
                    if(/[^0-9]/.test(params) && params !== args[0]){
                        return true;
                    }else if(parseInt(params,10) !== parseInt(args[0], 10)){
                        return true;
                    }
                }
            },
            'date'          : (...args)=>{
                if(args[0] === ''){
                    return true;
                }
                let partsDate = args[0].match(/^(\d{4})-(\d{2})-(\d{2})/,'gi'),
                    m = partsDate[2],
                    y = partsDate[1],
                    d = partsDate[3];
                return (m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate()) === false;
            }
        }
    }

    /*
    * get content attribute of rules
    * @return object
    */
    get(){
        return this.__rulesList;
    }

    /*
    * add or update rule attribute
    * @param key is a string : a name of rule
    * @param rule  is a lambda function : return bollean validation (the first argument of the lambda method is the field object)
    */
    set(key, rule){
        this.__rulesList[key] = rule;
    }
}
