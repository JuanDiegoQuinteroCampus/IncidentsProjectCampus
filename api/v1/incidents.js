import express from "express";
import { ObjectId} from "mongodb";
import {con}from "../db/atlas.js";

export async function getAllIncidents(req, res){
    try {
        let db = await con();
        let collection = db.collection("incidents");
        let result = await collection.find().toArray();
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


export async function postIncidents(req, res) {
    try {
        const db = await con();
        const collection = db.collection('incidents');
        const insertDocument = {
            ...req.body,
                date: new Date(req.body.date),
                solution_date: new Date(req.body.solution_date),
                created_date: new Date(req.body.created_date),
                update_date: new Date(req.body.update_date),
                delete_date: new Date(req.body.delete_date),

        };
        await collection.insertOne(insertDocument);
        res.status(201).json({
            satus: 201,
            message: "Incidente Registrado Exitosamente :)"
        });
    } catch (e) {
        res.status(500).json({
            satus: 500,
            message: "Internal Server Error :(",
            error: e.message
        });
    }
};

export async function putIncidents(req, res, incidenteId) {
    try {
        let _id = parseInt(incidenteId);
        const db = await con();
        const collection = db.collection('incidents');
        const updateData = {
            $set: {
                ...req.body,
                date: new Date(req.body.date),
                solution_date: new Date(req.body.solution_date),
                created_date: new Date(req.body.created_date),
                update_date: new Date(req.body.update_date),
                delete_date: new Date(req.body.delete_date),


            }
        }
        let result = await collection.updateOne({ _id: _id }, updateData)
        result.matchedCount === 1 ?
            res.send({ message: "Incidente Exitosamente Actualizado :)" }) :
            res.send({ message: "No se encontró Data" });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            satus: 500,
            message: `Internal Server Error :(`,
            error: e.message
        });
    }

};

export async function deleteIncidents(req, res, incidenteId) {
    try {
        let id = parseInt(incidenteId);
        const db = await con();
        const collection = db.collection('incidents');
        await collection.deleteOne({
            discordId: id
        });
        res.status(201).json({
            satus: 201,
            message: "Datos de las incidencias Eliminado Exitosamente :)"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            satus: 500,
            message: `Internal Server Error :(`,
            error: error.message
        });
    }
};