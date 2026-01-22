const pagesRouter = require("express").Router();
const generalTools = require("../generalTools");

pagesRouter.get('/favicon.ico', (req, res) => {
    res.sendFile(generalTools.CdnDir + "web/img/favicon.ico");
});

pagesRouter.get('/', (req, res) => {
    res.render('site/index');
});

pagesRouter.get('/login', (req, res) => {
    res.render('site/login', {
        errorMessage: req.query.failed
    });
});

pagesRouter.get('/devlogs', (req, res) => {
    res.render('site/devlogs');
});

module.exports = pagesRouter;