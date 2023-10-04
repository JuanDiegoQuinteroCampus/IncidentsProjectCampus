import express from "express";
import { deleteUsers, getAllUsers, postUsers, putUsers } from "../v1/user.js";
import { proxyUsers, middlewareVerify, DTOData, middlewareParamUsers } from "../middleware/proxyUsers.js";
import { LimitQuery } from "../helpers/config.js";
import passportHelper from "../helpers/passportHelper.js"
import { appVerify } from "../helpers/token.js";

const appUsers = express();
appUsers.use(express.json());
appUsers.use(LimitQuery());
appUsers.use((req, res, next) => {
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
appUsers.use(passportHelper.authenticate("bearer", {session: false}));
appUsers.get("/all", middlewareVerify, getAllUsers);
// appUsers.get("/:id", middlewareVerify, middlewareParamUsers,(req, res, next) => {
//     const UsersId = req.params.id; 
//     getAllUsers(req, res, UsersId)
// });
appUsers.post("/post", middlewareVerify, proxyUsers , postUsers);
appUsers.put("/update/:id", middlewareVerify, proxyUsers, async (req, res) => {
    const UsersId = req.params.id; 
    putUsers(req, res, UsersId)
});
appUsers.delete("/delete/:id", middlewareVerify, async (req, res) => {
    const UsersId = req.params.id; 
    deleteUsers(req, res, UsersId)
});

const appUsersV2 = express();
appUsersV2.use(express.json());
appUsersV2.use(LimitQuery());

appUsersV2.post("/add", proxyUsers, postUsers);

export  {appUsers, appUsersV2};