export default (...args:any)=>{
    return new RegExp('^[a-zA-Z]+$').test(args[0])
}

