const mongoose = require("mongoose");
const dbCollection = require('../../helpers/dbCollection');
const bcryptHelper = require('../../helpers/bcryptHelper');
const { FilterCharacters } = require("../../generalTools");

//Get user info

const GetUserById = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ "message": "Not a valid user Id" });

    const result = await dbCollection.GetUserById(req.params.id, { "private.password": 0, "__v": 0 });
    if(!result) return res.status(400).json({ "message": "User not found" });

    return res.status(200).json(result);
}

// Set user info

const UserIdSetUsername = async (req, res) => {
    const { username } = req.body;
    const { id } = req.params;

    if(!username || !id) return res.status(400).json({ "message": "Please input the required fields" });

    const user = await dbCollection.GetUserById(id);
    if(user === null) return res.status(500).json({ "message": "Error finding user" });

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

const UserIdSetDisplayName = async (req, res) => {
    const { displayName } = req.body;
    const { id } = req.params;

    if(!displayName || !id) return res.status(400).json({ "message": "Please input the required fields" });

    const user = await dbCollection.GetUserById(id);
    if(user === null) return res.status(400).json({ "message": "Could not find user" });

    const result = await dbCollection.UpdateUserProperty(
        user._id,
        "public.displayName",
        displayName
    );

    if(result === null) return res.status(500).json({ "message": "Error updating user" });

    return res.status(200).json({
        "_id": result._id,
        "message": `Changed username from ${user.public.username} to ${displayName}`,
    });
}

const UserIdSetPassword = async (req, res) => {
    const { password } = req.body;
    const { id } = req.params;

    if(!password) return res.status(400).json({ "message": "Please input the required fields" });
    if(password < 8) return res.status(400).json({ "message": "Password does not meet requirements" });

    const user = await dbCollection.GetUserById(id);
    if(user === null) return res.status(400).json({ "message": "Could not find user" });

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

//Create Account

const CreateAccount = async (req, res) => {
    try{
        const { username, displayName, profilePicture, isJunior, email, verifiedEmail, password, callback, callbackSuccess } = req.body;

        if(!req.body && callback) return res.status(400).redirect(`${callback}?failed=Please input the required fields`);
        if(!req.body) return res.status(400).json({ "message": "Please input the required fields" });

        let result = await dbCollection.CreateUser({
            public: {
                username: FilterCharacters(username),
                displayName: FilterCharacters(displayName),
                profilePicture: profilePicture,
                isJunior: isJunior === 'true',
            },
            private: {
                roles: ["game"],
                email: email,
                verifiedEmail: verifiedEmail === 'true',
                password: password,
            }
        });
        result.private.password = null;

        if(callbackSuccess) return res.status(200).redirect(callbackSuccess);
        return res.status(200).json(result);
    }
    catch(err){
        if(req.body.callback) return res.status(500).redirect(`${req.body.callback}?failed=Unknown error<br> Usernames must be 3 characters <br> Passwords must be 8 characters <br> Fill out any fields`);
        return res.sendStatus(500);
    }
}

const DeleteAccount = async (req, res) => {
    try{
        const { id, callback, callbackSuccess } = req.body;

        if(!id && callback) return res.status(400).redirect(`${callback}?failed=Please input the required fields`);
        if(!id) return res.status(400).json({ "message": "Please input the required fields" });

        const result = await dbCollection.DeleteUser(id);
        if(result === null && callback) res.status(400).redirect(`${callback}?failed=No user was deleted`);
        if(result === null) return res.status(400).json({ "message": "No user was deleted" });

        if(callbackSuccess) return res.status(200).redirect(callbackSuccess);
        return res.status(200).json({
            "message": `Successfully deleted account: ${id}`,
            result: result,
        });
    }
    catch(err){
        if(req.body.callback) return res.status(500).redirect(`${req.body.callback}?failed=Unknown error <br> Was the Id correct?`);
        return res.sendStatus(500);
    }
}

module.exports = {
    GetUserById,
    UserIdSetUsername,
    UserIdSetDisplayName,
    UserIdSetPassword,
    CreateAccount,
    DeleteAccount,
}