export default (...args:any[])=> {
    let [value, params] = args
    if (typeof params !== 'object' && typeof params.params !== 'string' && !/^\d+$/.test(params.params)) {
        throw new Error('The params of method "is min length" must be a number')
    }
    return value.length > parseInt(params.params, 10)
}
