export default (...args)=>{
    return !new RegExp('^([0-2][0-5][0-9]\.){3}[0-2][0-5][0-9]$').test(args[0]);
}
