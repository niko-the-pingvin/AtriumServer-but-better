const mongoose = require('mongoose');
const chalk = require('chalk');
const { LL } = require('../generalTools');

async function ConnectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL, {});
    }
    catch(err){
        throw new Error(err);
    }
}

mongoose.connection.on('open', () => {
    console.log(LL);
    console.log(chalk.greenBright(`Connected to MongoDB!`));
    console.log(chalk.greenBright(`DB: ${mongoose.connection.name}`));
});

mongoose.connection.on('reconnected', () => {
    console.log(chalk.cyanBright('Reconnected at MongoDB!'));
});

mongoose.connection.on('disconnected', () => {
    console.log(chalk.redBright('Disconnected from MongoDB!'));
});

mongoose.connection.on('close', () => {
    console.log(chalk.bgGray('Connection closed at MongoDB!'));
});

module.exports = { ConnectDB };