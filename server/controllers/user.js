const prisma = require("../config/prisma")
const { connect } = require("../routes/user")
const { create } = require("./product")

exports.listUsers = async(req,res)=>{
    try{
        //code
        const user = await prisma.user.findMany({
            select:{
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true
            }
        })
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.change_status = async(req,res)=>{
    try{
        //code
        const { id, enabled } = req.body
        // console.log(id, enabled)
        const user = await prisma.user.update({
            where:{ id:Number(id)},
            data: { enabled:enabled} 
        })

        res.send('Update Status Seccess')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.change_role = async(req,res)=>{
    try{
        const { id, role } = req.body
        // console.log(id, enabled)
        const user = await prisma.user.update({
            where:{ id:Number(id)},
            data: { role:role} 
        })

        res.send('Update Role Seccess')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.userCart = async(req,res)=>{
    try{
        //code
        const { cart } = req.body
        console.log(cart)
        // const { cart_user } = req.user.id
        console.log(req.user.id)
        
        const user = await prisma.user.findFirst({
            where: { id: Number(req.user.id) }
        })
        
        // console.log(user)

        // delete old cart item ***ทำไมต้องลบสินค้าอันเก่าออก** 
        await prisma.productOnCart.deleteMany({
            where:{
                cart: { 
                    orderedById: user.id 
                }

            }
        })
        // delete old class ***ทำไมต้องลบสินค้าอันเก่าออก**  
        await prisma.cart.deleteMany({
            where: { orderedById: user.id }
        })

        // เตรียมสินค้า 
        let products = cart.map((item)=> ({
            productId: item.id,
            count: item.count,
            price: item.price  
        }))
        // หายอดตะกล้ารวมให้ใช้ reduce() 
        let cartTotal = products.reduce((sum, item) => 
            sum+item.price * item.count, 0)


        // New class 
        const newCart = await prisma.cart.create(
        {
            data: {
                products: {create: products},
                cartTotal: cartTotal,
                orderedById: user.id,

            }
        })
        console.log(newCart)

        res.send(' Products Add Cart Seccess')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.get_userCart = async(req,res)=>{
    try{
        //code
        const cart = await prisma.cart.findFirst({
            where: { 
                orderedById: Number(req.user.id)
            },
            include: {
                products: { 
                    include: {
                        product: true
                    }
                }
            }
        }) 
        // console.log(cart)
        res.json({
            products: cart.products,
            cartTotal: cart.cartTotal
        })
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.remove_cart = async(req,res)=>{
    try{
        //code
        const cart = await prisma.cart.findFirst({
            where: { orderedById: Number(req.user.id) }
        })
        if(!cart){
            return res.status(400).json({ message: "No cart"})
        }

        //start ลบตะกร้า 
        await prisma.productOnCart.deleteMany({
            where:{ cartId: cart.id }
        })
        const result = await prisma.cart.deleteMany({
            where:{ orderedById:Number(req.user.id) }
        }) 
        // End 

        // console.log(result)
        res.json({ 
            message: "Cart Remove Seccess",
            deletedCount: result.count
        })
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.save_address = async(req,res)=>{
    try{
        //code
        const { address } = req.body 
        // console.log(address)
        const addressUser = await prisma.user.update({
            where : { 
                id: Number(req.user.id)
            },
            data : { 
                address : address 
            }
        })  
        res.json({OK: true, massage: 'Address Seccess'})
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.save_order = async(req,res)=>{
    try{
        const { id, amount, status, currency } = req.body.paymentIntent
        //code
        // step 0 check payload  stripe 
        // console.log(req.body)
        // return res.send('oh oh oh ')

        const amountTHB = Number(amount) / 100 
        // Step 1 Get User Cart 
        const userCart = await prisma.cart.findFirst({
            where:{ 
                orderedById: Number(req.user.id)
            },
            include:{ products: true }
        })

        // Check Cart Empty 
        if(!userCart || userCart.products.length === 0){
            return res.status(400).json({
                OK : false,
                 massage: "Cart is Empty"
                })
        }
        // check quantity 
        // for(const item of userCart.products){
        //     const product = await prisma.product.findUnique({
        //         where:{ id: item.productId },
        //         select:{ quantity: true, title: true }
        //     })
        //     // console.log(item)
        //     // console.log(product)
        //     if (!product || item.count > product.quantity){
        //         return res.status(400).json({ 
        //             OK : false,
        //             message: `ขออภัยสินค้า ${product?.title || 'product'} หมดแล้วจ้า`
        //         })
        //     }
        // }
        // // Create a New Order 
        const order = await prisma.order.create({ 
            data: {
                    products: {
                        create: userCart.products.map((item) => ({
                            productId: item.productId,
                            count: item.count,
                            price: item.price,

                        }))
                    },     
                    orderedBy: {
                            connect: { id: req.user.id },
                    },
                    cartTotal: userCart.cartTotal,
                    stripePaymentId: id, 
                    amount: Number(amount),
                    status: status,
                    currency: currency,
                    // stripePaymentId String?
                    // amount          Int?
                    // status          String?
                    // currency       String?
                    },
                    
        })
        // update  Order 
        const update =  userCart.products.map((item)=>({
            where:{ id: item.productId },
            data: {
                quantity:{ decrement : item.count },
                sold: { increment : item.count }
            }
        }))
        console.log(update)

        await Promise.all(
            update.map((updated)=> prisma.product.update(updated))
        )
        // remove cart 
        await  prisma.cart.deleteMany({
            where:{ orderedById : Number(req.user.id)}
        })

        res.json({ ok : true, order })
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
    
}

exports.get_order = async(req,res)=>{
    try{
        //code
        const osders = await prisma.order.findMany({
            where : { orderedById: Number(req.user.id) },
            include: {
                products:{
                    include:{
                        product: true
                    }
                }
            }
        })
        if( osders.length === 0 ){
            return res.status(400).json({ ok : false, message: "No Orders "})
        } 
        res.json({ ok : false, osders})

    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}
