const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
