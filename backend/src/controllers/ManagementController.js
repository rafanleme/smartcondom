const Manager = require("../models/Manager");
const Condominium = require("../models/Condominium");
const Management = require("../models/Management");

module.exports = {
  async store(req, res) {
    //converter o token e recuperar o created_manager_id logado
    const token = req.headers.authorization;
    const [Bearer, createManagerId] = token.split(" ");

    const { condominiumId, managerId } = req.params;

    try {
      const management = await Management.findOne({
        where: { manager_id: createManagerId, condominium_id: condominiumId },
      });

      if(!management)
        res.send(401).send({error: 'unauthorized to this condominium'})

      const manager = await Manager.findByPk(managerId);

      if (!manager) return res.status(404).json({ error: "Manager not found" });

      let condominium = await Condominium.findByPk(condominiumId);

      if (!condominium)
        return res.status(400).json({ error: "Manager not found" });

      management = await condominium.addManager(manager);

      res.status(204).json({ management: management.id });
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
};
