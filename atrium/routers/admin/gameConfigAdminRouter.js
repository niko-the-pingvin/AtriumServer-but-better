const gameConfigAdminRouter = require("express").Router();
const GameConfigController = require("../../controllers/admin/gameConfigControllerAdmin");
const ValidateTokenUserRole = require("../../middleware/ValidateTokenAdmin");

gameConfigAdminRouter.use(ValidateTokenUserRole);

gameConfigAdminRouter.post('/v1/create', GameConfigController.ConfigCreate);

gameConfigAdminRouter.put('/v1/update/:key', GameConfigController.ConfigUpdate);

gameConfigAdminRouter.delete('/v1/delete/:key', GameConfigController.ConfigDelete);

module.exports = gameConfigAdminRouter;