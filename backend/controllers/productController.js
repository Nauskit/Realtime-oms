const Product = require('../models/product');


exports.createProduct = async (req, res) => {
    const { productName, description, price, stock, imageUrl } = req.body;

    if (!productName || !description || !price || !stock || !imageUrl) {
        return res.status(400).json({ message: "All fields are required!!" })
    }

    try {
        const newProduct = new Product({
            productName,
            description,
            price,
            stock,
            imageUrl
        })

        await newProduct.save();

        return res.status(201).json({ message: "Order created successfully", order: newProduct })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Failed", error: err.message });
    }
}



exports.getAllProduct = async (req, res) => {
    try {
        const getProduct = await Product.find();
        res.json(getProduct);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Sever Error : ", error: err.message })
    }
}

exports.updateProduct = async (req, res) => {

}