var express = require('express');
var app = express();
var router = require('./routers/router')
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
const port = process.env.PORT || 3000;

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

 app.get('/', (req, res) => {
    res.send("API Gateway running for a-home")
}) 

/**app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM account');
      const results = { 'results': (result) ? result.rows : null};
      res.send(JSON.stringify(results));
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }) */

app.use(router)

console.log("Simple API Gateway run on localhost:3000")

app.listen(port);