const { query } = require("express")
const prisma = require("../config/prisma")

exports.create = async(req,res)=>{
    try{
        //code
        const { title, description, price, quantity, 
        categoryId, images  } = req.body
        // console.log (title, description, price, quantity, 
            // categoryId, images)
        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item)=>({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        console.log(product)
        res.send('create product success')


    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error create"})
    }
}

exports.list = async(req,res)=>{
    try{
        //code
        const { count } = req.params
        // console.log(typeof count)
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt : "desc"},
            include:{ 
                category:true,
                images:true
            }
        })
        res.send(products)
        // const { id } = req.params
        // console.log(id)
        // res.send('hi list product')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.read = async(req,res)=>{
    try{
        //code
        const { id } = req.params
        // console.log(typeof count)
        const product = await prisma.product.findFirst({
            where:{
                id: Number(id)
            },
            include:{ 
                category:true,
                images:true
            }
        })
        res.send(product)

    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.update = async(req,res)=>{
    try{
        //code
        const { id } = req.params
        // console.log(id)
        const { title, description, price, quantity, 
            categoryId, images  } = req.body
           await prisma.image.deleteMany({
            where:{
                productId: Number(id)
            }

           }) 

        const product = await prisma.product.update({
            where:{
                id: Number(id)
            },
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item)=>({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        console.log(product)
        res.send('update product success')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.remove = async(req,res)=>{
    try{
        //code
        const { id } = req.params

        // ลบรูปในคาว มันยาก เดี๋ยวเวะมา 


        await prisma.product.delete({
            where:{
                id: Number(id)
            }
        })
        // console.log(id)
        res.send('Delete Success')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

exports.listBy = async(req,res)=>{
    try{
        //code
        const { sort, order, limit } = req.body
        console.log(sort, order, limit)
        const products = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]:order },
            include: { category: true }

        })
        res.send(products)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}


const hashdleCategory = async(req,res,categoryId)=>{
    try{
        const products = await prisma.product.findMany({
            where:{
                categoryId:{
                    in: categoryId.map((id) => Number(id))
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } 
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}
const hashdlePrice = async(req,res,priceRange)=>{
    try{
        const products = await prisma.product.findMany({
            where:{
                price:{
                    gte: priceRange[0],
                    lte: priceRange[1]
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } 
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}
const hashdleQuery = async(req,res,query)=>{
    try{
        const products = await prisma.product.findMany({
            where:{
                title:{
                    contains: query,
                }
            },
            include:{
                category: true,
                images: true
            }
        })
        res.send(products)
    } 
    catch (err){
        console.log(err)
        res.status(500).json({ message: "Search Error"})
    }
}

exports.search = async(req,res)=>{
    try{
        //code
        const { query, category, price } = req.body

        if(query){
            console.log('query-->', query)
            await hashdleQuery(req,res,query)
        }
        if(category){
            console.log('category-->', category)
            await hashdleCategory(req,res,category)
        }
        if(price){
            console.log('price-->', price)
            await hashdlePrice(req,res,price)
            
        }
        // res.send('hi search product')
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error"})
    }
}

