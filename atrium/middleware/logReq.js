const LogReq = (req, res, next) => {
    const client = req.headers["x-from-client"] === "AtriumGameClient";
    const method = `[${req.method}] ~ ${req.url} ~ ${client ? "Atrium" : "API" }`;
    req.methodUrl = req.url;

    if(!req.url.includes("/cdn/") && !req.url.includes("favicon.ico")) {
        console.log(method);
    }
    if(req.url.includes("/admin/") && client) return res.sendStatus(403);

    next();
}

module.exports = LogReq;