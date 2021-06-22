import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    photo: {
        data: Buffer,
        contentType: String,
        // type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        required: false,
        type: Boolean
    },
    feature: {
        type: Number,
        required: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true }
)
module.exports = mongoose.model("Product", productSchema);