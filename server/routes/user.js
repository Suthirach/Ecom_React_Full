const express = require('express')
const router = express.Router()
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const { 
    listUsers, 
    change_status, 
    change_role, 
    userCart, 
    get_userCart,
    remove_cart,
    save_address,
    save_order,
    get_order,
    
} = require('../controllers/user')

// admin สิทธิ์การเข้า 
router.get('/users',authCheck,adminCheck,listUsers)
router.post('/change-status',authCheck,adminCheck, change_status)
router.post('/change-role',authCheck,adminCheck, change_role)



// admin User  สิทธิ์การเข้า 
router.post('/user/cart',authCheck,userCart)
router.get('/user/cart',authCheck,get_userCart)
router.delete('/user/cart',authCheck,remove_cart)

router.post('/user/address',authCheck,save_address)

router.post('/user/order',authCheck,save_order)
router.get('/user/order',authCheck,get_order)



module.exports = router