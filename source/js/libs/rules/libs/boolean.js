export default (...args)=>{
    return !new RegExp("^0|1|true|false$").test(args[0]);
}
