const jwt = require("jsonwebtoken");
const dbCollection = require("../helpers/dbCollection");

module.exports = (options) => { return async (req, res, next) => {
    try{
        let accessToken = req.headers['authorization'] || req.headers['Authorization'];
        if (!accessToken) return res.status(401).json({"message": "No token provided"});
        accessToken = accessToken.split(' ')[1];

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({"message": "invalid token"});

            const user = await dbCollection.GetUserById(decoded._id);
            if(!user) return res.status(500).json({"message": "Could not find user"});
            req.decodedUser = user;

            if(options.length === 0) return next();

            let allowed = false;
            user.private.roles.forEach((role) => {
                if(options.indexOf(role) !== -1) allowed = true;
            });

            if(allowed) return next();
            else return res.sendStatus(401);
        });
    }
    catch (err) {
        res.sendStatus(500);
    }
}}