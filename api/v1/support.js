import express from "express";
import { ObjectId} from "mongodb";
import {con}from "../db/atlas.js";

export async function getAllSupport(req, res){
    try {
        let db = await con();
        let collection = db.collection("support");
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


export async function postSupport(req, res) {
    try {
        const db = await con();
        const collection = db.collection('support');
        const insertDocument = {
            ...req.body,
                date: new Date(req.body.date),
                created_date: new Date(req.body.created_date),
                update_date: new Date(req.body.update_date),
                delete_date: new Date(req.body.delete_date),

        };
        await collection.insertOne(insertDocument);
        res.status(201).json({
            satus: 201,
            message: "Soporte Registrado Exitosamente :)"
        });
    } catch (e) {
        res.status(500).json({
            satus: 500,
            message: "Internal Server Error :(",
            error: e.message
        });
    }
};

export async function putSupport(req, res, supportID) {
    try {
        let _id = parseInt(supportID);
        const db = await con();
        const collection = db.collection('support');
        const updateData = {
            $set: {
                ...req.body,
                date: new Date(req.body.date),
                created_date: new Date(req.body.created_date),
                update_date: new Date(req.body.update_date),
                delete_date: new Date(req.body.delete_date),


            }
        }
        let result = await collection.updateOne({ _id: _id }, updateData)
        result.matchedCount === 1 ?
            res.send({ message: "Support Exitosamente Actualizado :)" }) :
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

export async function deleteSupport(req, res, supportID) {
    try {
        let id = parseInt(supportID);
        const db = await con();
        const collection = db.collection('support');
        const result = await collection.deleteOne({
            _id: id
        });
        result.matchedCount === 1 ?
        res.status(201).json({
            satus: 201,
            message: "Datos del soporte Eliminado Exitosamente :)"
        }):
        res.status(201).json({
            satus: 404,
            message: "No se encontró el dato a eliminar "
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            satus: 500,
            message: `Internal Server Error :(`,
            error: error.message
        });
    }
};