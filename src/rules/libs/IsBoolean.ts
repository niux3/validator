export default (...args:any[])=>{
    return [true, false, 0, 1, "0", "1", "true", "false"].some(e => e === args[0])
}
