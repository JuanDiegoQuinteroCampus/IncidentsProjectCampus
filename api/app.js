import express  from "express";
import cors from "cors";
import { loadEnv } from "vite";
import { appToken, appVerify, passport } from "./helpers/token.js";
import appDiscord from "./routers/discord.js";
import appIncidents from "./routers/incidents.js";
import appSupport from "./routers/support.js";


const env = loadEnv("development", process.cwd(), 'VITE')



const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/login", appToken);
app.use("/discord", passport.authenticate('bearer', { session: false}) ,appVerify, appDiscord);

app.use("/incidents", passport.authenticate('bearer', { session: false}) ,appVerify, appIncidents);

app.use("/support", passport.authenticate('bearer', { session: false}) ,appVerify, appSupport);

const config={
    port: env.VITE_PORT_BACKEND,
    host: env.VITE_HOSTNAME
}
app.listen(config, ()=> {
    console.log(`http://${config.host}:${config.port}`);
})