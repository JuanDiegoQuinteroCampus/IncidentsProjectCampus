
import { con } from '../db/atlas.js';
import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import passport from 'passport';
import { ObjectId } from 'mongodb';
import { Strategy as BearerStrategy } from 'passport-http-bearer';




const appToken = Router();
const appVerify = Router();

export const ValidateToken = async (req, token) => {
    try {
        const db = await con();
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        if (!jwtData.payload.id) {
            console.error('Token JWT no contiene un campo "id" válido.');
            req.data = null; 
            return null;
        }
        const userId = new ObjectId(jwtData.payload.id);

        let res = await db.collection("users").findOne({
            "_id": userId
        });

        if (!res) {
            console.error('Token JWT no coincide con ningún usuario.');
            req.data = null; 
            return null;
        }

        req.data = res ? res._id : null;
        return res; 
    } catch (error) {
        console.error("Error en ValidateToken, o token incorrecto", /* error */);
        // throw error;
    }
}



appToken.post("/", async (req, res) => {
    try {
        const { username, password, id_rol } = req.body;
        const db = await con();
        const user = await db.collection('users').findOne({ username: username });

        if (!user || !user._id || user.password !== password) {
            return res.status(401).json({ status: 401, message: 'Credenciales inválidas' });
        }

        const userId = user._id.toString();
        const encoder = new TextEncoder();

        const tokenPayload = {
            id: userId,
            username: username,
            password: password,
            id_rol: id_rol
        };

        const jwtConstructor = await new SignJWT(tokenPayload)
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('14h')
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        return res.status(200).json({ status: 200, jwt: jwtConstructor, message: 'Inicio de sesión exitoso'});
    } catch (error) {
        console.error('Error al generar el token:', error);
        res.status(500).json({ status: 500, message: 'Error interno del servidor' });
    }
});
appVerify.use("/", async (req, res, next) => {
    try {
        const conexionDB = await con();
        const userId = new ObjectId(req.data);
        const user = await conexionDB.collection('users').findOne({  "_id": userId
        });
        const id_rol = user.id_rol

        if (id_rol === 1) {
            next();
        } else if (id_rol === 2 && req.originalUrl.includes('/v2')) {
            next();
        } else {
            return res.status(403).send({ status: 403, message: "No tienes permiso para acceder a esta versión" });
        }
        
    } catch (error) {
        res.status(498).send({ status: 498, token: "Token Expirado" });
        console.log(error)
    }
});

export { appToken, appVerify, passport };
