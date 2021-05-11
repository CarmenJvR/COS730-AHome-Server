var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3000'
const api = apiAdapter(BASE_URL)

// Configuration for PostgreSQL connection
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sysadmin',
  host: 'localhost',
  database: 'api',
  password: '1234',
  port: 5433,
})

// Cryptography Dependencies
//const jwt = require('jsonwebtoken');
const crypto = require('crypto');


router.get('/account', (req, res) => {
    api.get(req.path).then(resp => {
      res.send(resp.data)
    })
  })

  router.get('/getAccounts', (req, res) => {
    pool.query('SELECT * FROM account ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
  })


  router.post('/createAccount', (request, response) => {
    const pwd =  request.body.password;

    let hash = crypto.createHash('sha256').update(pwd).digest('base64');
  
    var tk = crypto.randomBytes(20).toString('hex') ;
    var today = new Date(new Date().getTime()+(5*24*60*60*1000));
    const values = [request.body.email, hash, tk , today  ]

    pool.query('INSERT INTO account (email, password, accessToken, expiration) VALUES ($1, $2, $3, $4)', values ,(error, results) => {
      if (error) {
       //throw error
       response.status(404).send(`Could not Insert new user`  )
      }

      var res = { accessToken: tk };
      response.status(201).send( JSON.stringify(res))
    })
  });



module.exports = router