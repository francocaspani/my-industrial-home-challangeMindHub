const Product = require('../models/product')

const productControllers = {
    getProducts: async (req, res) => {
        let products
        let error = null
        try {
            products = await Product.find()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { products },
            success: error ? false : true,
            error: error
        })
    },
    getOneProduct: async (req, res) => {
        const id = req.params.id
        let product
        let error = null
        try {
            product = await Product.findOne({ _id: id })
                // .populate('ambient').populate('review.userId', { firstName: 1, lastName: 1, avatar: 1 })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { product },
            success: error ? false : true,
            error: error
        })
    },
    addProduct: async (req, res) => {
        const { name, detail, img, price, size, hashtags, stock } = req.body
        let product
        let error = null
        try {
            product = await new Product({
                name,
                detail,
                img,
                price,
                size,
                hashtags,
                stock
            }).save()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { product },
            success: error ? false : true,
            error: error
        })
    },
    modifyProduct: async (req, res) => {
        const id = req.params.id
        const product = req.body
        let productdb
        let error = null
        try {
            productdb = await Product.findOneAndUpdate({ _id: id }, product, { new: true })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { productdb },
            success: error ? false : true,
            error: error
        })
    },
    removeProduct: async (req, res) => {
        const id = req.params.id
        let product
        let error = null
        try {
            product = await Product.findOneAndDelete({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { product },
            success: error ? false : true,
            error: error
        })
    },
    readProduct: async (req, res) => {
        const id = req.params.id
        let products
        let error = null
        try {
            products = await Product.find({ ambient: id })
                .populate('ambient')
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { products },
            success: error ? false : true,
            error: console.log(error)
        })
    },
    // handleLikes: async (req, res) => {
    //     const idUser = req.user.id
    //     const idItinerary = req.params.id
    //     let itinerary
    //     try {
    //         itinerary = await Product.find({ _id: idItinerary })
    //         itinerary = itinerary[0]
    //         if (itinerary.likes.length > 0) {
    //             if (itinerary.likes.indexOf(idUser) === -1) {
    //                 itinerary.likes.push(idUser)
    //                 await itinerary.save()
    //                 res.json({
    //                     response: { itinerary },
    //                     success: true,
    //                     message: 'Added to favourites'
    //                 })
    //             } else {
    //                 const index = itinerary.likes.indexOf(idUser)
    //                 itinerary.likes.splice(index, 1)
    //                 await itinerary.save()
    //                 res.json({
    //                     response: { itinerary },
    //                     success: true,
    //                     message: 'Removed from favourites'
    //                 })
    //             }
    //         } else {
    //             itinerary.likes.push(idUser)
    //             await itinerary.save()
    //             res.json({
    //                 response: { itinerary },
    //                 success: true,
    //                 message: 'Added to favourites'
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         res.json({
    //             response: 'Error',
    //             success: false,
    //             message: 'Something went wrogn, please try again'
    //         })
    //     }

    // }
}


module.exports = productControllers