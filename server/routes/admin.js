const express = require('express')
const router = express.Router()
const { authCheck } = require('../middlewares/authCheck')
const { getOrderAdmin,changOrderStatus } = require('../controllers/admin')



router.put('/admin/order-status',authCheck, changOrderStatus)
router.get('/user/order',authCheck,getOrderAdmin)




module.exports = router 