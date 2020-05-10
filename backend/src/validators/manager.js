const { celebrate, Segments, Joi } = require("celebrate");
const { cpf } = require("cpf-cnpj-validator");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      cpf: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!cpf.isValid(value)) throw new Error("invalid cpf");

          return value;
        }, "cpf validation"),
      cellphone: Joi.string().required().min(12).max(13),
      password: Joi.string().required().min(6),
    }),
  }),
};
