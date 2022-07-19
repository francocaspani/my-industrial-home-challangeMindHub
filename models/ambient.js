const mongoose = require('mongoose')

const ambientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true  },
    idProduct: [{ type: mongoose.Types.ObjectId, ref: 'product' }]
})

const Ambient = mongoose.model('ambient', ambientSchema)
module.exports = Ambient