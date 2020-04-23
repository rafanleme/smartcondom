const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      ticket: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      apartment_block: Joi.string(),
      apartment_number: Joi.string().required(),
    })
  }),

  update: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      condominiumId: Joi.number().required(),
      memberId: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      aproved: Joi.boolean().required()
    })
  })

}