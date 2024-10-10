const mysql=require('mysql2')
var mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"akash",
    database:"product"
})
 mysqlConnection.connect((err)=>{
    if(err)
    {
        console.log("Database not Connect");
        
    }else
    {
        console.log("Database Connected!")
    }
})
module.exports=mysqlConnection