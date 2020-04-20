const Manager = require('../models/Manager')

module.exports = {
  async store(req, res) {
    const { name, cpf, email, celular } = req.body

    let manager = await Manager.findOne({ where: { cpf: cpf } })

    if (manager)
      return res.status(400).json({ error: 'cpf already exists' })

    manager = await Manager.findOne({ where: { email: email } })

    if (manager)
      return res.status(400).json({ error: 'email already exists' })

    manager = await Manager.create({ name, cpf, email, celular })

    return res.send(manager)
  }
}