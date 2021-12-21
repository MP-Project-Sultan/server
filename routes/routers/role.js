const express = require('express');
const {addRole , getRole} = require('../controllers/role')
const roleRouter = express.Router()
roleRouter.post('/addRole', addRole)
roleRouter.get('/getRole',getRole)

module.exports = roleRouter