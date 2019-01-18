class Configuration{
    constructor(options){
        if(typeof options !== 'object' && options !== undefined){
            throw new Exception('this instance must be have one argument and this one must be a object for the constructor ');
        }
        this.configuration = {};
        this.options = options;
    }

    update(key, defaultValue, format, options){
        if(typeof this.options[key] === format && this.options[key] !== undefined){
            this.configuration[key] = options[key];
        }else{

            this.configuration[key] = defaultValue;
        }
    }

    add(key, value){
        this.configuration[key] = value;
    }

    get(){
        return this.configuration;
    }
}

export { Configuration }
