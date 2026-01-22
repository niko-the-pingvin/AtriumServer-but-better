const adminAccountsRouter = require("express").Router();

adminAccountsRouter.get('/', (req, res) => {
    res.render('admin/accounts');
});

adminAccountsRouter.get('/create', (req, res) => {
    res.render('admin/accountCreate', {
        errorMessage: req.query.failed
    });
});

adminAccountsRouter.get('/delete', (req, res) => {
    res.render('admin/accountDelete', {
        errorMessage: req.query.failed
    });
});

module.exports = adminAccountsRouter;