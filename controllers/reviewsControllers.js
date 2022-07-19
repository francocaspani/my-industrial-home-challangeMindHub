const Product = require('../models/product')

const reviewsControllers = {

    addReview: async (req, res) => {
        const { idProduct, review, rating } = req.body.review
        const user = req.user.id
        try {
            const newReview = await Product.findOneAndUpdate({ _id: idProduct }, { $push: { reviews: { review: review, userId: user, date: Date.now(), rating: rating } } }, { new: true })
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
        const { reviewId, review, rating } = req.body.review
            try {
                updatedReview = await Product.findOneAndUpdate({ "reviews._id": reviewId }, { $set: { "reviews.$.review": review, "review.$.date": Date.now(), "reviews.$.rating": rating } }, { new: true })
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