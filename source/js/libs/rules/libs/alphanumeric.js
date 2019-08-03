export default (...args)=>{
    return !new RegExp('^[a-z0-9]+$').test(args[0]);
}
