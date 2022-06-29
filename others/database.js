
mysql = require('mysql')


let base = mysql.createConnection({
    
    host:'192.168.64.2',
    user:'kionou',
    password:'12345',
    database:'finance'

})

// let base = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'finance'
// })



module.exports=base;