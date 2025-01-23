const { query } = require("express");
const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createImgs = async (req, res) => {
    try {
        const { title, images } = req.body;
        // console.log (title, description, price, quantity,
        // categoryId, images)

        const imgs = await prisma.images.create({
            data: {
                type: type,
                title: title,
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
        res.send(imgs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error create" });
    }
};

exports.listImgs = async (req, res) => {
    try {
        //code
        const { count } = req.params;
        // console.log(typeof count)
        const Imgs = await prisma.images.findMany({
            take: parseInt(count),
            include: {
                images: true,
            },
        });
        res.send(Imgs);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.removeImgs = async (req, res) => {
    try {
        //code
        const { id } = req.params;
        // ลบรูปในคาว มันยาก เดี๋ยวเวะมา
        const Imgs = await prisma.Imgs.findFirst({
            where: { id: Number(id) },
            include: { images: true },
        });
        if (!Imgs)
            return res.status(400).json({ message: "images not found" });
        console.log(Imgs);

        const deleteImages = product.images.map(
            (item) =>
                new Promise((resolve, reject) => {
                    //ลบรูปในคาว
                    cloudinary.uploader.destroy(
                        item.public_id,
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                })
        );
        
        await Promise.all(deleteImages);
        await prisma.Imgs.delete({
            where: {
                id: Number(id),
            },
        });
        // console.log(id)
        res.send("Delete Success");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createClound = async (req, res) => {
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

exports.removeClound = async (req, res) => {
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
