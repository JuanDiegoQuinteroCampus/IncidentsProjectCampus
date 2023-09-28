import express from "express";
import { deleteDiscord, getAllDiscord, postDiscord, putDiscord } from "../v1/discord.js";
import { proxyDiscord, middlewareVerify, DTOData, middlewareParamDiscord } from "../middleware/proxyDiscord.js";
import { LimitQuery } from "../helpers/config.js";
import passportHelper from "../helpers/passportHelper.js"
import { getEmailDiscord, getNameDiscord, getRolUser } from "../v2/incidents.js";
import { appVerify } from "../helpers/token.js";

const appDiscord = express();
appDiscord.use(express.json());
appDiscord.use(LimitQuery());
appDiscord.use((req, res, next) => {
    const apiVersion = req.headers["x-api"];
    if (apiVersion === "1.0") {
        next();
    } else {
        res.status(400).json({
            status: 400,
            message: "API Version No Compatible :("
        });
    }
});
appDiscord.use(passportHelper.authenticate("bearer", {session: false}));
appDiscord.get("/all", middlewareVerify, getAllDiscord);
// appDiscord.get("/:id", middlewareVerify, middlewareParamDiscord,(req, res, next) => {
//     const discordId = req.params.id; 
//     getAllDiscord(req, res, discordId)
// });
appDiscord.post("/post", middlewareVerify, proxyDiscord , postDiscord);
appDiscord.put("/update/:id", middlewareVerify, proxyDiscord, async (req, res) => {
    const discordId = req.params.id; 
    putDiscord(req, res, discordId)
});
appDiscord.delete("/delete/:id", middlewareVerify, async (req, res) => {
    const discordId = req.params.id; 
    deleteDiscord(req, res, discordId)
});

// ----------

appDiscord.get("/email/:id",  middlewareVerify,(req, res, next) => {
    const users = req.params.id; 
    getEmailDiscord(req, res, users)
});
appDiscord.get("/global/:id", middlewareVerify, (req, res, next) => {
    const users = req.params.id; 
    getNameDiscord(req, res, users)
});
appDiscord.get("/rol/:users", middlewareVerify, (req, res, next) => {
    const users = req.params.users; 
    getRolUser(req, res, users)
});





export  {appDiscord};