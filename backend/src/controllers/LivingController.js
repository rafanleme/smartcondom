const Member = require("../models/Member");
const Condominium = require("../models/Condominium");
const Management = require("../models/Management");
const Manager = require("../models/Manager");
const Living = require("../models/Living");

module.exports = {
  async store(req, res) {
    //converter o token e recuperar o created_manager_id logado
    const token = req.headers.authorization;
    const [Bearer, memberId] = token.split(" ");

    const { ticket } = req.params;
    const { apartment_block, apartment_number } = req.body;

    try {
      const member = await Member.findByPk(memberId);

      if (!member) return res.status(404).json({ error: "Member not found" });

      let condominium = await Condominium.findOne({
        where: { ticket }
      });

      if (!condominium)
        return res.status(400).json({ error: "Condominium not found, verify the ticket" });

      let living = await Living.findOne({
        where: { apartment_block, apartment_number },
      });

      if (living)
        return res.status(400).send({ error: 'there is already a resident in this block and apartment' })

      living = await Living.findOne({
        where: { member_id: memberId, condominium_id: condominium.id },
      });

      if (living)
        return res.status(400).send({ error: 'you already live in this condominium' })


      living = await condominium.addMember(member, {
        through: {
          apartment_block,
          apartment_number,
        }
      });

      return res.status(204).json();
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },

  async update(req, res) {
    //converter o token e recuperar o created_manager_id logado
    const token = req.headers.authorization;
    const [Bearer, managerId] = token.split(" ");

    const { condominiumId, memberId } = req.params

    const { aproved } = req.body

    try {
      const management = await Management.findOne({
        where: {
          manager_id: managerId,
          condominium_id: condominiumId,
          active: true
        }
      })

      if (!management)
        return res.status(401).send({ error: 'not authorized for this condominium' })

      const living = await Living.findOne({
        where: {
          member_id: memberId,
          condominium_id: condominiumId
        }
      })

      if (!living)
        return res.status(404).send({ error: 'request not found' })

      if (living.aproved)
        return res.status(400).send({ error: 'the request is already aproved' })

      living.aproved = aproved;
      living.aproved_manager_id = managerId;
      living.aproved_date = Date();

      await living.save()

      return res.status(204).send()

    } catch (e) {
      console.log(e)
    }

  }

};
