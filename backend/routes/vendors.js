const express = require('express');
const Vendor = require('../models/Vendor');
const router = express.Router();

router.get('/', async (req, res) => {
    const vendors = await Vendor.find({});
    res.json(vendors);
});

router.post('/', async (req, res) => {
    const { name, contact, address } = req.body;
    const vendor = await Vendor.create({ name, contact, address });
    res.status(201).json(vendor);
});

router.put('/:id', async (req, res) => {
    const { name, contact, address } = req.body;
    const vendor = await Vendor.findById(req.params.id);
    if (vendor) {
        vendor.name = name || vendor.name;
        vendor.contact = contact || vendor.contact;
        vendor.address = address || vendor.address;
        const updatedVendor = await vendor.save();
        res.json(updatedVendor);
    } else {
        res.status(404).json({ message: 'Vendor not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    if (vendor) {
        await vendor.deleteOne();
        res.json({ message: 'Vendor removed' });
    } else {
        res.status(404).json({ message: 'Vendor not found' });
    }
});

module.exports = router;
