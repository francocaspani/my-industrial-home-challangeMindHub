const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    detail: { type: String, required: true },
    img: { type: String, required: true },
    left: { type: Number },
    bottom: { type: Number },
    price: { type: Number },
    ambient: { type: mongoose.Types.ObjectId, ref: 'ambient' },
    rating: { type: Array },
    reviews: [{
        userId: { type: mongoose.Types.ObjectId, ref: 'user' },
        review: { type: String },
        img: { type: String },
        rating: { type: Number },
        titleReview: { type: String },
        date: {type: Date}
    }],
    size: { type: String },
    hashtags: { type: Array },
    stock: { type: Number },
    extraImg: {type: Array}
})

const Product = mongoose.model('product', productSchema)
module.exports = Product