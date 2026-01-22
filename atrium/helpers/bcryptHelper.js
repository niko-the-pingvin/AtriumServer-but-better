const bcrypt = require('bcrypt');
const SaltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

async function HashString(string){
    return await bcrypt.hash(string, await bcrypt.genSalt(SaltRounds));
}

async function CompareString(plainText, hashedText){
    return await bcrypt.compare(plainText, hashedText);
}

module.exports = {
    HashString,
    CompareString
};