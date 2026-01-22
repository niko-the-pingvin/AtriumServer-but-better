require('dotenv').config({ quiet: true, path: './.env' });
const express =  require('express');
const https = require('https');
const http = require('http');
const fs =  require('fs');
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const logReq = require('./middleware/logReq');
const invalidPage = require('./middleware/invalidPage');
const dbConnection = require('./helpers/dbConnection');

//Tools
const { LL, CdnDir } = require('./generalTools');

//Pages Routers
const adminRouter = require('./routersPages/admin/adminRouter');
const adminAccountsRouter = require('./routersPages/admin/adminAccountsRouter');
const pagesRouter = require('./routersPages/pagesRouter');

//Api Routers
const apiRouter = require('./routers/apiRouter');
const gameConfigRouter = require('./routers/gameConfigRouter');
const authRouter = require('./routers/authRouter');
const accountsRouter = require('./routers/accountsRouter');

//Admin Routers
const authAdminRouter = require('./routers/admin/authAdminRouter');
const accountsAdminRouter = require('./routers/admin/accountsAdminRouter');
const gameConfigAdminRouter = require('./routers/admin/gameConfigAdminRouter');

const appPort =  process.env.PORT || 1020;
const app = express();
app.disable("x-powered-by");

//const server = https.createServer({ key: fs.readFileSync(path.join(__dirname, '/cert/key.pem'),'utf-8'), cert: fs.readFileSync(path.join(__dirname, '/cert/cert.pem'),'utf-8'),}, app);
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/cdn', express.static(CdnDir + "/web"));
app.use('/cdn/uploads', express.static(CdnDir + "/uploads"));

app.use(logReq);
app.use(cors('*'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//Pages Routers
app.use('/admin', adminRouter);
app.use('/admin/accounts', adminAccountsRouter);
app.use('/', pagesRouter);

//Api Routers
app.use('/api', apiRouter);
app.use('/api/auth', authRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/gameconfigs', gameConfigRouter);

//Admin Routers
app.use('/api/admin/auth', authAdminRouter);
app.use('/api/admin/accounts', accountsAdminRouter);
app.use('/api/admin/gameconfigs', gameConfigAdminRouter);

dbConnection.ConnectDB().then(async () => {
    server.listen(appPort, async () => {
        console.log(LL);
        console.log("Atrium Site Server");
        console.log(LL);
        console.log("Env: " + process.env.NAME);
        console.log("https://localhost:" + appPort);
        console.log(LL);
    });
});

app.use(invalidPage);