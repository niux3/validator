/**
 * Class representing a configuration with dynamic attributes.
*/
export class Configuration {
    /**
     * Stores the configuration attributes.
     * @private
     * @type {{ [key: string]: any }}
    */
    private attrs: { [key: string]: any }
    
    /**
     * Creates an instance of Configuration.
     * @param {object} params - The initial configuration parameters.
     * @param {object|null} [_default=null] - The default parameters (optional).
    */
    constructor(params:object, _default:object|null = null) {
        this.attrs = this.isObject(_default)? {..._default, ...params} : params
    }
    
    /**
     * Checks if a value is an object.
     * @param {any} value - The value to check.
     * @returns {boolean} - Returns `true` if the value is an object, otherwise `false`.
    */
    private isObject(value: any): value is object {
        return value !== null && typeof value === "object" && !Array.isArray(value)
    }

    /**
     * Adds a new key-value pair to the configuration.
     * @param {string} key - The attribute key.
     * @param {any} value - The associated value.
    */
    add(key: string, value: any) {
        this.attrs[key] = value
    }

    /**
     * Retrieves the configuration attributes.
     * @returns {object} - An object containing all configuration attributes.
    */
    get(): object{
        return { ...this.attrs } 
    }
}
