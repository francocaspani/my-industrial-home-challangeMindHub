const Product = require('../models/product')
const crypto = require('crypto')
const path = require('path')


const reviewsControllers = {

    addReview: async (req, res) => {
        const idProduct = req.body.idProduct
        const review = req.body.review
        const rating = req.body.rating
        const titleReview = req.body.titleReview
        const user = req.user.id
        const { file } = req.files
        try {
            const fileName = crypto.randomBytes(10).toString('hex') + '.' + file.name.split('.')[file.name.split('.').length - 1]
            const ruta = path.resolve('image/reviews', fileName)
            file.mv(ruta, err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('file uploaded')
                }
            })
            const newReview = await Product.findOneAndUpdate({ _id: idProduct }, { $push: { reviews: { review: review, userId: user, date: Date.now(), rating: rating, titleReview: titleReview, img: 'http://localhost:4000/' + fileName } } }, { new: true })
            res.json({
                success: true,
                response: { newReview },
                message: 'Review posted successfully'
            })
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: 'Something went wrong, please try again'
            })
        }
    },
    modifyReview: async (req, res) => {
        const { reviewId, review, titleReview, rating } = req.body.review        
        
        try {
            const updatedReview = await Product.findOneAndUpdate({ "reviews._id": reviewId }, { $set: { "reviews.$.review": review, "review.$.date": Date.now(), "reviews.$.titleReview": titleReview, "reviews.$.rating": rating } }, { new: true })
            console.log(updatedReview)
            res.json({
                success: true,
                response: { updatedReview },
                message: 'Review modified successfully'
            })
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: 'Something went wrong, please try again'
            })
        }
    },
    deleteReview: async (req, res) => {
        const reviewId = req.params.id
        try {
            const deletedReview = await Product.findOneAndUpdate({ 'reviews._id': reviewId }, { $pull: { reviews: { _id: reviewId } } }, { new: true })
            res.json({
                success: true,
                response: { deletedReview },
                message: 'Comment deleted successfully'
            })
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                message: 'Something went wrong, please try again'
            })
        }
    }
}

module.exports = reviewsControllers