const express = require('express')
const router = express.Router()

router.get('/') //Gets all users

router.post('/') //Make a new user

router.put('/:user') //updates a user for something
//Note: If a user has new skills, these skills should be added to the database. Any existing skills should have their ratings updated.