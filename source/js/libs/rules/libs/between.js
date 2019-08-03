export default (...args)=>{
    let params = args[1].split(';');
    return  args[0] > parseInt(params[0], 10) && args[0] < parseInt(params[1], 10);
}
