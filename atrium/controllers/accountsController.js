const mongoose = require("mongoose");
const dbCollection = require('../helpers/dbCollection');
const bcryptHelper = require('../helpers/bcryptHelper');

//Get user info

const GetUserByMe = async (req, res) => {
    const user = req.decodedUser;
    return res.status(200).json({
        "_id": user._id,
        "public": user.public,
        "private": {
            "roles": user.private.roles,
            "email": user.private.email,
        }
    });
}

const GetUserById = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ "message": "Not a valid user Id" });

    const result = await dbCollection.GetUserById(req.params.id, { "private": 0, "__v": 0 });
    if(!result) return res.status(400).json({ "message": "User not found" });

    return res.status(200).json(result);
}

const GetUserByIdPermissions = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ "message": "Not a valid user Id" });

    const result = await dbCollection.GetUserById(req.params.id);
    if(!result) return res.status(400).json({ "message": "User not found" });

    return res.status(200).json(result.private.roles);
}

const GetUserByUsername = async (req, res) => {
    const result = await dbCollection.GetUserByUsername(req.params.username, { "public": 1 });
    if(!result) return res.status(400).json({ "message": "User not found" });

    return res.status(200).json(result);
}

const GetUserBulk = async (req, res) => {
    const result = await dbCollection.GetUserBulk(req.query.id, { "public": 1 });
    if(!result) return res.status(400).json({ "message": "Users not found" });

    return res.status(200).json(result);
}

const SearchUsers = async (req, res) => {
    try{
        const result = await dbCollection.GerUsersBySearch(req.query.q, { "public": 1  });
        if(!result) return res.status(400).json({ "message": "User not found" });

        return res.status(200).json(result);
    }
    catch(err){
        return res.sendStatus(500);
    }
}

// Set user info

const UserMeSetUsername = async (req, res) => {
    const { username } = req.body;

    if(!username) return res.status(400).json({ "message": "Please input the required fields" });

    const user = req.decodedUser;
    if(username === user.public.username) return res.status(400).json({ "message": "Username is already set" });

    const result = await dbCollection.UpdateUserProperty(
        user._id,
        "public.username",
        username
    );

    if(result === null) return res.status(500).json({ "message": "Error updating user" });

    return res.status(200).json({
        "_id": result._id,
        "message": `Changed username from ${user.public.username} to ${username}`,
    });
}

const UserMeSetDisplayName = async (req, res) => {
    const { displayName } = req.body;

    if(!displayName) return res.status(400).json({ "message": "Please input the required fields" });

    const user = req.decodedUser;
    if(displayName === user.public.displayName) return res.status(400).json({ "message": "DisplayName is already set" });

    const result = await dbCollection.UpdateUserProperty(
        user._id,
        "public.displayName",
        displayName
    );

    if(result === null) return res.status(500).json({ "message": "Error updating user" });

    return res.status(200).json({
        "_id": result._id,
        "message": `Changed DisplayName from ${user.public.displayName} to ${displayName}`,
    });
}

const UserMeSetPassword = async (req, res) => {
    const { oldPassword, password } = req.body;

    if(!oldPassword || !password) return res.status(400).json({ "message": "Please input the required fields" });
    if(password < 8) return res.status(400).json({ "message": "Password does not meet requirements" });

    const user = req.decodedUser;

    const PasswordMatch = await bcryptHelper.CompareString(oldPassword, user.private.password);
    if(!PasswordMatch) return res.status(403).json({ "message": "Incorrect current password" });

    const PasswordHash = await bcryptHelper.HashString(password);
    const result = await dbCollection.UpdateUserProperty(
        user._id,
        "private.password",
        PasswordHash,
    );

    if(result === null) return res.status(500).json({ "message": "Error updating user" });

    return res.status(200).json({
        "_id": result._id,
        "message": `Successfully updated password!`,
    });
}

const UserRegister = async (req, res) => {
    return res.status(200).json({});
}

module.exports = {
    GetUserByMe,
    GetUserById,
    GetUserBulk,
    GetUserByUsername,
    SearchUsers,
    UserMeSetUsername,
    UserMeSetDisplayName,
    UserMeSetPassword,
    GetUserByIdPermissions,
    UserRegister
}