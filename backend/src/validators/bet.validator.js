const Joi = require("joi");

exports.betSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().positive().required()
});
