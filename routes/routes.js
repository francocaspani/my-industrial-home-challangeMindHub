const Router = require('express').Router();
const validator = require('../config/validator')
const passport = require('../config/passport')

const ambientsControllers = require('../controllers/ambientControllers');
const {getAmbients, addAmbient, removeAmbient, modifyAmbient, readAmbients, getOneAmbient} = ambientsControllers

Router.route('/ambients')
.get(getAmbients)
.post(addAmbient)

Router.route('/ambients/:id')
.delete(removeAmbient)
.put(modifyAmbient)
.get(getOneAmbient)

const productControllers = require('../controllers/productControllers');
const {getProducts, getOneProduct, addProduct, modifyProduct, removeProduct, readProduct, likeAndDislike /*likes*/} = productControllers

Router.route('/products')
.get(getProducts)
.post(addProduct)

Router.route('/products/:id')
.delete(removeProduct)
.put(modifyProduct)
.get(getOneProduct)

Router.route('/productsByAmbient/:id')
.get(readProduct)

Router.route("/likes/:id")
.put(passport.authenticate('jwt', {session: false}),likeAndDislike) //ruta likes

// Router.route('/likes/:id')
// .post(passport.authenticate('jwt',{ session: false}),handleLikes)

const usersControllers = require('../controllers/usersControllers');
const {signUpUser, logInUser, getUsers, verifyEmail, verifyToken} = usersControllers

Router.route('/auth/signup')
.post(validator,signUpUser)

Router.route('/auth/login')
.post(logInUser)

Router.route('/auth/users')
.get(getUsers)

Router.route('/verify/:uniqueString')
.get(verifyEmail)

Router.route('/auth/verifytoken')
.get(passport.authenticate('jwt',{ session: false}), verifyToken)

const reviewsControllers = require('../controllers/reviewsControllers');
const {addReview, modifyReview, deleteReview} = reviewsControllers

Router.route('/product/review')
.post(passport.authenticate('jwt',{ session: false}),addReview)
.put(passport.authenticate('jwt',{ session: false}),modifyReview)

Router.route('/product/review/:id')
.post(passport.authenticate('jwt',{ session: false}),deleteReview)


module.exports = Router