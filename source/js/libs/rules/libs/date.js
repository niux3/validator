export default (...args)=>{
    if(args[0] === '' || args[0] === null){
        return true;
    }
    let partsDate = args[0].match(/^(\d{4})-(\d{2})-(\d{2})/,'gi').map((item)=>{ return Number(item); }),
        m = partsDate[2],
        y = partsDate[1],
        d = partsDate[3];
    return (m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate()) === false;
}
