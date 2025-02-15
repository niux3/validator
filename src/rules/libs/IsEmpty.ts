export default (...args:any[])=>{
    if(typeof args[0] !== "string" ){
        return false
    }
    return args[0].trim().length === 0
}
