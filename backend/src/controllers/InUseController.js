const Manager = require("../models/Manager");
const Member = require("../models/Member");
const CondominiumAddress = require("../models/CondominiumAddress");
const { v4: uuid } = require("uuid");

module.exports = {
  async index(req, res) {
    const { field, data } = req.params;

    let find = await Manager.findOne({
      where: {
        [field]: data,
      },
    });

    if (find) return res.status(200).send({ inUse: true });

    find = await Member.findOne({
      where: {
        [field]: data,
      },
    });

    if (find) return res.status(200).send({ inUse: true });

    res.status(200).send({ inUse: false });
  },
};
