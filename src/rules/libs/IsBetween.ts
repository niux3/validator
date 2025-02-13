export default (...args:any)=>{
    let [ value, params ] = args,
        [ min, max ] = params.split(";")
    return  value > parseInt(min, 10) && value < parseInt(max, 10)
}
