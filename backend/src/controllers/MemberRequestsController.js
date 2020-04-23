const Member = require("../models/Member");
const Management = require("../models/Management");
const Condominium = require("../models/Condominium");
const Living = require("../models/Living");

module.exports = {
  async index(req, res) {
    //converter o token e recuperar o created_manager_id logado
    const token = req.headers.authorization;
    const [Bearer, managerId] = token.split(" ");

    const { condominiumId } = req.params

    try {
      const management = await Management.findOne({
        where: { manager_id: managerId, condominium_id: condominiumId, active: true }
      })

      if (!management)
        return res.status(401).send({ error: 'not authorized for this condominium' })

      const condominium = await Condominium.findOne({
        include: [{
          model: Member, as: 'members', 
          attributes: ['id', 'name', 'profile_picture'],
          through: {
            model: Living,
            as: 'livings',
            attributes: ['apartment_block', 'apartment_number', 'createdAt'],
            where: { aproved: false }
          }
        }]
      })

      let members = condominium.get().members;

      return res.send(members)
    } catch (e) {
      console.log(e);
    }



  }
};
