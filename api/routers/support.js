import express from "express";
import { deleteSupport, getAllSupport, postSupport, putSupport } from "../v1/support.js";
import {  middlewareVerify, DTOData,  middlewareParamSupports, proxySupport } from "../middleware/proxySupport.js";
import { LimitQuery } from "../helpers/config.js";
import passportHelper from "../helpers/passportHelper.js"


const appSupport = express();
appSupport.use(express.json());
appSupport.use(LimitQuery());
appSupport.use((req, res, next) => {
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
appSupport.use(passportHelper.authenticate("bearer", {session: false}));
appSupport.get("/all",  getAllSupport);
// appSupport.get("/:id", middlewareVerify, middlewareParamSupports,(req, res, next) => {
//     const supportID = req.params.id; 
//     getAnimalById(req, res, supportID)
// });
appSupport.post("/post",  proxySupport , postSupport);
appSupport.put("/update/:id",  proxySupport, async (req, res) => {
    const supportID = req.params.id; 
    putSupport(req, res, supportID)
});
appSupport.delete("/delete/:id",  async (req, res) => {
    const supportID = req.params.id; 
    deleteSupport(req, res, supportID)
});

export default appSupport;