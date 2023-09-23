import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import { loadEnv } from "vite";

const env = loadEnv("development", process.cwd(), 'VITE')


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());




const config={
    port: env.VITE_PORT_BACKEND,
    host: env.VITE_HOSTNAME
}
app.listen(config, ()=> {
    console.log(`http://${config.host}:${config.port}`);
})