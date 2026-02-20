const express = require('express');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const SalesOrder = require('../models/SalesOrder');
const router = express.Router();

router.get('/summary', async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalSales = await SalesOrder.aggregate([{ $group: { _id: null, total: { $sum: "$total_amount" } } }]);
        const totalPurchases = await Purchase.countDocuments();
        const lowStockItems = await Product.find({ quantity: { $lt: 10 } });

        res.json({
            totalProducts,
            totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
            totalPurchases,
            lowStockCount: lowStockItems.length,
            lowStockItems
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
