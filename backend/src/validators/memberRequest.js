const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      condominiumId: Joi.number().required(),
    })
  })
}