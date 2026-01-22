require('dotenv').config({ quiet: true, path: './.env' });
const dbCollection = require('../helpers/dbCollection');
const { LL } = require('../generalTools');

console.log(LL);
console.log(`Server Name: ${process.env.NAME}`)
console.log(`Creating account...`);

require('../helpers/dbConnection').ConnectDB().then(async () => {
    let NewUser = await dbCollection.CreateUser({
        public: {
            username: "Username1234",
            displayName: "Username1234",
            profilePicture: "DefaultProfilePicture.png",
            isJunior: false,
        },
        private: {
            roles: ["game", "referee", "developer", "admin"],
            email: "none",
            verifiedEmail: true,
            password: "1234",
        }
    });
    NewUser.private.password = "PasswordHash";

    console.log('Created account...');
    console.log(LL);
    console.log(NewUser);
});