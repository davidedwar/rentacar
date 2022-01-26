const { check, validationResult } = require('express-validator/check');

exports.AddItemValidator = (req, res, next) => {
    check('Name', 'please add name').not().isEmpty();
    check('Price', 'please add price').not().isEmpty();
    check('Description', 'Length should be greater than 50 and less that 150').isLength({
        min: 50, max: 150
    });

    const errors = validationResult()
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({ error: firstError });
    }
    next();
};
