const express = require('express');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const router = express.Router();

// Create purchase order and increase stock
router.post('/', async (req, res) => {
    const { vendor, product: productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const purchase = await Purchase.create({ vendor, product: productId, quantity });

    // Increase stock
    product.quantity += Number(quantity);
    await product.save();

    res.status(201).json(purchase);
});

router.get('/', async (req, res) => {
    const purchases = await Purchase.find({}).populate('vendor', 'name').populate('product', 'name');
    res.json(purchases);
});

module.exports = router;
