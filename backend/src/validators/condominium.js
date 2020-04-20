const { celebrate, Segments, Joi } = require('celebrate')
const { cnpj } = require('cpf-cnpj-validator');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      cnpj: Joi.string().required().length(14).custom((value, helpers) => {
        if (!cnpj.isValid(value))
          throw new Error('invalid cnpj')

        return value
      }, "cpf validation"),
      address: Joi.object().keys({
        zipcode: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.number().required(),
        neighborhood:  Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
      })
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  })
}