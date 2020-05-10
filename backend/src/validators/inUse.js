const { celebrate, Segments, Joi } = require("celebrate");
const { cpf, cnpj } = require("cpf-cnpj-validator");

let field = "";

module.exports = {
  index: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      field: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!["cpf", "email", "cellphone", "cnpj"].includes(value))
            throw new Error("invalid field");

          field = value;
          return value;
        }, "field validation"),
      data: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (field === "cpf" && !cpf.isValid(value))
            throw new Error(`invalid ${field}`);

          if (field === "cnpj" && !cnpj.isValid(value))
            throw new Error(`invalid ${field}`);

          if (field === "cellphone" && value.length != 13)
            throw new Error(`invalid ${field}`);

          return value;
        }, "data validation"),
    }),
  }),
};
