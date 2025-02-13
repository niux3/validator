export class Configuration {
    private attrs: object = {}

    constructor(params:object, _default:object|null = null) {
        this.attrs = this.isObject(_default)? {..._default, ...params} : params
    }

    private isObject(value: any): value is object {
        return value !== null && typeof value === "object" && !Array.isArray(value)
    }

    add(key: string, value: any) {
        this.attrs[key] = value
    }

    get(): object{
        return { ...this.attrs } 
    }
}
