const mongoose = require('mongoose');
const UserModel = require('../models/user');
const GameConfigModel = require('../models/GameConfig');
const CachedLoginMoel = require('../models/cachedLogin');
const BcryptHelper = require('../helpers/bcryptHelper');

//Users

async function GetUserById(userId, projection = {}) {
    const result = await UserModel.findOne({ "_id": userId }, projection);
    if(!result) return null;
    return result;
}

async function GetUserByUsername(username, projection = {}) {
    const result = await UserModel.findOne({ "public.username": username }, projection);
    if(!result) return null;
    return result;
}

async function GerUsersBySearch(username, projection = {}) {
    const result = await UserModel.find(
        { "public.username": { $regex: username, $options: 'i' } },
        projection
    );
    if(!result) return null;
    return result;
}

async function GetUserBulk(userIdArray, projection = {}) {
    const result = await UserModel.find(
        {  _id: { $in: userIdArray } },
        projection, //Shows only the public key in the user json.
    );
    if(!result) return null;

    return result;
}

async function CreateUser(jsonBody){
    const passwordHash = await BcryptHelper.HashString(jsonBody.private.password);

    const NewUser = new UserModel({
        public: {
            username: jsonBody.public.username,
            displayName: jsonBody.public.displayName,
            profilePicture: jsonBody.public.profilePicture,
            isJunior: jsonBody.public.isJunior,
            creationDate: new Date().toJSON(),
        },
        private: {
            roles: jsonBody.private.roles,
            email: jsonBody.private.email,
            verifiedEmail: jsonBody.private.verifiedEmail,
            password: passwordHash,
        }
    });
    return await NewUser.save();
}

async function DeleteUser(userId){
    const result = await UserModel.deleteOne({ "_id": userId });
    if(result.deletedCount === 0) return null;
    return result;
}

//Update User

async function UpdateUserProperty(userId, property, newValue){
    if(!userId || !property || !newValue) return null;
    if(property === "public" || property === "private") return null;

    const user = await GetUserById(userId);
    if(!user) return null;

    let propertyOptions = {};
    propertyOptions[property] = newValue;

    const updateUser = await UserModel.findOneAndUpdate({ "_id": userId }, {
        $set: propertyOptions,
    });

    if(!updateUser) return null;
    return updateUser;
}

//GameConfigs

const AllGameConfigs = async () => {
    const result = await GameConfigModel.find({}, { "_id": 0, "__v": 0 });
    if(!result) return null;
    return result;
}

const GameConfigByName = async (keyName) => {
    const result = await GameConfigModel.findOne({ "Key": keyName }, { "_id": 0, "__v": 0 });
    if(!result) return null;
    return result;
}

async function CreateGameConfig(key, value){
    const NewGameConfig = await new GameConfigModel({
        Key: key,
        Value: value,
    });
    let SaveGameConfig = await NewGameConfig.save();

    if(!SaveGameConfig) return null;
    return SaveGameConfig;
}

async function UpdateGameConfig(key, NewKey, NewValue){
    const result = await GameConfigModel.findOneAndUpdate({ "Key": key }, {
        $set: {
            "Key": NewKey,
            "Value": NewValue
        }
    });
    if(!result) return null;
    return result;
}

async function DeleteGameConfig(key){
    const result = await GameConfigModel.deleteOne({ "Key": key });
    if(result.deletedCount === 0) return null;
    return result;
}

// Cached Logins

async function CachedLoginsPlatformId(platformId) {
}

module.exports = {
    CreateGameConfig, UpdateGameConfig, AllGameConfigs, GameConfigByName, DeleteGameConfig,
    GetUserById, CreateUser, DeleteUser, UpdateUserProperty, GetUserBulk, GetUserByUsername, GerUsersBySearch
}