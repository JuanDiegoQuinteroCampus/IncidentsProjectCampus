import { use } from "passport";
import { con } from "../../db/atlas.js";

// 1. muestreme los incidente mas con mayor prioridad
export async function getIncidentPriority(req, res){
    try {
        let db = await con();
        let collection = db.collection("incidents");
        let result = await collection.find({priority: "Urgente"}).toArray();
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
    } else {
        res.send(result);
    }
    } catch (error) {
        console.log(error);
    }
    
};


// 2. obtener el incidente por medio del id
export async function getIncidentsById(req, res, IncidentsId) {
    let id = parseInt(IncidentsId);
    let db = await con();
    let collection = db.collection("incidents");
    let result = await collection.find({ _id: id }).toArray();
    try {
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
};

// 3. obtener el incidente por la fecha en la que ocurrio
export async function getIncidentsByDate(req, res, date) {
    let searchDate = new Date(date);

    let db = await con();
    let collection = db.collection("incidents");
    let result = await collection.find({ date: searchDate }).toArray();
    try {
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found Incidents "
            });
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
};


// 4. Obtener el id del usuario que hizo el reporte del incidente
export async function getIncidentReports(req, res){
    try {
        let db = await con();
        let collection = db.collection("incidents");
        let result = await collection.find({}, {projection:{_id:1, name:1, report_user:1, description:1 }}).toArray();
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
    } else {
        res.send(result);
    }
    } catch (error) {
        console.log(error);
    }
    
};

// 5. Obtener el lugar y la zona donde ocurrio el incidente y 
// el nombre del incidente
export async function getIncidentZona(req, res){
    try {
        let db = await con();
        let collection = db.collection("incidents");
        let result = await collection.find({}, {projection:{_id:1, name:1, zone:1, place:1 }}).toArray();
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
    } else {
        res.send(result);
    }
    } catch (error) {
        console.log(error);
    }
    
};

// 6. obtener el nombre de la persona encargada de solucionar dicho incidente y cuando lo hizo
export async function getIncidentPerson(req, res, IncidentsId){
    try {
        let id = parseInt(IncidentsId);
        let db = await con();
        let collection = db.collection("incidents");
        let result = await collection.aggregate([
            {
              $match: {
                _id: id, 
              },
            },
            {
              $lookup: {
                from: "support",
                localField: "_id",
                foreignField: "id_incident",
                as: "support_info",
              },
            },
            {
              $unwind: "$support_info",
            },
            {
              $project: {
                _id: 1,
                name: 1,
                date: 1,
                support_person: "$support_info.support_person",
                solution_date: "$support_info.date",
              },
            },
          ]).toArray();
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
    } else {
        res.send(result);
    }
    } catch (error) {
        console.log(error);
    }
    
};


// 7.listar las personas encargadas de soporte que se encuentran activas
export async function getSupportActivo(req, res, IncidentsId){
    try {
        let id = parseInt(IncidentsId);
        let db = await con();
        let collection = db.collection("support");
        let result = await collection.find({estado: {$regex:/^activo$/i}}).toArray();
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
    } else {
        res.send(result);
    }
    } catch (error) {
        console.log(error);
    }
    
};


// 8. buscar cuando se registró el incidente
export async function getRegisterIncidents(req, res, IncidentsId){
    let id = parseInt(IncidentsId);
    let db = await con();
    let collection = db.collection("incidents");
    let result = await collection.find({_id: id},{projection:{created_date:1, name:1, description:1 }}).toArray();
    try {
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
    }

    // 9. Listar el email con el cual tiene discord registrado
    export async function getEmailDiscord(req, res, user){
        let user = parseInt(user);
        let db = await con();
        let collection = db.collection("discord");
        let result = await collection.find({username:user}, {projection:{ global_name:1, email:1 }}).toArray();
        try {
            if (!result || result.length === 0) {
                res.status(404).json({
                    status: 404,
                    message: "Not Found"
                });
            } else {
                res.send(result);
            }
        } catch (error) {
            console.log(error);
        }
        }
    

//10. Buscar el nombre de usuario global
export async function getNameDiscord(req, res, user){
    let user = parseInt(user);
    let db = await con();
    let collection = db.collection("incidents");
    let result = await collection.find({}, {projection:{ global_name:1, discordId:1 }}).toArray();
    try {
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
    }
    //11.  Buscar el rol que tiene los usuarios por medio dle nombre
    export async function getRolUser(req, res, user){
        let user = parseInt(user);
        let db = await con();
        let collection = db.collection("incidents");
        let result = await collection.find({username:user},{projection:{id_rol:1}}).toArray();
        try {
            if (!result || result.length === 0) {
                res.status(404).json({
                    status: 404,
                    message: "Not Found"
                });
            } else {
                res.send(result);
            }
        } catch (error) {
            console.log(error);
        }
        }
