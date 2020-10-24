export default (...args)=>{
    return !new RegExp(`^([a-z0-9]+[-._]?[a-z0-9]+)+@([a-z0-9]+[-._]?[a-z0-9]+)+\.[a-z]{2,}$`).test(args[0]);
}
