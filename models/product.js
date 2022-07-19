const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    detail: { type: String, required: true },
    img: { type: String, required: true },
    left: { type: Number, required: true },
    bottom: { type: Number, required: true },
    price: { type: Number },
    ambient: { type: mongoose.Types.ObjectId, ref: 'ambient' },
    rating: { type: Array },
    reviews: [{
        userId: { type: mongoose.Types.ObjectId, ref: 'user' },
        review: { type: String },
        file: { type: String },
        rating: {type: Number}
    }],
    size: { type: String },
    hashtags: { type: Array }
})

const Product = mongoose.model('product', productSchema)
module.exports = Product