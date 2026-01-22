const gameConfigRouter = require("express").Router();
const GameConfigController = require("../controllers/gameConfigController");

gameConfigRouter.get('/v1/all', GameConfigController.ConfigsAll);

gameConfigRouter.get('/v1/key/:key', GameConfigController.ConfigByName);

module.exports = gameConfigRouter;