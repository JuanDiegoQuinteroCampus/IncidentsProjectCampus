import express from "express";
import { deleteIncidents, getAllIncidents, postIncidents, putIncidents } from "../v1/incidents.js";
import { proxyIncidentes, middlewareVerify, DTOData, middlewareParamIncidentes } from "../middleware/proxyIncidents.js";
import { LimitQuery } from "../helpers/config.js";
import passportHelper from "../helpers/passportHelper.js"
import { getIncidentPerson, getIncidentPriority, getIncidentReports, getIncidentZona, getIncidentsByDate, getIncidentsById, getNameDiscord, getRegisterIncidents } from "../v2/incidents.js";
import { appVerify } from "../helpers/token.js";

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

appIncidents.post("/post",  proxyIncidentes , postIncidents);
appIncidents.put("/update/:id", proxyIncidentes, middlewareParamIncidentes,async (req, res) => {
    const incidenteId = req.params.id; 
    putIncidents(req, res, incidenteId)
});
appIncidents.delete("/delete/:id", async (req, res) => {
    const incidenteId = req.params.id; 
    deleteIncidents(req, res, incidenteId)
});
// ---------------

appIncidents.get("/priority", getIncidentPriority);


appIncidents.get("/capacidad/:id",  (req, res, next) => {
    const IncidentsId = req.params.id; 
    getIncidentsById(req, res, IncidentsId)
});

appIncidents.get("/date/:date", (req, res, next) => {
    const searchDate = req.params.date; 
    getIncidentsByDate(req, res, searchDate)
});

appIncidents.get("/reports", getIncidentReports);

appIncidents.get("/zona", getIncidentZona);

appIncidents.get("/support/:id", (req, res, next) => {
    const IncidentsId = req.params.id; 
    getIncidentPerson(req, res, IncidentsId)
});

appIncidents.get("/whenIncident/:id", (req, res, next) => {
    const IncidentsId = req.params.id; 
    getRegisterIncidents(req, res, IncidentsId)
});




const appIncidentsV2 = express();
appIncidentsV2.use(express.json());
appIncidentsV2.use(LimitQuery());
appIncidentsV2.use((req, res, next) => {
    const apiVersion = req.headers["x-api"];
    if (apiVersion === "1.1") {
        next();
    } else {
        res.status(400).json({
            status: 400,
            message: "API Version No Compatible :("
        });
    }
});

appIncidentsV2.use(passportHelper.authenticate("bearer", {session: false}));

appIncidentsV2.get("/all", appVerify,getAllIncidents);

appIncidentsV2.post("/post",  proxyIncidentes , appVerify,postIncidents);



export {appIncidents,appIncidentsV2 };