const authRouter = require("express").Router();
const authController = require("../controllers/authController");
const ValidateToken = require("../middleware/ValidateToken");

authRouter.get('/', (req, res) => {
    res.sendStatus(200);
});

authRouter.post('/v1/login', authController.AccountLogin);

authRouter.post('/v1/token/refresh', authController.RefreshToken);

authRouter.get('/cachedLogins/:platform/:platformId', authController.CachedLoginsPlatformId);

authRouter.use(ValidateToken);

authRouter.get('/session', authController.AuthSession);

module.exports = authRouter;