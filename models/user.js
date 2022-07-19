const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String},
    email:{type:String, required:true},
    password:[{type:String, required:true}],
    avatar:{type:String, required:true},
    country:{type:String, required:true},
    from:{type:Array},
    uniqueString: {type:String, required:true},
    verification: {type:Boolean, required:true},
    favourite: [{ type: mongoose.Types.ObjectId, ref: 'product' }],
    cart: [{ type: mongoose.Types.ObjectId, ref: 'product' }]
})

const User = mongoose.model('user', userSchema)
module.exports = User