export default (...args)=>{
    return !new RegExp('^[a-zA-Z]+$').test(args[0]);
}
