const express = require("express");

const managerValidator = require("./validators/manager");
const memberValidator = require("./validators/member");
const condominiumValidator = require("./validators/condominium");

const ManagerController = require("./controllers/ManagerController");
const ManagementController = require("./controllers/ManagementController");
const MemberController = require("./controllers/MemberController");
const CondominiumController = require("./controllers/CondominiumController");
const routes = express.Router();

//public routes
routes.post("/managers", managerValidator.create, ManagerController.store);
routes.post("/members", memberValidator.create, MemberController.store);

//private routes rules=manager
routes.get('/condominiums', CondominiumController.index)
routes.post('/condominiums/:condominiumId/managers/:managerId', ManagementController.store)
routes.post(
  "/condominiums",
  condominiumValidator.create,
  CondominiumController.store
);

module.exports = routes;
