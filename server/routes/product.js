const express = require('express')
const router = express.Router()
const { create, list, update, remove, listBy, search, read } = require('../controllers/product')








router.post('/product',create)
router.get('/products/:count',list)
router.get('/product/:id',read)
router.put('/product/:id',update)
router.delete('/product/:id',remove)
router.post('/productby',listBy)
router.post('/search/filters',search)







module.exports = router