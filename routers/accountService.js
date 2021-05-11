var express = require('express');
var router = express.Router()

router.get('/account', (req, res) => {
  res.send(req.path + " called")
})

router.get('/account/:hashtag', (req, res) => {
  res.send(req.path + " called")
})

router.post('/account', (req, res) => {
  res.send(req.path + " called")
})

module.exports = router