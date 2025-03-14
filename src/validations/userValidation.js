const Joi = require("joi");

const userSchema = Joi.object({
  fname: Joi.string().min(3).max(30).optional().default(null),
  lname: Joi.string().min(3).max(30).optional().default(null),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(5).optional().default(null),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).+$"))
    .required()
    .messages({
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one special character.",
    }),
  re_password: Joi.ref("password"),
  age: Joi.number().integer().min(18).required(),
  env: Joi.string().valid("DEV", "QA").required(),
});

exports.validateSignup = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { allowUnknown: false }); // Ensure only defined keys are allowed
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};


//  Validation for Login
const loginSchema = Joi.object({
 email: Joi.string().email().required(),
  password: Joi.string().required(),
  env: Joi.string().valid("DEV", "QA").required(),
});

exports.validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

//  Validation for Updating User
const updateUserSchema = Joi.object({
  fname: Joi.string().min(3).max(30).optional().required(),
  lname: Joi.string().min(3).max(30).optional().required(),
  address: Joi.string().min(5).optional().required(),
  age: Joi.number().integer().min(18).optional().required()
});

exports.validateUpdateUser = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).+$"))
      .required()
      .messages({
        "string.pattern.base": "New password must contain at least one uppercase letter, one lowercase letter, and one special character."
      }),
    rePassword: Joi.ref("newPassword")
  });
  
  exports.validateUpdatePassword = (req, res, next) => {
    const { error } = updatePasswordSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
  };


  exports.validateGetUserById = (req, res, next) => {

    next();
  };
  exports.validateGetAllUsers = (req, res, next) => {
    next(); 
  };
  
  
  
  exports.validateDeleteUser = (req, res, next) => {
    next();
  };
