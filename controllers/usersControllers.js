const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendEmail = require('./sendEmail')
const jwt = require('jsonwebtoken')


const usersControllers = {
    signUpUser: async (req, res) => {
        let { firstName, lastName, email, password, country, from } = req.body.userData
        try {
            const userExist = await User.findOne({ email })
            const verification = false
            const uniqueString = crypto.randomBytes(15).toString('hex')
            if (userExist) {
                if (userExist.from.indexOf(from) !== -1) {
                    res.json({
                        success: true,
                        from: from,
                        message: 'You have already an account, please go to log in'
                    })
                } else {
                    const hashPassword = bcryptjs.hashSync(password, 10)
                    userExist.from.push(from)
                    userExist.password.push(hashPassword)
                    userExist.verification = true
                    await userExist.save()
                    res.json({
                        success: true,
                        from: from,
                        message: `Now you can log in with your ${from === 'propietary-signup'? 'email' : from}`
                    })
                }
            } else {
                const hashPassword = bcryptjs.hashSync(password, 10)
                const newUser = await new User({
                    firstName,
                    lastName,
                    email,
                    password: [hashPassword],
                    country,
                    from: [from],
                    verification,
                    uniqueString
                })
                if (from !== 'propietary-signup') {
                    newUser.verification = true
                    await newUser.save()
                    res.json({
                        success: true,
                        from: from,
                        message: 'Account created successfully, now you can log in with your ' + from
                    })
                } else {
                    await newUser.save()
                    await sendEmail(email, uniqueString, firstName)
                    res.json({
                        success: true,
                        from: from,
                        message: 'We have sent to you a verification email, please check your inbox to validate your account'
                    })
                }
            }
        } catch (err) {
            res.json({
                success: false,
                message: 'Something went wrong, please try again.',
                error: console.log(err)
            })
        }
    },
    logInUser: async (req, res) => {
        const { email, password, from } = req.body.loggedUser
        console.log(req.body.loggedUser)
        try {
            const userExist = await User.findOne({ email })
            if (!userExist) {
                res.json({
                    success: false,
                    message: 'There is not account with that email, please Sign Up first'
                })
            } else {
                if (from !== 'propietary-signup') {
                    let matchPassword = userExist.password.filter(pass => bcryptjs.compareSync(password, pass))
                    if (matchPassword.length > 0) {
                        const userData = {
                            id: userExist._id,
                            firstName: userExist.firstName,
                            lastName: userExist.lastName,
                            email: userExist.email,
                            avatar: userExist.avatar,
                            from: from
                        }
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY)
                        res.json({
                            success: true,
                            from: from,
                            response: {token, userData },
                            message: 'Welcome back ' + userData.firstName
                        })
                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: 'There is no account connected with that ' + from + ' account, please Sign Up first'
                        })
                    }
                } else {
                    if (userExist.verification) {
                        let matchPassword = userExist.password.filter(pass => bcryptjs.compareSync(password, pass))
                        console.log(matchPassword.length);
                        if (matchPassword.length > 0) {
                            const userData = {
                                id: userExist._id,
                                firstName: userExist.firstName,
                                lastName: userExist.lastName,
                                email: userExist.email,
                                avatar: userExist.avatar,
                                from: from
                            }
                            const token = jwt.sign({...userData}, process.env.SECRET_KEY)
                            res.json({
                                success: true,
                                from: from,
                                response: {token, userData },
                                message: 'Welcome back ' + userData.firstName
                            })
                        } else {
                            res.json({
                                success: false,
                                from: from,
                                message: 'Your email or password are incorrect.'
                            })
                        }
                    } else {
                        await sendEmail(userExist.email, userExist.uniqueString, userExist.firstName)
                        res.json({
                            success: false,
                            from: from,
                            message: 'Your email has not been verified yet, please get it done in order to continue'
                        })
                    }
                }
            }
        } catch (error) {
            console.log(error)

            res.json({
                success: false,
                message: 'Something went wrong, please try again.'

            })
        }
    },
    getUsers: async (req, res) => {
        let users
        let error = null
        try {
            users = await User.find()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { users },
            success: error ? false : true,
            error: error
        })
    },
    verifyEmail: async (req, res) => {
        const { uniqueString } = req.params
        const user = await User.findOne({ uniqueString: uniqueString })
        if (user) {
            user.verification = true
            await user.save()
            res.redirect('https://mytinerary-caspani.vercel.app/verification')
        }
        else {
            res.json({
                success: false,
                message: `Your email has not been confirmed yet!`
            })
        }
    },
    verifyToken: (req,res) => {
        if (req.user){
            res.json({
                success: true,
                response:{userData:{id: req.user.id, 
                        firstName: req.user.firstName, 
                        lastName: req.user.lastName,
                        email: req.user.email,
                        avatar: req.user.avatar,
                        from:'token'}},
                message:'Welcome back '+ req.user.firstName
            })
        }else {
            res.json({
                success:false,
                message: 'Please log in again'
            })
        }
    },
   handleFavourites: async (req, res) => {
            const idUser = req.user.id
            const idProduct = req.params.id
            let user
            try {
                user = await User.find({ _id: idUser })
                user = user[0]
                if (user.favourite.length > 0) {
                    if (user.favourite.indexOf(idProduct) === -1) {
                        user.favourite.push(idProduct)
                        await user.save()
                        res.json({
                            response: { user },
                            success: true,
                            message: 'Added to favourites'
                        })
                    } else {
                        const index = user.favourite.indexOf(idProduct)
                        user.favourite.splice(index, 1)
                        await user.save()
                        res.json({
                            response: { user },
                            success: true,
                            message: 'Removed from favourites'
                        })
                    }
                } else {
                    user.favourite.push(idProduct)
                    await user.save()
                    res.json({
                        response: { user },
                        success: true,
                        message: 'Added to favourites'
                    })
                }
            } catch (error) {
                console.log(error)
                res.json({
                    response: 'Error',
                    success: false,
                    message: 'Something went wrogn, please try again'
                })
            }
    
        }
}

module.exports = usersControllers