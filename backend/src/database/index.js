const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Manager = require('../models/Manager')
const Member = require('../models/Member')
const Condominium = require('../models/Condominium')
const CondominiumAddress = require('../models/CondominiumAddress')

const connection = new Sequelize(dbConfig)

Manager.init(connection)
Member.init(connection)
Condominium.init(connection)
Condominium.associate(connection.models)
CondominiumAddress.init(connection)
CondominiumAddress.associate(connection.models)

module.exports = connection