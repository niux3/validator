export default (...args)=>{
    return !/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(args[0]);
}
