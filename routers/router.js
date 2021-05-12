var express = require('express');
var router = express.Router()
var accountService = require('./accountService')
var projectService = require('./projectService')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(accountService)
router.use(projectService)

module.exports = router