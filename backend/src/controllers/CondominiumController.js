const Manager = require('../models/Manager')
const Condominium = require('../models/Condominium')
const CondominiumAddress = require('../models/CondominiumAddress')

module.exports = {
  async store(req, res) {
    //converter o token e recuperar o manager_id logado
    const token = req.headers.authorization;
    const [Bearer, manager_id] = token.split(" ")

    const { name, cnpj } = req.body;
    const { zipcode, street, number, neighborhood, city, uf } = req.body.address

    try {
      const manager = await Manager.findByPk(manager_id)

      if (!manager)
        return res.status(404).json({ error: "Manager not found" })

      let condominium = await Condominium.findOne({ where: { cnpj: cnpj } })

      if (condominium)
        return res.status(400).json({ error: 'cnpj already exists' })

      let condominiumAdrress = await CondominiumAddress.findOne({ where: { zipcode, street, number } })

      if (condominiumAdrress)
        return res.status(400).json({ error: 'there is already a registered condominium at this address' })

      condominium = await Condominium.create({
        name,
        cnpj,
        manager_id
      })

      condominiumAdrress = await CondominiumAddress.create({
        zipcode,
        street,
        number,
        neighborhood,
        city,
        uf,
        condominium_id: condominium.id
      })

      condominium = { ...condominium.dataValues, address: condominiumAdrress.dataValues }

      res.status(201).json(condominium)
    } catch (e) {
      res.status(500).send({ error: 'internal server error' })
    }
  }
}