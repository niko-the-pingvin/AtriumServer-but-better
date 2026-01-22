const jwt = require("jsonwebtoken");
const dbCollection = require("../helpers/dbCollection");

const ValidateTokenAdmin = async (req, res, next) => {
    try{
        let accessToken = req.headers['authorization'] || req.headers['Authorization'] || "Bearer " + req.cookies.authTokenAd;
        if (!accessToken) return res.status(401).json({"message": "No token provided"});
        accessToken = accessToken.split(' ')[1];

        jwt.verify(accessToken, process.env.ADMIN_TOKEN_SECRET, async (err, decoded) => {
            if(err && req.methodUrl.includes("admin") && !req.methodUrl.includes("api")) return res.redirect("/admin/login");
            if (err) return res.status(401).json({"message": "invalid token"});

            const user = await dbCollection.GetUserById(decoded._id);
            if(!user) return res.status(500).json({"message": "Could not find user"});
            req.decodedUser = user;

            if(user.private.roles.indexOf("admin") !== -1) return next();
            else return res.sendStatus(401);
        });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(418);
    }
}

module.exports = ValidateTokenAdmin;