const bcrypt = require("bcryptjs");

const Manager = require("../models/Manager");

module.exports = {
  async store(req, res) {
    const { name, cpf, email, cellphone, password } = req.body;

    let manager = await Manager.findOne({ where: { cpf: cpf } });

    if (manager) return res.status(400).json({ error: "cpf already exists" });

    manager = await Manager.findOne({ where: { email: email } });

    if (manager) return res.status(400).json({ error: "email already exists" });

    const cryptPassword = await bcrypt.hash(password, 10);

    manager = await Manager.create({
      name,
      cpf,
      email,
      cellphone,
      password: cryptPassword,
    });

    manager = manager.dataValues;

    delete manager.password;

    return res.status(201).send(manager);
  },
};
