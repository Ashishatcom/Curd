const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
const signup = (req, res, next) => {
     console.log(req.body);
    const validationRule = {
        "firstName": "string",
        "lastName": "string",
        // "email": "required|email",
        "phone": "integer|min:10",
        "password": "required|string|min:8"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = { 
  signup
}