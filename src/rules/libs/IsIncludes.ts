export default (...args:any)=>{
    let [ value, valueCheck ] = args
    return valueCheck.includes(value)
}
