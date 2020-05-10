const express = require("express");

const managerValidator = require("./validators/manager");
const memberValidator = require("./validators/member");
const managementValidator = require("./validators/management");
const condominiumValidator = require("./validators/condominium");
const livingValidator = require("./validators/living");
const memberRequestValidator = require("./validators/memberRequest");
const inUse = require("./validators/inUse");

const ManagerController = require("./controllers/ManagerController");
const MemberRequestsController = require("./controllers/MemberRequestsController");
const ManagementController = require("./controllers/ManagementController");
const MemberController = require("./controllers/MemberController");
const InUseController = require("./controllers/InUseController");
const CondominiumController = require("./controllers/CondominiumController");
const LivingController = require("./controllers/LivingController");
const routes = express.Router();

//public routes
routes.post("/managers", managerValidator.create, ManagerController.store);
routes.post("/members", memberValidator.create, MemberController.store);
routes.get("/isInUse/:field/:data", inUse.index, InUseController.index);

//private routes rules=manager
routes.get("/condominiums", CondominiumController.index);
routes.get(
  "/condominiums/:condominiumId/requests",
  memberRequestValidator.create,
  MemberRequestsController.index
);
routes.post(
  "/condominiums/:condominiumId/managers/:managerId",
  managementValidator.create,
  ManagementController.store
);
routes.patch(
  "/condominiums/:condominiumId/managers/:managerId",
  managementValidator.create,
  ManagementController.update
);
routes.patch(
  "/condominiums/:condominiumId/members/:memberId",
  livingValidator.update,
  LivingController.update
);
routes.post(
  "/condominiums",
  condominiumValidator.create,
  CondominiumController.store
);

//private routes rules=member
routes.post(
  "/condominiums/:ticket/members",
  livingValidator.create,
  LivingController.store
);

module.exports = routes;
