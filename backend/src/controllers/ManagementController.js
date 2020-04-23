const Manager = require("../models/Manager");
const Condominium = require("../models/Condominium");
const Management = require("../models/Management");

module.exports = {
  async store(req, res) {
    //converter o token e recuperar o created_manager_id logado
    const token = req.headers.authorization;
    const [Bearer, principalManagerId] = token.split(" ");

    const { condominiumId, managerId } = req.params;

    try {
      let management = await Management.findOne({
        where: { manager_id: principalManagerId, condominium_id: condominiumId },
      });

      if (!management || !management.principal)
        return res.status(401).send({ error: 'unauthorized to this condominium' })

      const manager = await Manager.findByPk(managerId);

      if (!manager) return res.status(404).json({ error: "Manager not found" });

      let condominium = await Condominium.findByPk(condominiumId);

      if (!condominium)
        return res.status(400).json({ error: "Manager not found" });

      management = await condominium.addManager(manager, {
        through: { created_manager_id: principalManagerId }
      });

      return res.status(204).json();
    } catch (e) {
      console.log(e);
      // res.status(500).send(e);
    }
  },

  async update(req, res) {
    //converter o token e recuperar o created_manager_id logado
    const token = req.headers.authorization;
    const [Bearer, principalManagerId] = token.split(" ");

    const { condominiumId, managerId } = req.params;

    try {
      let management = await Management.findOne({
        where: { manager_id: principalManagerId, condominium_id: condominiumId },
      });

      if (!management || !management.principal)
        return res.status(401).send({ error: 'unauthorized to this condominium' })

      management = await Management.findOne({
        where: { manager_id: managerId, condominium_id: condominiumId },
      })

      if(!management)
        return res.status(404).send({error: 'manager not found in this condominium'})

      if(!management.active)
        return res.status(400).send({error: 'manager already inactive'})

      management.active = false
      await management.save()

      res.status(204).send();
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
};
