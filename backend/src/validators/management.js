const { celebrate, Segments, Joi } = require('celebrate')
const { cnpj } = require('cpf-cnpj-validator');

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      condominiumId: Joi.number().required(),
      managerId: Joi.number().required(),
    })
  })
}