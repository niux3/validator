export default (...args)=>{
    return parseInt(args[0], 10) > parseInt(args[1]['params'], 10);
}
