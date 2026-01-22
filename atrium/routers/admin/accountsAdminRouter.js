const accountsAdminRouter = require("express").Router();
const accountsController = require("../../controllers/admin/accountsControllerAdmin");
const ValidateTokenAdmin = require("../../middleware/ValidateTokenAdmin");

accountsAdminRouter.use(ValidateTokenAdmin);

accountsAdminRouter.get('/', (req, res) => {
    res.sendStatus(200);
});

accountsAdminRouter.get('/id/:id', accountsController.GetUserById);

accountsAdminRouter.post('/create', accountsController.CreateAccount);

accountsAdminRouter.post('/delete', accountsController.DeleteAccount);

accountsAdminRouter.put('/:id/set/password', accountsController.UserIdSetPassword);

accountsAdminRouter.put('/:id/set/username', accountsController.UserIdSetUsername);

accountsAdminRouter.put('/:id/set/displayname', accountsController.UserIdSetDisplayName);

module.exports = accountsAdminRouter;