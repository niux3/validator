import { ConfigurationValidatorFromObject } from './ConfigurationValidatorFromObject';
import { ConfigurationValidatorFromHTML } from './ConfigurationValidatorFromHTML';

class ConfigurationValidatorLoader{
    constructor(options){
        this.configuration = options;
        this.configuration.mode = this.configuration.mode === undefined ? 'object' : this.configuration.mode;
        
        return this.__load();
    }

    __load(){
        switch(this.configuration.mode){
            case 'html':
                return new ConfigurationValidatorFromHTML(this.configuration);
            case 'object':
                return new ConfigurationValidatorFromObject(this.configuration);
        }
    }
}

export { ConfigurationValidatorLoader }
