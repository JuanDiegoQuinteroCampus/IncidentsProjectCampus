import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import { loadEnv } from "vite";
import { appToken, appVerify, passport } from "./helpers/token.js";
import appDiscord from "./routers/discord.js";


const env = loadEnv("development", process.cwd(), 'VITE')


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/login", appToken);
app.use("/discord", passport.authenticate('bearer', { session: false}) ,appVerify, appDiscord);


const config={
    port: env.VITE_PORT_BACKEND,
    host: env.VITE_HOSTNAME
}
app.listen(config, ()=> {
    console.log(`http://${config.host}:${config.port}`);
})