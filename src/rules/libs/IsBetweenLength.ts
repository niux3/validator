export default (...args:any)=>{
    let [ value, params ] = args,
        [ min, max ] = params.split(";")
    return  value.length > parseInt(min, 10) && value.length < parseInt(max, 10)
}
