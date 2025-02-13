export default (...args:any[])=>{
    if(typeof args[0] !== "string" ){
        return false
    }
    return parseInt(args[0].trim().length, 10) > 0
}
