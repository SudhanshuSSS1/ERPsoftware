const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Get single product
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
});

// Add product
router.post('/', async (req, res) => {
    const { name, price, quantity } = req.body;
    const product = await Product.create({ name, price, quantity });
    res.status(201).json(product);
});

// Update product
router.put('/:id', async (req, res) => {
    const { name, price, quantity } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.quantity = quantity !== undefined ? quantity : product.quantity;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;
