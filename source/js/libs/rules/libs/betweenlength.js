export default (...args)=>{
    let params = args[0].split(';');
    return  args[0].length < params[0] && args[0].length > params[1];
}
