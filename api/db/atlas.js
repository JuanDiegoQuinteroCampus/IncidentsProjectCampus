// import dotenv from 'dotenv';
import {MongoClient} from 'mongodb';
// dotenv.config("../");
import { loadEnv } from "vite";
const env = loadEnv("development", process.cwd(), 'VITE')

async function con() {
    try {
        const uri =`mongodb+srv://${env.VITE_ATLAS_USER}:${env.VITE_ATLAS_PASSWORD}@alquilercluster.49qmjgl.mongodb.net/${env.VITE_ATLAS_DB}`
        const options ={
            useNewUrlParser:true,
            useUnifiedTopology:true,
        };
        const cliente =await MongoClient.connect(uri, options);
        return cliente.db();
    } catch (error) {
        return {status:500, message:error};
    }
}
export {con}
