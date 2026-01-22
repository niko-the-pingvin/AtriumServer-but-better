const dbCollection = require('../helpers/dbCollection');

const ConfigsAll = async (req, res) => {
    const result = await dbCollection.AllGameConfigs();
    if(!result) return res.status(500).json({ "message": "Error fetching GameConfigs" });
    res.status(200).json(result);
}

const ConfigByName = async (req, res) => {
    const result = await dbCollection.GameConfigByName(req.params.key);
    if(!result) return res.status(500).json({ "message": "Error fetching GameConfigs" });
    res.status(200).json(result);
}

module.exports = {
    ConfigsAll,
    ConfigByName,
}