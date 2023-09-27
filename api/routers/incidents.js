import express from "express";
import { deleteIncidents, getAllIncidents, postIncidents, putIncidents } from "../v1/incidents.js";
import { proxyIncidentes, middlewareVerify, DTOData, middlewareParamIncidentes } from "../middleware/proxyIncidents.js";
import { LimitQuery } from "../helpers/config.js";
import passportHelper from "../helpers/passportHelper.js"

const appIncidents = express();
appIncidents.use(express.json());
appIncidents.use(LimitQuery());
appIncidents.use((req, res, next) => {
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
appIncidents.use(passportHelper.authenticate("bearer", {session: false}));
appIncidents.get("/all", getAllIncidents);
// appIncidents.get("/:id", middlewareVerify, middlewareParamIncidentes,(req, res, next) => {
//     const incidenteId = req.params.id; 
//     getAnimalById(req, res, incidenteId)
// });
appIncidents.post("/post",  proxyIncidentes , postIncidents);
appIncidents.put("/update/:id", proxyIncidentes, async (req, res) => {
    const incidenteId = req.params.id; 
    putIncidents(req, res, incidenteId)
});
appIncidents.delete("/delete/:id", async (req, res) => {
    const incidenteId = req.params.id; 
    deleteIncidents(req, res, incidenteId)
});

export default appIncidents;