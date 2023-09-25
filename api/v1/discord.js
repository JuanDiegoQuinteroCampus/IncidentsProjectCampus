import express from "express";
import { ObjectId} from "mongodb";
import {con}from "../db/atlas.js";

export async function getAllDiscord(req, res){
    try {
        let db = await con();
        let collection = db.collection("discord");
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


export async function postDiscord(req, res) {
    try {
        const db = await con();
        const collection = db.collection('discord');
        await collection.insertOne({...req.body});
        res.status(201).json({
            satus: 201,
            message: "Datos del usuario de discord Insertado Exitosamente :)"
        });
    } catch (e) {
        res.status(500).json({
            satus: 500,
            message: "Internal Server Error :(",
            error: e.message
        });
    }
};

export async function putDiscord(req, res, discordId) {
    try {
        let _id = parseInt(discordId);
        const db = await con();
        const collection = db.collection('discord');
        const updateData = req.body;
        let result = await collection.updateOne({ discordId: _id }, { $set: updateData }) 
        result.matchedCount === 1 ? 
            res.status(201).json({ status:201, message: "Datos del usuario de discord Exitosamente Actualizado :)" }):
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

export async function deleteDiscord(req, res, discordId) {
    try {
        let id = parseInt(discordId);
        const db = await con();
        const collection = db.collection('discord');
        await collection.deleteOne({
            discordId: id
        });
        res.status(201).json({
            satus: 201,
            message: "Datos del usuario de discord Eliminado Exitosamente :)"
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