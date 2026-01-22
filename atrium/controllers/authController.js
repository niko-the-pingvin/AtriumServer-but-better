const jwt = require('jsonwebtoken');
const BcryptHelper = require('../helpers/bcryptHelper');
const dbCollection = require('../helpers/dbCollection');

const AccountLogin = async (req, res) => {
    if(!req.body) return res.status(400).json({ "message": "Please input the required fields" });
    const { username, password, callback } = req.body;

    const user = await dbCollection.GetUserByUsername(username);
    if(callback && !user) return res.redirect("/login?failed=Incorrect Username And Password");
    if (!user) return res.status(400).json({ error: 'Incorrect username or password' });

    const correctPassword = await BcryptHelper.CompareString(password, user.private.password);
    if(callback && !correctPassword) return res.redirect("/login?failed=Incorrect Password");
    if(!correctPassword) return res.status(400).json({ error: 'Incorrect password' });

    const AccessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' },
    );

    const RefreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '20m' },
    );

    res.cookie('authToken', AccessToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 1440 // 1000ms = 1 second - 1440 minutes in a day
    });

    res.cookie('refreshToken', RefreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 1440 // 1000ms = 1 second - 1440 minutes in a day
    });

    if(callback) return res.redirect(callback);

    return res.status(200).json({
       "accessToken": AccessToken,
       "refreshToken": RefreshToken,
    });
}

const RefreshToken = async (req, res) => {
    try {
        const authToken = (req.headers['authorization'] || req.headers['Authorization']).split(' ')[1];

        jwt.verify(authToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(401);

            const AccessToken = jwt.sign(
                { _id: decoded._id },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15m'},
            );

            const RefreshToken = jwt.sign(
                { _id: decoded._id },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '20m'},
            );

            res.cookie('authToken', AccessToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 1200 // 1000ms = 1 second - 20 Minutes
            });

            res.cookie('refreshToken', RefreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 345600 // 1000ms = 1 second - 1440 minutes in a day
            });

            return res.status(200).json({
                "accessToken": AccessToken,
                "refreshToken": RefreshToken,
            });
        });
    }
    catch (err){
        return res.sendStatus(500);
    }
}

const AuthSession = async (req, res) => {
    jwt.verify(req.cookies.authToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({"message": "invalid token"});

        const user = await dbCollection.GetUserById(decoded._id);
        if(!user) return res.status(500).json({"message": "Could not find user"});

        res.status(200).json({
            "_id": decoded._id,
            "accessToken": req.cookies.authToken
        });
    });
}

const CachedLoginsPlatformId = async (req, res) => {
    return res.status(200).json({
       platform: 0,
       platformId: "placeholdersteamid",
       "accountId": "placeholderaccountid",
    });
}

module.exports = {
    AccountLogin,
    RefreshToken,
    AuthSession,
    CachedLoginsPlatformId
}