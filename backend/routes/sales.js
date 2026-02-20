const express = require('express');
const SalesOrder = require('../models/SalesOrder');
const Product = require('../models/Product');
const router = express.Router();

// Create sales order and decrease stock
router.post('/', async (req, res) => {
    const { product: productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
    }

    const total_amount = product.price * quantity;
    const salesOrder = await SalesOrder.create({ product: productId, quantity, total_amount });

    // Decrease stock
    product.quantity -= Number(quantity);
    await product.save();

    res.status(201).json(salesOrder);
});

router.get('/', async (req, res) => {
    const orders = await SalesOrder.find({}).populate('product', 'name price');
    res.json(orders);
});

module.exports = router;
