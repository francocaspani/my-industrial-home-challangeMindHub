const joi = require('joi')

const validator = (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().max(20).min(3).trim().pattern(/(?=.*[A-Z])(?=.*[a-z])/).required().messages({
            'string.min': 'Name must have at least 3 characters.',
            'string.max': "Name must not exceed 20 characters.",
            'string.pattern.base': "Please use an uppercase on your name."
        }),
        email: joi.string().email({ minDomainSegments: 2 }).required().messages({
            'string.email': 'Email address not correct.'
        }),
        password: joi.string().max(30).min(6).pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/).required().messages({
            "string.pattern.base": "Your password must include an uppercase, a lowercase, and a number.",
            "string.min": "The password must include at least 6 alphanumeric characters.",
            "string.max": "The password must not exceed 30 alphanumeric characters."
        }),
        from: joi.string(),
        country: joi.string(),
        lastName: joi.any(),
        avatar: joi.string(),
        isAdmin: joi.boolean()
    })

    const validation = schema.validate(req.body.userData, { abortEarly: false })

    if (validation.error) {

        return res.json({
            success: false,
            from: "validator",
            message: validation.error.details,
            error: console.log(validation.error.details)
        })
    }
    next()
}

module.exports = validator