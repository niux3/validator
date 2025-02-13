export default (...args:any)=>{
    return new RegExp('^[a-z0-9]+$', 'i').test(args[0])
}
