const Joi = require("joi");

const sanitizationSchema = Joi.object({
    name: Joi.string().trim().min(1).required().messages({
        "string.empty": "Name is required.",
        "any.required": "Name is required.",
    }),
    email: Joi.string().trim().email().required().messages({
        "string.email": "Invalid email format.",
        "any.required": "Email is required.",
    }),
    age: Joi.number().greater(18).required().messages({
        "number.base": "Age must be a number.",
        "number.greater": "Age must be greater than 18.",
        "any.required": "Age is required.",
    }),
});

exports.validateSanitizedUser = (req, res, next) => {
    const { error } = sanitizationSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
    
    next();
};
