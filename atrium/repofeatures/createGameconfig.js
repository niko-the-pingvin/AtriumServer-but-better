require('dotenv').config({ quiet: true, path: './.env' });
const dbCollection = require('../helpers/dbCollection');
const { LL } = require('../generalTools');

console.log(LL);
console.log(`Server Name: ${process.env.NAME}`)
console.log(`Creating config...`);

require('../helpers/dbConnection').ConnectDB().then(async () => {
    let NewConfig = await dbCollection.CreateGameConfig("Key", "Value");

    console.log('Created config...');
    console.log(LL);
    console.log(NewConfig);
});