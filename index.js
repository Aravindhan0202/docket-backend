
// const mysql= require('mysql2');

// const connection= mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'root',
//     database:'db'
// });
// connection.connect((error)=>{
//     if(error){
//         console.error('Error connecting to MYSQL database!',error);
//         return;
//     }
//     else{
//         console.error('connected to MYSQL database!');
//     }
    
// });
// module.exports = connection;
//connection.end();

// const {Client} = require('pg');
// const connectionString = 'postgres://aravind:9c0RELHHjYkmnCij46NrZPXGxgPITGTm@dpg-cksjufhrfc9c7393r7l0-a.singapore-postgres.render.com/docket_db_c1eh'

// const client = new Client({
//     connectionString,
// })
   
// client.connect().then(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// })

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'aravind',
//   host: 'dpg-cksjufhrfc9c7393r7l0-a.singapore-postgres.render.com',
//   database: 'docket_db_c1eh',
//   password: '9c0RELHHjYkmnCij46NrZPXGxgPITGTm',
//   port: 5432,
// })


// module.exports = pool;