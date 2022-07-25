const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema ({
    productId: {type:mongoose.Types.ObjectId, ref:'product'},
    userId: {type:mongoose.Types.ObjectId, ref:'user'},
    // date: {
    //     booking: {type:Date, required:true},
    //     sold: {type:Date},
    //     send: {type:Date}
    // },
    amount: {type:Number, required:true},
    buyState: {type:String, required:true}
})

const Basket = mongoose.model('basket',basketSchema)
module.exports = Basket