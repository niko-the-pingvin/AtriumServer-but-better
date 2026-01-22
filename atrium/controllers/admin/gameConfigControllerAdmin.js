const dbCollection = require('../../helpers/dbCollection');

const ConfigCreate = async (req, res) => {
    const { Key, Value } = req.body;
    if(Key.length === 0 || Value.length === 0 ) return res.status(400).json({ "message": "Values cannot be empty" });

    const NewConfig = await dbCollection.CreateGameConfig(Key, Value);
    if(!NewConfig) return res.status(500).json({ "message": "Error creating config" });

    return res.status(200).json({
        "message": "Success in creating config",
        "GameConfig": {
            "Key": NewConfig.Key,
            "Value": NewConfig.Value
        }
    });
}

const ConfigUpdate = async (req, res) => {
    if(!req.params.key) return res.status(400).json({ "message": "Enter the required field" });

    const { Key, Value } = req.body;
    if(Key.length === 0 || Value.length === 0 ) return res.status(400).json({ "message": "Values cannot be empty" });

    const UpdateConfig = await dbCollection.UpdateGameConfig(req.params.key, Key, Value);
    if(!UpdateConfig) return res.status(500).json({ "message": "Error updating Config" });

    return res.status(200).json({
        "message": "Success in updating config",
        "GameConfig": {
            "Key": Key,
            "Value": Value
        }
    });
}

const ConfigDelete = async (req, res) => {
    if(!req.params.key) return res.status(400).json({ "message": "Enter the required field" });

    const result = await dbCollection.DeleteGameConfig(req.params.key);
    if(!result) return res.status(500).json({ "message": "Config does not exist" });
    return res.status(200).json({ "message": `Successfully Deleted Config [${req.params.key}]` });
}

module.exports = {
    ConfigCreate,
    ConfigUpdate,
    ConfigDelete
}