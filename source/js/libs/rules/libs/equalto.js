export default (...args)=>{
    let params = args[1]['params'];
    if(document.querySelector(params)){
        if(args[0] !== document.querySelector(params).value.trim()){
            return true;
        }
    }else{
        if(/[^0-9]/.test(params) && params !== args[0]){
            return true;
        }else if(parseInt(params,10) !== parseInt(args[0], 10)){
            return true;
        }
    }
}
