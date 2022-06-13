import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string()
    .email()
    .min(5)
    .max(50)
    .required(), 
    password:Joi.string().min(8).required(),
    mobileno:Joi.string().min(10).max(10).required()

  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
