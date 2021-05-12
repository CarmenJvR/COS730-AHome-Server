var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3000'
const api = apiAdapter(BASE_URL)

//connect to postgersql heroku
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


/////////////////////////////////////////////////////////////////////////////////////////////////
////    Project API
/////////////////////////////////////////////////////////////////////////////////////////////////


//API: Get Project List

router.post('/projectList', async (req, res) => {
    try {
      const client = await pool.connect();
  
      const valuesR1 = [req.body.ac]
  
      client.query('SELECT * FROM project WHERE account_id = $1', valuesR1 ,(error, results) => {
        if (error) {
         throw error
        }
        
          const respond = { 'results': (results) ? results.rows : null};
          res.send(JSON.stringify(respond));
        })
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  
  //API: Create Project
  router.post('/createProject', async (req, res) => {
    try {
      const client = await pool.connect();
  
      //request variables
        const values = [req.body.ac, req.body.name, req.body.sd, req.body.ed, req.body.budget]
  
          //Email Not Used: Create Account
          client.query('INSERT INTO project (account_id, name, start_date, end_date, budget_total) VALUES ($1, $2, $3, $4, $5)', values ,(error, results) => {
            if (error) {
             //throw error
             res.status(404).send( JSON.stringify({error: 'Could Not Create Project'})  )
            }
      
              var respond = { message : 'Project successfully created'};
              res.status(201).send( JSON.stringify(respond))
            })
        
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

  module.exports = router