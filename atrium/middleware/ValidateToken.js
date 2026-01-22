const jwt = require("jsonwebtoken");
const dbCollection = require("../helpers/dbCollection");

const ValidateToken = async (req, res, next) => {
    try{
        let accessToken = req.headers['authorization'] || req.headers['Authorization'] || "Bearer " + req.cookies.authToken;
        if (!accessToken) return res.status(401).json({"message": "No token provided"});
        accessToken = accessToken.split(' ')[1];

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({"message": "invalid token"});

            const user = await dbCollection.GetUserById(decoded._id);
            if(!user) return res.status(500).json({"message": "Could not find user"});
            req.decodedUser = user;

            next();
        });
    }
    catch (err) {
        res.sendStatus(500);
    }
}

module.exports = ValidateToken;