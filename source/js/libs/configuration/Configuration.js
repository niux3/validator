export default class Configuration{
    constructor(params, _default = null, callback = null){
        return  _default && typeof _default === 'object' && _default.constructor === Object ? this.__replace(_default, params) : params;
    }

    __replace(arr){
        let i = 0,
            p = '',
            argl = arguments.length,
            retObj;

        if (argl < 2) {
            throw new Error('There should be at least 2 arguments passed to this.__replace()')
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
                    retObj[p] = this.__replace(retObj[p], arguments[i][p])
                } else {
                    retObj[p] = arguments[i][p]
                }
            }
        }

        return retObj
    }

    add(key, value){
        this.__attrs[key] = value;
    }

    get(){
        return this.__attrs;
    }


}
