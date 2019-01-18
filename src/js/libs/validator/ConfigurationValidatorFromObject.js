import { Configuration } from '../configuration/Configuration';

class ConfigurationValidatorFromObject extends Configuration{
    constructor(options){
        super(options);
        return this;
    }

    getNameKey(name){
        return this.get()['fields'][name];
    }
}

export { ConfigurationValidatorFromObject }
