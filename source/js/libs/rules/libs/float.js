export default (...args)=>{
    return !new RegExp('^[0-9]+(\.|,)[0-9]+$').test(args[0]);
}
