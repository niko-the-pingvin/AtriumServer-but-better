const generalTools = require("../generalTools");

const invalidPage = (req, res) => {
    if(req.url.includes("/cdn/"))
        return res.status(404).sendFile(generalTools.CdnDir + "web/img/comicon.png");
    else if(req.url.includes("/api/"))
        return res.status(404).json({"message": "API not found."});
    else
        return res.redirect('/');
}

module.exports = invalidPage;