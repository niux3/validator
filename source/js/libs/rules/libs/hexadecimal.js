export default (...args)=>{
    return !/^[0-9A-F]+$/i.test(args[0]);
}
