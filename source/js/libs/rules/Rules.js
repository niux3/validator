import boolean from './libs/boolean';
import contains from './libs/contains';
import creditcard from './libs/creditcard';
import hash from './libs/hash';
import hexadecimal from './libs/hexadecimal';
import mobilephone from './libs/mobilephone';
import postalcode from './libs/postalcode';
import notempty from './libs/notempty';
import email from './libs/email';
import alphanumeric from './libs/alphanumeric';
import numeric from './libs/numeric';
import float from './libs/float';
import alpha from './libs/alpha';
import url from './libs/url';
import ipv4 from './libs/ipv4';
import min from './libs/min';
import max from './libs/max';
import between from './libs/between';
import maxlength from './libs/maxlength';
import minlength from './libs/minlength';
import betweenlength from './libs/betweenlength';
import equalto from './libs/equalto';
import date from './libs/date';

export default class Rules{
    constructor(){
        this.__rulesList = {
            'boolean'      : boolean,
            'contains'     : contains,
            'creditcard'   : creditcard,
            'hash'         : hash,
            'hexadecimal'  : hexadecimal,
            'mobilephone'  : mobilephone,
            'postalcode'   : postalcode,
            'notempty'     : notempty,
            'email'        : email,
            'alphanumeric' : alphanumeric,
            'numeric'      : numeric,
            'float'        : float,
            'alpha'        : alpha,
            'url'          : url,
            'ipv4'         : ipv4,
            'min'          : min,
            'max'          : max,
            'between'      : between,
            'maxlength'    : maxlength,
            'minlength'    : minlength,
            'betweenlength': betweenlength,
            'equalto'      : equalto,
            'date'         : date,
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
