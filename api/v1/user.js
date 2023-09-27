import express from "express";
import { ObjectId} from "mongodb";
import {con}from "../db/atlas.js";

export async function getAllUsers(req, res){
    try {
        let db = await con();
        let collection = db.collection("users");
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


export async function postUsers(req, res) {
    try {
        const db = await con();
        const collection = db.collection('users');
        
        const userData = {
            ...req.body,
            id_rol: 2
        };

        await collection.insertOne(userData);
        res.status(201).json({
            satus: 201,
            message: "Datos del usuario de Users Insertado Exitosamente :)"
        });
    } catch (e) {
        res.status(500).json({
            satus: 500,
            message: "Internal Server Error :(",
            error: e.message
        });
    }
};


export async function putUsers(req, res, UsersId) {
    try {
        let _id = parseInt(UsersId);
        const db = await con();
        const collection = db.collection('users');
        const updateData = req.body;
        let result = await collection.updateOne({ CC: _id }, { $set: updateData }) 
        result.matchedCount === 1 ? 
            res.status(201).json({ status:201, message: "Datos del usuario de Users Exitosamente Actualizado :)" }):
            res.status(404).json({ status:404, message: "No se encontró Data" });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            satus: 500,
            message: `Internal Server Error :(`,
            error: e.message
        });
    }

};

export async function deleteUsers(req, res, UsersId) {
    try {
        let id = parseInt(UsersId);
        const db = await con();
        const collection = db.collection('users');
        const result = await collection.deleteOne({
            CC: id
        });
        if (result.deletedCount === 1) {
            res.status(201).json({
                satus: 201,
                message: "Datos de Users Eliminado Exitosamente :)"
            });
        } else {
            res.status(404).json({
                satus: 404,
                message: "Datos del usuario No encontrados :)"
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