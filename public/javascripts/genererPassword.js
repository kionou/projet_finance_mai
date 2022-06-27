 exports.getPassword = ()=>{
    let chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let Api_Key_length=11;
    let Api_Key='';
    for (let i = 0; i < Api_Key_length; i++) {
       let randomNumber=Math.floor(Math.random()*chars.length);
       Api_Key += chars.substring(randomNumber ,randomNumber + 1) ;
      
    }
    return Api_Key
}

 exports.soldeTotal =  (a,b)=>{
   return parseInt(a) - parseInt(b)
}

exports.soldeAdd =  (a,b)=>{
  
  return  parseInt(a) + parseInt(b)

}



