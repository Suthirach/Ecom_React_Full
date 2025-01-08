const prisma = require("../config/prisma")

exports.changOrderStatus = async(req,res)=>{
    try{
        //code
        const { orderId, orderStatus } = req.body 
        const orderUpdate = await prisma.order.update({
            where:{ id : orderId },
            data: { orderStatus : orderStatus }
        })
        res.json(orderUpdate)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.getOrderAdmin = async(req,res)=>{
    try{
        //code
        const orders = await prisma.order.findMany({
            include:{
                products:{
                    include:{
                        product: true
                    }
                },
                orderedBy: {
                    select:{
                        email: true,
                        address: true
                    }
                }
            }
        })

        res.json(orders)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
} 