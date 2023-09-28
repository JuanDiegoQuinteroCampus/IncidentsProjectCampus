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

        const currentDate = new Date();

        const insertDocument = {
            ...req.body,
            date: new Date(req.body.date),
            created_date: currentDate, 
        };

        await collection.insertOne(insertDocument);

        res.status(201).json({
            status: 201,
            message: "Incidente Registrado Exitosamente :)"
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error :(",
            error: "Dato duplicado"
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
                created_date: new Date(),


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
            error: "Error al actualizar el dato, actualización no permitida"
        });
    }

};

export async function deleteIncidents(req, res, incidenteId) {
    try {
        let id = parseInt(incidenteId);
        const db = await con();
        const collection = db.collection('incidents');
        const result = await collection.deleteOne({
            _id: id
        });
        if (result.deletedCount === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
        } else {
            res.status(201).json({
                satus: 201,
                message: "Datos de las incidencias Eliminados Exitosamente :)"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            satus: 500,
            message: `Internal Server Error :(`,
            error: error.message
        });
    }
};