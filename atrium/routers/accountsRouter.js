const accountsRouter = require("express").Router();
const accountsController = require("../controllers/accountsController");
const ValidateToken = require("../middleware/ValidateToken");
const ValidateTokenUserRole = require("../middleware/ValidateTokenUserRoles");

accountsRouter.get('/', (req, res) => {
    res.sendStatus(200);
});

//MAKE THIS WORKRRKRKRKRK AYAYQWHEOIRJTHROYKJTR
accountsRouter.get('/register', accountsController.GetUserById);

accountsRouter.get('/id/:id', accountsController.GetUserById);

accountsRouter.get('/bulk/ids', accountsController.GetUserBulk);

accountsRouter.get('/username/:username', accountsController.GetUserByUsername);

accountsRouter.get('/search/username', accountsController.SearchUsers);

accountsRouter.use(ValidateToken);

accountsRouter.get('/id/:id/permissions', accountsController.GetUserByIdPermissions);

accountsRouter.get('/me', accountsController.GetUserByMe);

accountsRouter.put('/me/set/password', accountsController.UserMeSetPassword);

accountsRouter.put('/me/set/username', accountsController.UserMeSetUsername);

accountsRouter.put('/me/set/displayname', accountsController.UserMeSetDisplayName);

module.exports = accountsRouter;