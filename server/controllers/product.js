const { query } = require("express");
const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.create = async (req, res) => {
    try {
        //code
        const { title, description, price, quantity, categoryId, images } =
            req.body;
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
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url,
                    })),
                },
            },
        });
        // console.log(product)
        res.send(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error create" });
    }
};

exports.list = async (req, res) => {
    try {
        //code
        const { count } = req.params;
        // console.log(typeof count)
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt: "desc" },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(products);
        // const { id } = req.params
        // console.log(id)
        // res.send('hi list product')
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.read = async (req, res) => {
    try {
        //code
        const { id } = req.params;
        // console.log(typeof count)
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.update = async (req, res) => {
    try {
        //code
        const { id } = req.params;
        // console.log(id)
        const { title, description, price, quantity, categoryId, images } =
            req.body;
        await prisma.image.deleteMany({
            where: {
                productId: Number(id),
            },
        });

        const product = await prisma.product.update({
            where: {
                id: Number(id),
            },
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url,
                    })),
                },
            },
        });
        console.log("อยู่นี้นะเว้ย", product);
        res.send("update product success");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.remove = async (req, res) => {
    try {
        //code
        const { id } = req.params;
        // ลบรูปในคาว มันยาก เดี๋ยวเวะมา
        const product = await prisma.product.findFirst({
            where: { id: Number(id) },
            include: { images: true },
        });
        if (!product)
            return res.status(400).json({ message: "Product not found" });
        console.log(product);

        const deleteImages = product.images.map(
            (item) =>
                new Promise((resolve, reject) => {
                    //ลบรูปในคาว
                    cloudinary.uploader.destroy(item.public_id, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    
                    });
                })
        )
        await Promise.all(deleteImages);
        await prisma.product.delete({
            where:{
                id: Number(id)
            }
        })
        // console.log(id)
        res.send("Delete Success");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.listBy = async (req, res) => {
    try {
        //code
        const { sort, order, limit } = req.body;
        console.log(sort, order, limit);
        const products = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: { category: true },
        });
        res.send(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

const hashdleCategory = async (req, res, categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map((id) => Number(id)),
                },
            },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Search Error" });
    }
};
const hashdlePrice = async (req, res, priceRange) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: priceRange[0],
                    lte: priceRange[1],
                },
            },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Search Error" });
    }
};
const hashdleQuery = async (req, res, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query,
                },
            },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Search Error" });
    }
};

exports.search = async (req, res) => {
    try {
        //code
        const { query, category, price } = req.body;

        if (query) {
            console.log("query-->", query);
            await hashdleQuery(req, res, query);
        }
        if (category) {
            console.log("category-->", category);
            await hashdleCategory(req, res, category);
        }
        if (price) {
            console.log("price-->", price);
            await hashdlePrice(req, res, price);
        }
        // res.send('hi search product')
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

// module.exports = cloudinary;

exports.createImages = async (req, res) => {
    try {
        //code
        // console.log(req.body)
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `Uzrac-${Date.now()}`,
            resource_type: "auto",
            folder: "Ecom2025",
        });
        res.send(result);
        // res.send('hi create images')
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.removeImages = async (req, res) => {
    try {
        //code
        const { public_id } = req.body;
        console.log(public_id);
        cloudinary.uploader.destroy(public_id, (result) => {
            res.status(200).json({ message: "Remove Success" });
        });

        // res.send('hi remove images')
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};
