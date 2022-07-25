const Basket = require('../models/basket')
const Product = require('../models/product')

const basketControllers = {

    // getDelivered: async (req,res) => {
    //     let basket
    //     let state = "delivered"
    //     let error = null
    //     const admin = req.user._id
    //     const verifyAdmin = req.user.admin
    //     if (verifyAdmin) {
    //         try {
    //             basket = await Basket.find({buyState:state})
    //                 .populate("idWine", {nameWine:1,type:1,price:1,photo:1})
    //                 .populate("idUser", {email:1,userName:1})
    //         } catch (err) {
    //             error = err
    //             console.log(error)
    //         }
    //         res.json({
    //             response: error ? 'ERROR' : {basket},
    //             success: error ? false:true,
    //             error: error
    //         })
    //     }
    // },

    // getShip: async (req,res) => {
    //     let basket
    //     let state = "toShip"
    //     let error = null
    //     const admin = req.user._id
    //     const verifyAdmin = req.user.admin
    //     if (verifyAdmin) {
    //         try {
    //             basket = await Basket.find({buyState:state})
    //                 .populate("idWine", {nameWine:1,type:1,price:1,photo:1})
    //                 .populate("idUser", {email:1,userName:1})
    //         } catch (err) {
    //             error = err
    //             console.log(error)
    //         }
    //         res.json({
    //             response: error ? 'ERROR' : {basket},
    //             success: error ? false:true,
    //             error: error
    //         })
    //     }
    // },

    // getOld: async (req,res) => {
    //     let basket
    //     let state = "bought"
    //     let error = null
    //         try {
    //             basket = await Basket.find({buyState:state})
    //                 .populate("idWine", {nameWine:1,type:1,price:1,photo:1})
    //                 .populate("idUser", {email:1,userName:1})
    //         } catch (err) {
    //             error = err
    //             console.log(error)
    //         }
    //         res.json({
    //             response: error ? 'ERROR' : {basket},
    //             success: error ? false:true,
    //             error: error
    //         })
    // },
    
    getUserBasket: async (req,res) => {
        let basket
        let userId = req.user.id
        let state = "toBuy"
        let error = null
        try {
            basket = await Basket.find({userId:userId, buyState:state})
                .populate("productId", {name:1, price:1, img:1, stock:1})
                .populate("userId", {email:1, firstName:1})
                //console.log('BASKET BASKET BASKET BASKET BASKET BASKET BASKET BASKET')
                //console.log(basket)
        } catch (err) {
            error = err
            console.log(error)
        }
        res.json({
            response: error ? 'ERROR' : {basket},
            success: error ? false:true,
            error: error
        })
    },

    // getProduct: async (req,res) => {
    //     //console.log(req.params.id)
    //     let product = req.params.id
    //     let idUser = req.user.id
    //     let basket
    //     let error = null
    //     try {
    //         basket = await Basket.find({idUser:idUser,_id:product})
    //             .populate("idWine", {nameWine:1,price:1,photo:1,type:1,variety:1})
    //             .populate("idUser", {email:1,userName:1})
    //             console.log('PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT PRODUCT')
    //             console.log(basket)
    //     } catch (err) {
    //         error = err
    //         console.log(error)
    //     }
    //     res.json({
    //         response: error ? 'ERROR' : {basket},
    //         success: error ? false:true,
    //         error: error
    //     })
    // },
    
    addToBasket: async (req,res) => {
        const {productId, amount} = req.body.product
        const userId = req.user.id
        const date = {booking: new Date()}
        const buyState ="toBuy"

        try {
            const newProduct = await new Basket ({productId,userId,amount,buyState}).save()
            res.json({success: true,
                response: {newProduct},
                message: "Product added successfully"})
                console.log(newProduct)
        }
        catch (error) {
            console.log(error)
            res.json({ success: true,
                message: "We couldn't add the product, please try again!" })
        }
    },

    deleteBasketProduct: async (req,res) => {
        const idProduct = req.params.id
        console.log(idProduct)
        try {
            await Basket.findOneAndDelete({_id:idProduct})
            res.json({success: true,
                message: "Product deleted successfully."})
        }
        catch (error) {
            console.log(error)
            res.json({ success: true,
                message: "We couldn't delete the product, please try again!" })
        }
    },

    modifyBasketProduct: async (req,res) => {
        const {productId,amount} = req.body.toModify
        console.log(amount)
        const user = req.user._id
        try {
            const modifyProductBasket = await Basket.findOneAndUpdate({'_id': productId}, {$set:{ 'amount': amount }}, {new: true})
            res.json({success: true,
                response: {modifyProductBasket},
                message: "Product modified successfully"})
        }
        catch (error) {
            console.log(error)
            res.json({ success: true,
                message: "We couldn't modify the product, please try again!" })
        }
    },

    modifyState: async (req,res) => {
        console.log('REQ BODY REQ BODY REQ BODY REQ BODY REQ BODY')
        console.log(req.body)
        const {sku,buyState} = req.body
        console.log(sku)
        const user = req.user.id
        try {
            const modifyBasket = await Basket
            .findOneAndUpdate({"_id": sku}, {$set:{
                "buyState": buyState}}, {new: true})
                .populate("productId", {stock:1})
                console.log('MODIFYYYYYYYYYYYYYYYYYYYYYYYYYYYY')
                console.log(modifyBasket)
            res.json({success: true,
                response: {modifyBasket},
                message: "done!"})
        }
        catch (error) {
            console.log(error)
            res.json({ success: true,
                message: "We couldn't modify the state producr, please try again!" })
        }
    },

    modifyStock: async (req,res) => {
        console.log('REQ BODY REQ BODY REQ BODY REQ BODY REQ BODY')
        console.log(req.body)
        const sku = req.params.sku
        console.log(sku)
        const user = req.user.id
        try {
            const modifyStock = await Basket.find({"_id": sku}).populate("productId")
            console.log("dsadsadsadsadsa",modifyStock[0].productId)
            const stock = modifyStock[0].productId.stock - modifyStock[0].amount

            const productNewStock = await Product.findOneAndUpdate({"_id":modifyStock[0].productId._id},{$set:{
                "stock": stock}}, {new: true})
            console.log("fran y su logica",modifyStock, productNewStock)
            res.json({success: true,
                response: {modifyStock},
                message: "done!"})
        }
        catch (error) {
            console.log(error)
            res.json({ success: true,
                message: "We couldn't modify the state producr, please try again!" })
        }
    }
}

module.exports = basketControllers