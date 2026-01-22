const authAdminRouter = require("express").Router();
const authController = require("../../controllers/admin/authControllerAdmin");
const ValidateTokenAdmin = require("../../middleware/ValidateTokenAdmin");

authAdminRouter.get('/', (req, res) => {
    res.sendStatus(200);
});

authAdminRouter.post('/v1/login', authController.AccountLogin);

//authAdminRouter.post('/v1/token/refresh', authController.RefreshToken);

authAdminRouter.use(ValidateTokenAdmin);

authAdminRouter.get('/session', authController.AuthSession);

module.exports = authAdminRouter;