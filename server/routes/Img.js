const express = require('express')
const router = express.Router()
const { createImgs ,listImgs , removeImgs,createClound,removeClound} = require ("../controllers/Img")
const { authCheck, adminCheck } = require('../middlewares/authCheck')

router.post('/imgs',createImgs ) 
router.get('/imgs/:id',listImgs ) 
router.delete('/imgs/:id',removeImgs ) 

router.post('/createclound',authCheck,adminCheck,createClound)
router.post('/removeclound',authCheck,adminCheck,removeClound)

module.exports = router