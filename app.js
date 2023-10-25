const express = require('express');
const { Pool } = require('pg'); 
const cors=require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.dbstring || 'postgres://aravind:9c0RELHHjYkmnCij46NrZPXGxgPITGTm@dpg-cksjufhrfc9c7393r7l0-a.singapore-postgres.render.com/docket_db_c1eh?ssl=true',
  connectTimeoutMillis: 10000,
  idle_timeout: 2
});

pool.connect((error) => {
  if (error) {
    console.error('Error connecting to PostgreSQL database!', error);
    return;
  } else {
    console.log('Connected to PostgreSQL database!');
  }
});

app.get('/getSuppliers', (req, res) => {
  const sql = 'SELECT distinct(Supplier) FROM docket_data'; // Modify this query according to your database schema
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching suppliers:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const suppliers = results.rows.map(result => result.supplier);
    res.json(suppliers);
  });
});

app.get('/getPONumber', (req, res) => {
  const sql = `SELECT PO_Number,Description FROM docket_data Where Supplier='${req.query.supplier}'` ; // Modify this query according to your database schema
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching suppliers:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log(results.rows);
    const poNumbers = results.rows.map(result => { return {poNumber : result.po_number, description : result.description}});
    res.json(poNumbers);
  });
});

app.post('/saveDocket', (req,res) => {
  console.log("Incoming request to saveDocket ===> ",req.body);
  req = req.body;
  const sql = `insert into docket(name,Start_Time,Stop_Time,No_Of_Hours_Worked,Rate_Per_Hour,Supplier_Name,Purchase_Order)
   values('${req.name}','${req.startTime}','${req.endTime}',${req.hoursWorked},${req.ratePerHour},'${req.supplier}','${req.purchaseOrder}')`
   pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching suppliers:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json("Inserted");
  });
})

app.get('/getDockets', (req, res) => {
  const sql = `SELECT * FROM docket` ;
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching suppliers:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log(results.rows);
    const docketList = results.rows.map(result => {
        return {
            name:result.name,
            startTime:result.start_time,
            endTime: result.stop_time,
            hoursWorked: result.no_of_hours_worked,
            ratePerHour: result.rate_per_hour,
            supplier:result.supplier_name,
            purchaseOrder:result.purchase_order,
            id: result.id
        }});
    res.json(docketList);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
