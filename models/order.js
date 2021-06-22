import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema
const orderSchema = new mongoose.Schema({
    id_customer: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    consignee: {
        type: String,
        trim: true,
        maxLength: 32,
        required: true
    },
    address: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true
    },
    phone: {
        type: Number,
        trim: true,
        maxLength: 11,
        required: true
    },
    subtotal: {
        type: Number,
        trim: true,
        required: true
    }

}, { timestamps: true })
module.exports = mongoose.model('Order', orderSchema);