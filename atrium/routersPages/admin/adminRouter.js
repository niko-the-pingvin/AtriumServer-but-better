const adminRouter = require("express").Router();
const mongoose = require("mongoose");
const ValidateTokenAdmin = require("../../middleware/ValidateTokenAdmin");

adminRouter.get('/login', (req, res) => {
    res.render('admin/login', {
        errorMessage: req.query.failed
    });
});

adminRouter.get('/initSettings', (req, res) => {
   res.render('admin/initSettings');
});

adminRouter.use(ValidateTokenAdmin);

adminRouter.get('/databaseInfo', (req, res) => {
    res.render('admin/databaseInfo', {
        dbName: mongoose.connection.name,
        models: mongoose.connection.modelNames(),
        version: mongoose.version,
    });
});

module.exports = adminRouter;