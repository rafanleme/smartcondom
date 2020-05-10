const bcrypt = require("bcryptjs");

const Member = require("../models/Member");

module.exports = {
  async store(req, res) {
    const { name, cpf, email, cellphone, password } = req.body;

    try {
      let member = await Member.findOne({ where: { cpf: cpf } });

      if (member) return res.status(400).json({ error: "cpf already exists" });

      if (email) member = await Member.findOne({ where: { email: email } });

      if (member)
        return res.status(400).json({ error: "email already exists" });

      const cryptPassword = await bcrypt.hash(password, 10);

      member = await Member.create({
        name,
        cpf,
        email,
        cellphone,
        password: cryptPassword,
      });

      member = member.dataValues;

      delete member.password;

      return res.status(201).send(member);
    } catch (e) {
      console.log(e);
    }
  },
};
